var cityToSearch = "";
var savedCity = [];
// console.log(savedCity);
// var clearHistory = $("#clearHistory");
var searchButton = $("#searchButton");
var searchedCity = $("#searchCity");
var searchCity = $("#searchCity");

// adds click handler for the search button to run the function displayWeather
$("#searchButton").on("click", displayWeather);
// passes the input to cityToSearch in order to be passed to API searches
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        cityToSearch = searchCity.val().trim();
        console.log(cityToSearch);
        todaysWeather(cityToSearch);
        fiveDayWeather(cityToSearch);
    }
}
displayWeather();
// Function for current weather ajax call
function todaysWeather() {
    var todaysURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&appid=6b9b6924ca7bdd8131872c6e5a9fa3ec";
    $.ajax({
        url: todaysURL,
        method: "GET",
    }).then(function (response) {
        var nameOfCity = "Today's Weather in " + cityToSearch;
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
// function for forcast weather ajax call
function fiveDayWeather() {
    fiveDayWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityToSearch + "&appid=6b9b6924ca7bdd8131872c6e5a9fa3ec";
    $.ajax({
        url: fiveDayWeatherURL,
        method: "GET"
    }).then(function (forcast) {
        for (var i = 0; i < 5; i++) {
            var forcastDate = new Date((forcast.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
            var forcastIconRetreaval = forcast.list[((i + 1) * 8) - 1].weather[0].icon;
            var forcastIconURL = "https://openweathermap.org/img/wn/" + forcastIconRetreaval + ".png";
            var forcastTempKalvin = forcast.list[((i + 1) * 8) - 1].main.temp;
            var forcastTempFarangiht = (((forcastTempKalvin - 273.5) * 1.8) + 32).toFixed(2);
            var forcastHumidity = forcast.list[((i + 1) * 8) - 1].main.humidity;

            var forcastWeather = `
                <p class="forcastDate">${forcastDate}</p>
                <p class="forcastTemp">Temp: ${forcastTempFarangiht}</p>
                <p class="forcastHumidity">Humidity: ${forcastHumidity}</p>
                <img src="${forcastIconURL}">`;
            $("#" + i).append(forcastWeather);
        }
    })
}
