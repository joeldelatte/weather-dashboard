var apiKey = "947259a50f48f4610e089efe46fccce6";
// var city = $("#city-search").val().toLowerCase()
var city = "London"

var queryURL =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`



$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    var temperature = response.main.temp;
    var windSpeed = response.wind.speed;
    var cityName = response.name
    var time = response
    console.log(windSpeed, cityName, time)
    function temperatureConverter(valNum) {
        valNum = parseFloat(valNum);
        // document.getElementById("outputFahrenheit").innerHTML=((valNum-273.15)*1.8)+32;
        var Farenheit = ((valNum-273.15)*1.8)+32
        console.log(Farenheit.toFixed(2))
    } 
    var longitude = response.coord.lon
    var lattitude = response.coord.lat
    temperatureConverter(temperature)
    var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lattitude}&lon=${longitude}`;
    $.ajax({
        url: uvIndex,
        method: "GET"
    }).then(function(response) {
        console.log(response.value);
    })
}); 

var forecast = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
$.ajax({
    url: forecast,
    method: "GET"
}).then(function(response) {
    // for loop here to iterate through the forecast arrays ?
    console.log(response.list[i])
})
