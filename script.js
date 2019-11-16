var moment = moment()
var apiKey = "947259a50f48f4610e089efe46fccce6";

var temperatureConverter = function(valNum) {
    valNum = parseFloat(valNum);
    var Farenheit = ((valNum-273.15)*1.8)+32
    return Farenheit.toFixed();
} 

var loadWeather = function() {
    var x = $("#city-search").val();
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${apiKey}`
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var icon = response.weather[0].icon;
        var weatherIcon = "<img src='" + icon  + "'>";
        var temperature = response.main.temp;
        var windSpeed = response.wind.speed;
        var cityName = response.name;
        var date = moment.format("M/D/YYYY")
        var humid = response.main.humidity;
        var longitude = response.coord.lon
        var lattitude = response.coord.lat
        var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lattitude}&lon=${longitude}`;
        // function to convert temp from Kelvin to Farenheit
        
        $("#temp-faren").empty();
        $("#temp-faren").append(`Temperature: ${temperatureConverter(temperature)}° F.`);
        $("#date-time-icon").empty();
        $("#date-time-icon").append(`${cityName} (${date}) ${weatherIcon}`);
        ;
        $("#humidity").empty();
        $("#humidity").append(`Humidity: ${humid}%`);
        $("#wind-speed").empty();
        $("#wind-speed").append(`Wind-speed: ${windSpeed}`);
    
        var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lattitude}&lon=${longitude}`;
        $.ajax({
            url: uvIndex,
            method: "GET"
        }).then(function(response) {
            $("#uv-index").text(`UV Index: ${response.value}`);
        });
        
        var forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${x}&appid=${apiKey}`
        $.ajax({
            url: forecast,
            method: "GET"
        }).then(function(response) {
            $("#date-1").empty();
            $("#date-1").append(moment.format("M/D/YYYY"));
            $()
            $("#temp-1").append(`Temp: ${temperatureConverter(response.list[0].main.temp)}°`);
            $("#humidity-1").empty();
            $("#humidity-1").append(`Humidity: ${response.list[0].main.humidity}%`);
            console.log(response.list[0])

            //  
        })


    })};

$("#button-search").on("click", function() {
    event.preventDefault();
    x = $("#city-search").val();
    $("#search-history").prepend(
        `<section class="list-group-item list-group-item-action clicked">${x}</section>`
    );
    loadWeather();
  })

// loadWeather();

 



