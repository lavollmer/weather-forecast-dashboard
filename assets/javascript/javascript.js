const APIKey = '02198656acbfe2c2afe6c0d052bc513c';
var city = 'London';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var queryURLtwo = "api.openweathermap.org / data / 2.5 / forecast ? lat = ${lat} & lon=${lon} & appid=" + APIKey;

fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&appid=02198656acbfe2c2afe6c0d052bc513c")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // here you can take the data you receive and send any part of it to the next then() block.
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    console.log(latitude);
    console.log(longitude);
    var moreData = { lat: latitude, lon: longitude };
    return moreData;
  })
  .then(function (moreData) {
    // use the latitude and longitude for the next fetch call
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=02198656acbfe2c2afe6c0d052bc513c`)
      .then(function (response) {
        return response.json()
      })
      .then(function (finalData) {
        // Here is your final data!!
        var weather = finalData.weather[0].main;
        console.log(weather);
        return weather;
      })
  });