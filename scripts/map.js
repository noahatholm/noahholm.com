import { supabase } from "./page-view.js";
import L from 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/+esm';

// Assign to window BEFORE importing the plugin
window.L = L;
await import('https://cdn.jsdelivr.net/npm/leaflet.markercluster@1.5.3/+esm');


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


async function render_map(){
    const map = L.map('map').setView([51.505, -0.09], 3);

    const markers = L.markerClusterGroup();

    // 2. Load OpenStreetMap tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const cluster_data = await fetch_clusters();
    console.log(cluster_data);


    if (cluster_data && cluster_data.length > 0) {
        cluster_data.forEach(cluster => {
            const marker = L.marker([cluster.center_lat, cluster.center_lon]);
            marker.bindPopup(`<b>Cluster ID:</b> ${cluster.cluster_id}<br><b>Points:</b> ${cluster.point_count}`);
            markers.addLayer(marker);
        });

        // Add cluster layer to map once
        map.addLayer(markers);
    }
}

render_map()