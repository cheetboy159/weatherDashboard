var savedCity = [];
// console.log(savedCity);
// var clearHistory = $("#clearHistory");
var searchButton = $("#searchButton");
var searchedCity = $("#searchCity");
var searchCity = $("#searchCity");
// Function for current weather ajax call
function todaysWeather(cityToSearch) {
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
        $("#currentWeather").html(todayWeather);

        if (savedCity == null) {
            savedCity = [];
            savedCity.push(cityToSearch.toUpperCase()
            );
            localStorage.setItem("savedCity", JSON.stringify(savedCity));
            console.log(savedCity);
            loadlastCity(cityToSearch);
        }
        else {
            if (find(cityToSearch) > 0) {
                savedCity.push(cityToSearch.toUpperCase());
                localStorage.setItem("savedCity", JSON.stringify(savedCity));
                loadlastCity(cityToSearch);
            }
        }
    })
}
// function for forcast weather ajax call
function fiveDayWeather(cityToSearch) {
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
            $("#" + i).html(forcastWeather);
        }
    })
}
// function for adding searched city to list
function addToList(city) {
    var listElement = $("<li>" + city.toUpperCase() + "</li>");
    $(listElement).attr("class", "list-group-item");
    $(listElement).attr("data-value", city.toUpperCase());
    $("#listGroup").append(listElement);
}
// function to retrive the list value of searched cities
function invokePastSearch() {
    var liElement = $(this);
    window.listItemDebug = liElement;
    city = liElement.attr("data-value");
    console.log(city);
        todaysWeather(city);
        fiveDayWeather(city);
}
// function to load city from localStorage
function loadlastCity() {
    $("ul").empty();
    var savedCity = JSON.parse(localStorage.getItem("savedCity"));
    if (savedCity !== null) {
        savedCity = JSON.parse(localStorage.getItem("savedCity"));
        for (i = 0; i < savedCity.length; i++) {
            addToList(savedCity[i]);
        }
        city = savedCity[i - 1];
        todaysWeather(cityToSearch);
    }
}
function find(a) {
    for (var i = 0; i < savedCity.length; i++) {
        if (a.toUpperCase() === savedCity[i]) {
            return -1;
        }
    }
    return 1;
}
// function to empty loacalStorage
function clearHistory(){
    savedCity=[];
    localStorage.setItem("savedCity", JSON.stringify(savedCity));
    $("#listGroup").empty();
}
// event handlers
$(window).on("load", loadlastCity);
$(document).on("click","li", invokePastSearch);
$("#searchButton").on("click", displayWeather);
$("#clearHistory").on("click", clearHistory);
var cityToSearch = "";
// function to show weather
function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
        cityToSearch = searchCity.val().trim();
        todaysWeather(cityToSearch);
        fiveDayWeather(cityToSearch);
    }
}