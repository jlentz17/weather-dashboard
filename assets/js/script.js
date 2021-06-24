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
var img;
// convert Kelvin to Farhenheit
// fetch Weather Data
formInput.addEventListener("submit", function (event) {
  event.preventDefault();
  var formValue = event.target[0].value.trim();
  if (formValue) {
    searchHistory.push(formValue);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    getWeather(formValue);
    generateBtns();
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
      var lon = weather.coord.lon;
      var icon = weather.weather[0].icon;
      var iconSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      img = document.createElement("img");
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
          var uvI = data.current.uvi;
          // uvIndex.textContent = lat;
          uvIndex.textContent = "UV Index: "+ uvI;
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
    cityTemp.textContent = "Temperature: " + newTemp + " ºF";
    cityWind.textContent =
      "Wind Speed: " + Math.round(currentCityWeatherName.wind.speed) + "MPH";
    cityHumidity.textContent = "Humidity: " + currentCityWeatherName.main.humidity + "%";
  }
  // var weatherDateEl = document.querySelector(".weatherDateEl");
  // weatherDateEl.textContent = currentDate
}
function weatherCards(data) {
  forecastContainer.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var day = data.daily[i];
    // console.log(day);
    var card = document.createElement("div");
    // Do the same for all of these and add styling and labels!!
    var newTemp = document.createElement("h3");
  

    var kelvinWeather = day.temp.day;
    var newRightTemp = Math.floor(((kelvinWeather - 273.15) * 9) / 5) + 32;

    newTemp.textContent = "Temperature: " + newRightTemp + "℉";
     // console.log(newRightTemp)
    card.append(newTemp);
    // wind
    var wind = document.createElement("h3");
    wind.textContent = "Wind Speed: " + day.wind_speed + "MPH";
    card.append(wind);
    // humidity
    var humidity = document.createElement("h3");
    console.log(img)
    humidity.textContent = "Humidity: " + day.humidity + "%";
    card.append(humidity);
    card.append(img);
    forecastContainer.append(card)
    // uv index
    // uvIndex = document.createElement("h3");
    // uvIndex.textContent = day.uvi;
    // card.append(uvIndex);
    // forecastContainer.append(card);
  }
}

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || 
[];

function generateBtns(){
  document.querySelector(".container").innerHTML = ""
  for (let i= 0; i < searchHistory.length; i++){
    var searchBtn = document.createElement("button")
    searchBtn.textContent = searchHistory[i]
    searchBtn.addEventListener("click", function(){

      getWeather(this.textContent)

    })
    document.querySelector(".container").append(searchBtn)

  }

}

// function searchHistoryBtn(){
//   searchHistoryBtn.addEventListener("click", ){

//   }
// }

generateBtns();

// getWeather();
// console.log(document);


// if uvi < uvi.classlist.add()
// then append