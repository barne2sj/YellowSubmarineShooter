const weather = {};  
var weatherSummary;
var weatherDescription;
var object;

function getWeather(){
    var weatherWord;
    //if(navigator.geolocation){
        // navigator.geolocation.getCurrentPosition(function(position){
        //   var lat = position.coords.latitude;
        //   var long = position.coords.longitude;
        showWeather();//lat, long);
    //     })
    //   }
    //      else {
    //          // window.alert("Could not get location");
    //     }
    //alert(weatherDescription);
    return weatherDescription;
}

function showWeather() {//lat, long) {

    // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    // var http_request = new XMLHttpRequest();
    // http_request.onreadystatechange = function () { /* .. */ };
    // http_request.open("POST", "https://api.darksky.net/");
    // http_request.withCredentials = true;
    // http_request.setRequestHeader("Content-Type", "application/json");
    // http_request.send({ 'request': "authentication token" });
    var url = `https://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=8e5271b4ba8b5bfac5450a3eb73594ec`;
    //var script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = url;
    // document.getElementsByTagName("head")[0].appendChild(script);
    
    fetch(url)  
    .then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
        alert(data.weather[0].main);
    }); // Call drawWeather  
   
  }

function setWeatherValue(currentWeather){
    weatherDescription = currentWeather;
}
