var cityInput = "";
var url = "";
var APIkey = "";
var queryurl = "";
var currenturl = "";
var citiesDiv = document.getElementById("citiesInLocalStorage");
//start with empty array

init();
buttonList();
searchbtn();
//check storage
function init() {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
        citiesArray = savedCities
    }
    renderButtons();
}

var citiesArray = [];
//on click function for search history buttons
function buttonList() {
    $(".listbtn").on("click", function (event) {
        event.preventDefault();
        cityInput = $(this).text().trim();
        APIcalls();
    })
}
//sets localstorage item to cities array 
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(citiesArray));
}


//on click function for main search bar
function searchbtn() {
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        cityInput = $(this).prev().val().trim()
        //push the city user entered into cities array 
        citiesArray.push(cityInput);
        //make sure cities array.length is never more than 8 
        if (citiesArray.length > 8) {
            citiesArray.shift()
        }
        //return from function early if form is blank
        if (cityInput == "") {
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
    })
}

//render buttons for each citie
function renderButtons() {
    citiesDiv.innerHTML = "";
    if (citiesArray == null) {
        return;
    }
    var uniqueCities = [...new Set(citiesArray)];
    for (var i = 0; i < uniqueCities.length; i++) {
        var cityName = uniqueCities[i];
        var buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");
        citiesDiv.appendChild(buttonEl);
        buttonList();
    }
}

//runs 2 API calls, one for current weather data and one for five-day forecast, then populates text areas
function APIcalls() {
    url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    APIkey = "&appid=6b9b6924ca7bdd8131872c6e5a9fa3ec";
    queryurl = url + cityInput + APIkey;
    current_weather_url = currenturl + cityInput + APIkey;
    $("#nameOfCity").text("Today's Weather in " + cityInput);
    //function to display data in main div 
    $.ajax({
        url: current_weather_url,
        method: "GET",
    }).then(function (currentData) {
        // console.log(currentData);
        var temp = Math.round(((currentData.main.temp - 273.15) * 9 / 5 + 32))
        // console.log("The temperature in " + cityInput + " is: " + temp);
        $("#tempNow").text("Temperature: " + temp + String.fromCharCode(176) + "F");
        $("#humidityNow").text("Humidity: " + currentData.main.humidity);
        $("#windSpeedNow").text("Wind Speed: " + currentData.wind.speed);
        $("#icon").attr({
            "src": "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
            "height": "100px", "width": "100px"
        });
    })
    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function (response) {
        var dayNumber = 0;
        //iterate through the 40 weather data sets
        for (var i = 0; i < response.list.length; i++) {
            //split function to isolate the time from the time/data aspect of weather data, and only select weather reports for 3pm
            if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                //if time of report is 3pm, populate text areas accordingly
                var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = response.list[i].dt_txt.split("-")[1];
                var year = response.list[i].dt_txt.split("-")[0];
                $("#" + "date" + dayNumber).text(month + "/" + day + "/" + year);
                var temp = Math.round(((response.list[i].main.temp - 273.15) * 9 / 5 + 32));
                $("#" + "fiveDayTemp" + dayNumber).text("Temp: " + temp + String.fromCharCode(176) + "F");
                $("#" + "fiveDayHumidity" + dayNumber).text("Humidity: " + response.list[i].main.humidity);
                $("#" + "fiveDayIcon" + dayNumber).attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                // console.log(response.list[i].dt_txt.split("-"));
                // console.log(dayNumber);
                // console.log(response.list[i].main.temp);
                dayNumber++;
            }
        }
    });

    
}