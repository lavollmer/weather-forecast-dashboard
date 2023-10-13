var APIKey = '6ff33c0653b3c13e330cc0ca224708a4';
var city = '';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // here you can take the data you receive and send any part of it to the next then() block.
    const coolData = data.stuff
    return coolData
  })
  .then(function (coolDataFromAbove) {
    // use the coolDataFromAbove for the next fetch call
    fetch("url-from-cooldata")
      .then(function (response) {
        return response.json()
      })
      .then(function (finalData) {
        // Here is your final data!!
      })
  });