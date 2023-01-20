let now = new Date();

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var dayName = days[now.getDay()];
var hoursAndMinutes = now.getHours() + ":" + now.getMinutes();

var today = dayName + " " + hoursAndMinutes;

let li = document.querySelector("p#date");
li.innerHTML = today;

function city(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", city);

//C and F
function temperatureF(event) {
  event.preventDefault();
  var celsius = 19;
  let fahrenheit = Math.floor((celsius * 9) / 5 + 32);
  let input = document.querySelector("span#temperature");

  input.innerHTML = fahrenheit;
}
function temperatureC(event) {
  event.preventDefault();
  var celsius = 19;
  let input = document.querySelector("span#temperature");
  input.innerHTML = celsius;
}

var linkC = document.getElementById("c-link");
var linkF = document.getElementById("f-link");
linkF.addEventListener("click", temperatureF);
linkC.addEventListener("click", temperatureC);

function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("span#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
