const key = "82005d27a116c2880c8f0fcb866998a0";  

var weatherSummary;
var weatherDescription = '';
var object;

function weather(){
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
    var url = `https://api.darksky.net/forecast/f672ff13193bfcc40427a678ebfdbc71/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    
    
    return displayWeather(object) ;
  }


 function displayWeather(object) {
    return object.currently.summary;
 }
