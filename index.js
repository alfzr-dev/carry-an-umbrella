
function getLocation(){
  navigator.geolocation.getCurrentPosition((event)=>{
        
        const lat = event.coords.latitude;
        const lon = event.coords.longitude;

        getWeather(lat,lon);

        
    });
    
}

function getWeather(lat,lon){
    const API_KEY = `0c3cebdedd20388d040b0b2b4c6ef71d`;
    const urlIsRaining = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const codes = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
    fetch(urlIsRaining)
    .then ((response) => response.json())
    .then ((data) => {
        const id= data.weather[0].id;
        document.getElementById("name").innerHTML=data.name;
        codes.includes(id) ? isRaining() : willRain(lat,lon);

    }

    
    );

}

function isRaining(){
        document.getElementById("number").innerHTML="100%";
        document.getElementById("image").src="./images/rain.svg"

}

function willRain(lat,lon){


    const API_KEY = `0c3cebdedd20388d040b0b2b4c6ef71d`;
    const urlWillRain = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(urlWillRain)
    .then((response)=>response.json())
    .then((data)=>{
        const pop = (data.list[0].pop) *100;
        document.getElementById("number").innerHTML = pop + "%";
        pop<35 ? document.getElementById("image").src="/images/norain.png" : document.getElementById("image").src="./images/rain.svg"
    })

}

getLocation();



