var APIKey = '02198656acbfe2c2afe6c0d052bc513c';
var city = 'London';
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch("https://api.openweathermap.org/geo/1.0/direct?q=London&appid=02198656acbfe2c2afe6c0d052bc513c")
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // here you can take the data you receive and send any part of it to the next then() block.
    const latitude = data.lat;
    const long = data.lon;
    return { latitude, long };
  })
  .then(function (coolDataFromAbove) {
    // use the latitude and longitude for the next fetch call
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${long}&appid=02198656acbfe2c2afe6c0d052bc513c")
      .then(function (response) {
        return response.json()
      })
      .then(function (finalData) {
        // Here is your final data!!
        const weather = finalData.weather.main;
        return weather
      })
  });