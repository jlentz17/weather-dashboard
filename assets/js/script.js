// define variable for apiKey and endpoint so its easier
var api_key = "3870f0a27cb3db5d0e47646b3e356296";
var endPoint= `https://api.openweathermap.org/data/2.5/weather?q=${formValue}&appid=${api_key}`

var formValue;

// fetch Weather Data

function getWeather() {
var currentCityWeatherName;
fetch(endPoint)
.then((response)=> response.json()) 
.then(function(weather){
console.log(weather)
console.log(currentCityWeatherName);
addWeatherData(currentCityWeatherName)
});

var formInput = document.querySelector("#user-form");
    formInput.addEventListener("submit", function(event){
        event.preventDefault();
        formValue = event.target[0].value;
        console.log(formValue);
        getWeather();
    })
    
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

function addWeatherData(currentCityWeatherName){
var weatherEl = document.querySelector(".weatherEl");
weatherEl.textContent = currentCityWeatherName;
// var weatherDateEl = document.querySelector(".weatherDateEl");
// weatherDateEl.textContent = currentDate
}
// getWeather();
// console.log(document);

