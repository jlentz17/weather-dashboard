// define variable for apiKey and endpoint so its easier
var api_key = "3870f0a27cb3db5d0e47646b3e356296";
var formInput = document.querySelector("#user-form");
var cityInput = document.querySelector("#cityInput");
var cityTemp = document.querySelector(".cityTemp");
var cityWind = document.querySelector(".cityWind");
var cityHumidity = document.querySelector(".cityHumidity");
var cityName = document.querySelector(".cityName");
var forecastContainer = document.querySelector(".forecastContainer");
var uvIndex = document.querySelector(".uvi");
var lat;
var lon;
// convert Kelvin to Farhenheit
// Clear local storage after page reload
localStorage.clear();
// fetch Weather Data
formInput.addEventListener("submit", function (event) {
  event.preventDefault();
  var formValue = event.target[0].value.trim();
  if (formValue) {
    getWeather(formValue);
    // Don't know how to make this line work, and NOW I figured it out! I just had to match the id and target the variable at the top(#cityInput)
    cityInput.value = "";
  } else {
    alert("Enter Something!!!");
  }
  getWeather(formValue);
});
var currentCityWeatherName;
function getWeather(formValue) {
  var endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${formValue}&appid=${api_key}`;
  fetch(endPoint)
    .then((response) => response.json())
    .then(function (weather) {
      currentCityWeatherName = weather;
      var lat = weather.coord.lat;
      console.log(lat);
      var lon = weather.coord.lon;
      var icon = weather.weather[0].icon;
      var iconSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      var img = document.createElement("img");
      img.setAttribute("src", iconSource);
      // console.log(weather);
      // console.log(currentCityWeatherName);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          weatherCards(data);
          var uvIndex = current.uvi;
          console.log(lat);
          uvIndex.textContent = current.uvi;
        });
      addWeatherData(currentCityWeatherName);
    });
  // var currentDate;
  // fetch(endPoint)
  // .then((response)=> response.json())
  // .then(function(weather){
  // currentDate=weather.city.date;
  // console.log(currentDate)
  // addWeatherData(currentDate)
  // });
  // .then response {
  // if(response.ok)
  // console.log(response.json());
  // // var weatherEl = document.querySelector(".weatherEl");
  // // weatherEl.innerText()
  // });
  function addWeatherData(currentCityWeatherName) {
    var kelvinWeather = currentCityWeatherName.main.temp;
    var newTemp = Math.floor(((kelvinWeather - 273.15) * 9) / 5) + 32;
    // console.log(kelvinWeather)
    // How to make multiple lines???? I've tried commas, spaces, /n... and the data is all next to each other. Please help THX!!
    cityName.textContent = currentCityWeatherName.name;
    cityTemp.textContent = newTemp + "ºF";
    cityWind.textContent =
      Math.round(currentCityWeatherName.wind.speed) + "MPH";
    cityHumidity.textContent = currentCityWeatherName.main.humidity + "%";
    // uvi.textContent = lat;

    uvi.textContent = current.uvi
  }
  // var weatherDateEl = document.querySelector(".weatherDateEl");
  // weatherDateEl.textContent = currentDate
}
function weatherCards(data) {
  console.log(data);
  for (var i = 0; i < 5; i++) {
    var day = data.daily[i];
    console.log(day);
    var card = document.createElement("div");
    // Do the same for all of these and add styling and labels!!
    var newTemp = document.createElement("h3");
    newTemp.textContent = day.temp.day;
    card.append(newTemp);
    var kelvinWeather = currentCityWeatherName.main.temp;
    var newTemp = Math.floor(((kelvinWeather - 273.15) * 9) / 5) + 32;
    // humidity
    var humidity = document.createElement("h3");
    humidity.textContent = day.humidity;
    card.append(humidity);
    // wind
    var wind = document.createElement("h3");
    wind.textContent = day.wind_speed;
    card.append(wind);
    forecastContainer.append(card);
    // uv index
    uvIndex = document.createElement("h3");
    uvIndex.textContent = day.uvi;
    card.append(uvIndex);
    forecastContainer.append(card);
  }
}
// getWeather();
// console.log(document);


// if uvi < uvi.classlist.add()
// then append