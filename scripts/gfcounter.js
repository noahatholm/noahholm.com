function calcDays(date){
    const targetDate = new Date(date); 
    const now = new Date();
    let diff = Math.floor((now - targetDate) / 1000); // Difference in seconds 
    const days = Math.floor(diff / 86400);
    return days
}

function calcHours(date){
    const targetDate = new Date(date); 
    const now = new Date();
    let diff = Math.floor((now - targetDate) / 1000); // Difference in seconds 
    diff %= 86400;
    const hours = Math.floor(diff / 3600);
    return hours
}

function calcMins(date){
    const targetDate = new Date(date); 
    const now = new Date();
    let diff = Math.floor((now - targetDate) / 1000); // Difference in seconds 
    diff %= 86400;
    diff %= 3600;
    const minutes = Math.floor(diff / 60);
    return minutes
}

function calcSecs(date){
    const targetDate = new Date(date); 
    const now = new Date();
    let diff = Math.floor((now - targetDate) / 1000); // Difference in seconds 
    diff %= 86400;
    diff %= 3600;
    const seconds = diff % 60;
    return seconds
}

function updateValue(name,value) {
    const counterElement = document.getElementById(name);
    counterElement.textContent = value;
}


function update(number,date){
    updateValue(`Days${number}`,calcDays(date)); 
    updateValue(`Hour${number}`,calcHours(date));
    updateValue(`Mins${number}`,calcMins(date)); 
    updateValue(`Secs${number}`,calcSecs(date)); 
}

setInterval(() => {
    update("1",Date.UTC(2024, 9, 4, 16, 0, 0)) // 4th Oct 2024, 16:00 GMT Zan
    update("2",Date.UTC(2025, 3, 15, 18, 0, 0)) // 15th April 2025, 18:00 GMT Josh
    update("5",Date.UTC(2006, 6, 6, 23, 12, 0)) // 6th July 2006, 23:12 GMT Shahriyar
}, 1000);
update("1",Date.UTC(2024, 9, 4, 16, 0, 0)) // 4th Oct 2024, 16:00 GMT
update("2",Date.UTC(2025, 3, 15, 18, 0, 0)) // 15th April 2025, 18:00 GMT Josh
update("5",Date.UTC(2006, 6, 6, 23, 12, 0)) // 6th July 2006, 23:12 GMT Shahriyar