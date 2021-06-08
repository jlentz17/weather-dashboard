// define variable for apiKey and endpoint so its easier
var api_key = "3870f0a27cb3db5d0e47646b3e356296";

// fetch Weather Data

var formInput = document.querySelector("#user-form");
formInput.addEventListener("submit", function (event) {
  event.preventDefault();
  var formValue = event.target[0].value;
  console.log(formValue);
  getWeather(formValue);
});

function getWeather(formValue) {
  var endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${formValue}&appid=${api_key}`;

  var currentCityWeatherName;
  fetch(endPoint)
    .then((response) => response.json())
    .then(function (weather) {
        currentCityWeatherName = weather;
      console.log(weather);
      console.log(currentCityWeatherName);
      addWeatherData(currentCityWeatherName);
    });
}

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
  var weatherEl = document.querySelector(".weatherEl");
  weatherEl.textContent = currentCityWeatherName.name;

  weatherEl.append(`
    ${currentCityWeatherName.main.temp}℉

    ${currentCityWeatherName.wind.speed}MPH

    ${currentCityWeatherName.main.humidity}%`)

  


  // var weatherDateEl = document.querySelector(".weatherDateEl");
  // weatherDateEl.textContent = currentDate
}
// getWeather();
// console.log(document);
