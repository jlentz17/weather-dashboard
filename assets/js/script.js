// define variable for apiKey and endpoint so its easier
var apiKey = "3870f0a27cb3db5d0e47646b3e356296";
var endPoint= `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`

// fetch Weather Data
function getWeather() {
var currentCityWeatherName;
fetch(endPoint)
.then((response)=> response.json()) 
.then(function(weather){
currentCityWeatherName=weather.city.name;
console.log(currentCityWeatherName);
addWeatherData(currentCityWeatherName)
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
}
function addWeatherData(currentCityWeatherName){
var weatherEl = document.querySelector(".weatherEl");
weatherEl.textContent = currentCityWeatherName;
// var weatherDateEl = document.querySelector(".weatherDateEl");
// weatherDateEl.textContent = currentDate
}
getWeather();
console.log(document);

