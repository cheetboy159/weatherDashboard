
function APIcalls() {
    url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    APIkey = "&appid=6b9b6924ca7bdd8131872c6e5a9fa3ec";
    queryurl = url + cityInput + APIkey;
    current_weather_url = currenturl + cityInput + APIkey;
    $("#nameOfCity").text("Today's Weather in " + cityInput);
    $.ajax({
        url: current_weather_url,
        method: "GET",
    }).then(function (currentData) {
        var temp = Math.round(((currentData.main.temp - 273.15) * 9 / 5 + 32))
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
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
                console.log(day);
                var month = response.list[i].dt_txt.split("-")[1];
                var year = response.list[i].dt_txt.split("-")[0];
                $("#" + "date" + dayNumber).text(month + "/" + day + "/" + year);
                var temp = Math.round(((response.list[i].main.temp - 273.15) * 9 / 5 + 32));
                $("#" + "fiveDayTemp" + dayNumber).text("Temp: " + temp + String.fromCharCode(176) + "F");
                $("#" + "fiveDayHumidity" + dayNumber).text("Humidity: " + response.list[i].main.humidity);
                $("#" + "fiveDayIcon" + dayNumber).attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                dayNumber++;
            }
        }
    });  
}