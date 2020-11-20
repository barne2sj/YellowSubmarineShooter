var object;
var weatherDescription;

// class weatherCalls {
//     constructor() {

//       }


    async function getWeather() {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=Cincinnati&appid=8e5271b4ba8b5bfac5450a3eb73594ec';
        
        return await fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          return data.weather[0].main ;
        });
}

// }