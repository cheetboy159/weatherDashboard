var APIKey ="6b9b6924ca7bdd8131872c6e5a9fa3ec";
var city = "East Brunswick";
var savedCity = [""];

// var clearHistory = $("#clearHistory");
// var searchButton = $("#searchButton");
var searchedCity = $("#searchCity");


function todaysWeather(){
    var todaysURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:todaysURL,
        method:"GET",
    }).then(function(response){
        console.log(response);
    });
}