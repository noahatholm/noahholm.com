import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// OH NO I LEFT MY API KEY IN MY FRONTEND PLS DON'T HACK ME 😿🙏
const supabase = createClient('https://crhpcbmfxuoglasqsqxr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyaHBjYm1meHVvZ2xhc3FzcXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzOTk5MTIsImV4cCI6MjA5NDk3NTkxMn0.Lt2nz_sIpkTkzVVhXTQQWiIEuLwORRBEBdbkvnrt7pM')

async function recordPageView() {
    //Get users IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIp = data.ip; 
    console.log(userIp);

    

    //Call supabase RPC
    await supabase.rpc('increment_view', {
        user_ip: userIp,
        current_page_path: window.location.pathname,
        current_user_agent: navigator.userAgent
    });
}

async function displayViews(){
    const response = await supabase.rpc('get_view_count', {
        current_page_path: window.location.pathname
    });
    console.log(response);

    const counter = document.getElementById("view-counter");
    counter.classList.add("counter-success");
    counter.innerHTML = `Page Views: ${response.data}`;
}

//Update page views
recordPageView();
displayViews();