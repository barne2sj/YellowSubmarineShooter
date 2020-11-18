const key = "82005d27a116c2880c8f0fcb866998a0";  

const weather = {};  
var weatherSummary;
var weatherDescription = '';
var object;

function getWeather(){
    var weatherWord;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          weatherWord = showWeather(lat, long);
        })
      }
         else {
             // window.alert("Could not get location");
        }
    return weatherWord;
}

function showWeather(lat, long) {

    // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    // var http_request = new XMLHttpRequest();
    // http_request.onreadystatechange = function () { /* .. */ };
    // http_request.open("POST", "https://api.darksky.net/");
    // http_request.withCredentials = true;
    // http_request.setRequestHeader("Content-Type", "application/json");
    // http_request.send({ 'request': "authentication token" });
    var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = url;
    // document.getElementsByTagName("head")[0].appendChild(script);
    
    fetch(url)  
    .then(function(response){  
        let data = response.json();  
        return data;  
    })  
    .then(function(data){  
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);  
        weather.description = data.weather[0].description;  
        weather.iconId = data.weather[0].icon;  
        weather.city = data.name;  
        weather.country = data.sys.country;  
    })  
    .then(function(){  
       return weather.description;
    });  
   
  }


