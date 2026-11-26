import { supabase } from "./page-view.js";
import L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/+esm';

// Assign to window BEFORE importing the plugin
window.L = L;
await import('https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.5.3/+esm');

// Zoomed out to this level or further: one bubble per country. Zoomed in past it: per city.
const COUNTRY_MAX_ZOOM = 4;


async function fetch_clusters() {
    try {
        const { data, error } = await supabase.rpc('get_cluster_centroids', {
            eps_meters: 30000,
            min_points: 1
        });

        if (error) {
            throw new Error(`Error Fetching Clusters: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error("Failed to fetch clusters", error);
        return [];
    }
}


// City/country strings come from the database, which anyone can write to via the public RPC,
// so never drop them into HTML unescaped
function escape_html(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);
}

function visitors_label(count) {
    return `<b>${count}</b> visitor${count === 1 ? '' : 's'}`;
}


// Bubble sized by visitor count (sqrt so big clusters don't swallow the map)
function bubble_icon(count) {
    const size = Math.round(26 + Math.min(Math.sqrt(count) * 5, 40));
    const tier = count >= 50 ? 'large' : count >= 10 ? 'medium' : 'small';
    return L.divIcon({
        html: `<span>${count}</span>`,
        className: `visitor-bubble visitor-bubble--${tier}`,
        iconSize: [size, size],
    });
}


// A marker cluster group whose bubbles show total visitors (not marker count) and
// whose hover tooltip lists the biggest places inside it
function make_cluster_group(options) {
    const group = L.markerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: (cluster) => {
            const total = cluster.getAllChildMarkers()
                .reduce((sum, m) => sum + m.options.visitors, 0);
            return bubble_icon(total);
        },
        ...options,
    });

    group.on('clustermouseover', (e) => {
        const children = e.layer.getAllChildMarkers()
            .sort((a, b) => b.options.visitors - a.options.visitors);
        const total = children.reduce((sum, m) => sum + m.options.visitors, 0);
        const top = children.slice(0, 3).map((m) => escape_html(m.options.label)).join(', ');
        const more = children.length > 3 ? ` +${children.length - 3} more` : '';

        e.layer.bindTooltip(`${top}${more}<br>${visitors_label(total)}`, { direction: 'top' })
            .openTooltip();
    });

    return group;
}

function make_marker(lat, lon, visitors, label) {
    return L.marker([lat, lon], { icon: bubble_icon(visitors), visitors, label })
        .bindPopup(`${escape_html(label)}<br>${visitors_label(visitors)}`);
}


// Roll city clusters up into one point per country, placed at the visitor-weighted average position
function group_by_country(clusters) {
    const countries = new Map();

    for (const c of clusters) {
        const entry = countries.get(c.country) ?? { country: c.country, visitors: 0, lat_sum: 0, lon_sum: 0 };
        entry.visitors += c.point_count;
        entry.lat_sum += c.center_lat * c.point_count;
        entry.lon_sum += c.center_lon * c.point_count;
        countries.set(c.country, entry);
    }

    return [...countries.values()].map((e) => ({
        country: e.country,
        visitors: e.visitors,
        lat: e.lat_sum / e.visitors,
        lon: e.lon_sum / e.visitors,
    }));
}


async function render_map(){
    const map = L.map('map', { worldCopyJump: true }).setView([51.505, -0.09], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const cluster_data = await fetch_clusters();
    if (!cluster_data || cluster_data.length === 0) return;

    // Country layer: big radius so neighbouring countries merge into continent-sized blobs at low zoom
    const country_layer = make_cluster_group({ maxClusterRadius: 80 });
    for (const c of group_by_country(cluster_data)) {
        country_layer.addLayer(make_marker(c.lat, c.lon, c.visitors, c.country));
    }

    // City layer: small radius so cities only merge when they'd overlap on screen
    const city_layer = make_cluster_group({ maxClusterRadius: 40, disableClusteringAtZoom: 9 });
    for (const c of cluster_data) {
        city_layer.addLayer(make_marker(c.center_lat, c.center_lon, c.point_count, `${c.city}, ${c.country}`));
    }

    function update_layers() {
        const show_countries = map.getZoom() <= COUNTRY_MAX_ZOOM;
        const [show, hide] = show_countries ? [country_layer, city_layer] : [city_layer, country_layer];
        if (map.hasLayer(hide)) map.removeLayer(hide);
        if (!map.hasLayer(show)) map.addLayer(show);
    }

    map.on('zoomend', update_layers);
    update_layers();
}

render_map()
