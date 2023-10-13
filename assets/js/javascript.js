const APIKey = '02198656acbfe2c2afe6c0d052bc513c';

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
          // Here is your final data!!
          console.log(finalData);
          var weather = finalData.list[0].main;
          $("#city").text(finalData.city.name)
          $("#date").text(dayjs.unix(finalData.list[0].dt).format("MM / DD / YYYY"))
          $("#icon").attr("src", "https://openweathermap.org/img/wn/" + finalData.list[0].weather[0].icon + ".png")
          $("#temp").text(weather.temp + " F");
          $("#wind").text(finalData.list[0].wind.speed + " MPH");
          $("#humidity").text(weather.humidity + " %");
          for (var i = 8; i < finalData.list.length; i += 8) {
            var day = finalData.list[i];
            console.log(day);
            var fiveDate = $("<p>").text(dayjs.unix(finalData.list[i].dt).format("MM / DD / YYYY"))
            $("#fiveDayForecast").append(fiveDate)
            var fiveIcon = $("<p>").attr("src", "https://openweathermap.org/img/wn/" + finalData.list[0].weather[0].icon + ".png")
            $("#fiveDayForecast").append(fiveIcon)
            var fiveTemp = $("<p>").text(weather.temp + " F");
            $("#fiveDayForecast").append(fiveTemp)
            var fiveWind = $("<p>").text(finalData.list[0].wind.speed + " MPH");
            $("#fiveDayForecast").append(fiveWind)
            var fiveHumidity = $("<p>").text(weather.humidity + " %");
            $("#fiveDayForecast").append(fiveHumidity)
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
});
