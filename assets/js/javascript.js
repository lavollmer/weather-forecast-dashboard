const APIKey = '02198656acbfe2c2afe6c0d052bc513c';
var city = [''];

function searchWeather(city) {
  fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=02198656acbfe2c2afe6c0d052bc513c")
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
      console.log(moreData);
      // use the latitude and longitude for the next fetch call
      fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + moreData.lat + "&lon=" + moreData.lon + "&appid=02198656acbfe2c2afe6c0d052bc513c&units=imperial")
        .then(function (response) {
          return response.json()
        })
        .then(function (finalData) {
          //final data
          console.log(finalData);
          var weather = finalData.list[0].main;
          $("#city").text(finalData.city.name)
          $("#date").text(dayjs.unix(finalData.list[0].dt).format("(MM/DD/YYYY)"))
          $("#icon").attr("src", "https://openweathermap.org/img/wn/" + finalData.list[0].weather[0].icon + ".png")
          $("#temp").text("Temperature: " + weather.temp + " F");
          $("#wind").text("Wind: " + finalData.list[0].wind.speed + " MPH");
          $("#humidity").text("Humidity: " + weather.humidity + " %");
          //five day forecast
          for (var i = 8; i < finalData.list.length; i += 8) {
            var day = finalData.list[i];
            console.log(day);
            var fiveDate = $("<p>").text(dayjs.unix(finalData.list[i].dt).format("(MM/DD/YYYY)"))
            $("#weatherInfo").append(fiveDate)
            var fiveIcon = $("<p>").attr("src", "https://openweathermap.org/img/wn/" + finalData.list[0].weather[0].icon + ".png")
            $("#weatherInfo").append(fiveIcon)
            var fiveTemp = $("<p>").text("Temperature: " + weather.temp + " F");
            $("#weatherInfo").append(fiveTemp)
            var fiveWind = $("<p>").text("Wind: " + finalData.list[0].wind.speed + " MPH");
            $("#weatherInfo").append(fiveWind)
            var fiveHumidity = $("<p>").text("Humidity: " + weather.humidity + " %");
            $("#weatherInfo").append(fiveHumidity)
          }
          console.log(weather);
          return weather;
        })
    });
}
//save info in local storage
$(".btn-primary").click(function (event) {
  event.preventDefault();
  console.log("click");
  // var btnCityPrimary = $(this).siblings(".form-control").val();
  var city = $("#cityName").val();
  console.log(city);
  searchWeather(city);
  //stores btnSave which is the text in local storage under "info" key
  // localStorage.setItem(city), btnSave)

  const weatherHis = localStorage.setItem("cityHistory", city);
  var cityWeather = JSON.parse(localStorage.getItem("cityHistory"));
});

// localStorage.setItem('compressedfunc', myFunction.toString());
// const history = $("#cityName").val();
// var city = $("#cityName").val();
// const weatherHis = localStorage.setItem("cityHistory", city);
// var cityWeather = JSON.parse(localStorage.getItem("cityHistory"));