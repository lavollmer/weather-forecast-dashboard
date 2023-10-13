var APIKey = '6ff33c0653b3c13e330cc0ca224708a4';
var city = 'London';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch("http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6ff33c0653b3c13e330cc0ca224708a4")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // here you can take the data you receive and send any part of it to the next then() block.
    const latitude = data.lat;
    const long = data.lon;
    return latitude
    return long
  })
  .then(function (coolDataFromAbove) {
    // use the latitude and longitude for the next fetch call
    fetch("api.openweathermap.org/data/2.5/forecast?lat=latitude&lon=long&appid=6ff33c0653b3c13e330cc0ca224708a4")
      .then(function (response) {
        return response.json()
      })
      .then(function (finalData) {
        // Here is your final data!!
        const weather = weather.main;
      })
  });