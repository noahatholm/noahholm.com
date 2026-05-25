import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// OH NO I LEFT MY API KEY IN MY FRONTEND PLS DON'T HACK ME 😿🙏
const supabase = createClient('https://crhpcbmfxuoglasqsqxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaHBjYm1meHVvZ2xhc3FzcXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTk5MTIsImV4cCI6MjA5NDk3NTkxMn0.Lt2nz_sIpkTkzVVhXTQQWiIEuLwORRBEBdbkvnrt7pM')

async function recordPageView() {
    let response;
    //Get users Information
    try{
        response = await fetch('https://ipapi.co/json/');

        if(!response.ok){
            throw new Error("HTTP whilst fetching IP, status: ${response.status");
        }



    }catch(error){
        console.error("IP fetcing blocked or failed, skipping", error);
        return;
    }


    const data = await response.json();
    const userIp = data.ip; 
    const userCountry = data.country_name;
    const userCity = data.city;
    const lat = data.latitude;
    const lon = data.longitude;
    const referrer = document.referrer;

    //Call supabase RPC
    await supabase.rpc('increment_view', {
        user_ip: userIp,
        current_page_path: window.location.pathname,
        current_user_agent: navigator.userAgent,
        p_country: userCountry,
        p_city: userCity,
        p_lat: lat,
        p_lon: lon,
        p_referrer: referrer
    });

}

async function displayViews(){
    const response = await supabase.rpc('get_view_count', {
        current_page_path: window.location.pathname
    });

    const counter = document.getElementById("view-counter");
    counter.classList.add("counter-success");
    counter.innerHTML = `Page Views: ${response.data}`;
}

//Update page views
recordPageView();
displayViews();