var APIKey ="6b9b6924ca7bdd8131872c6e5a9fa3ec";
var city = "East Brunswick";
var savedCity = [""];

// var clearHistory = $("#clearHistory");
// var searchButton = $("#searchButton");
var searchedCity = $("#searchCity");


function todaysWeather(){
    var todaysURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $.ajax({
        url:todaysURL,
        method: "GET",
    }).then(function(response){
        var nameOfCity = "Today's Weather in " + city;
        var temp = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32));
        var tempNow = "Temperature: " + temp + String.fromCharCode(176) + "F";
        var humidityNow = "Humidity: " + response.main.humidity;
        var windSpeedNow = "Wind Speed: " + response.wind.speed;
        var iconNow = "src=http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var todayWeather = `<div class="weatherNow">
                <h2 class="nameOfCity">${nameOfCity}</h2>
                <p class="tempNow">${tempNow}</p>
                <p class="humidityNow">${humidityNow}</p>
                <p class="windSpeedNow">${windSpeedNow}</p>
                <img class="iconNow"${iconNow}></div>`;
        $("#currentWeather").append(todayWeather);
    })
    
}
function fiveDayWeather(){
    fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + APIKey;
    $.ajax({
        url:fiveDayWeatherURL,
        method:"GET"
    }).then(function(forcast){
        for (i = 0; i < 5; i++) {
            var forcastDate = new Date((forcast.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var forcastIconRetreaval = forcast.list[((i + 1) * 8) - 1].weather[0].icon;
            var forcastIconURL = "https://openweathermap.org/img/wn/" + forcastIconRetreaval + ".png";
            var forcastTempKalvin = forcast.list[((i + 1) * 8) - 1].main.temp;
            var forcastTempFarangiht = (((forcastTempKalvin - 273.5) * 1.8) + 32).toFixed(2);
            var forcastHumidity = forcast.list[((i + 1) * 8) - 1].main.humidity;

            var forcastWeather = `
            <div class="col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded">
                <p class="forcastDate">${forcastDate}</p>
                <p class="forcastTemp">${forcastTempFarangiht}</p>
                <p class="forcastHumidity">${forcastHumidity}</p>
                <img class="forcastIcon"${forcastIconURL}></div>`;
            $("#"+i).append(forcastWeather);
        }
    })
}
todaysWeather();
fiveDayWeather();
