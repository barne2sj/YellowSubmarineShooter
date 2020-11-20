var object;
var weatherDescription;

class weatherCalls {
    constructor() {

      }


    getWeather() {
        var url = `https://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=8e5271b4ba8b5bfac5450a3eb73594ec`;

        return fetch(url)  
        .then(r=>r.json()) // Convert data to json
        .then(function(data) {
            weatherDescription = data.weather[0].main;
        });
}

}