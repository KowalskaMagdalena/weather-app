let now = new Date();
let celsiusTemp;

var linkC = document.querySelector("#c-link");
linkC.style.pointerEvents = "none";
var linkF = document.querySelector("#f-link");
linkF.addEventListener("click", temperatureF);
linkC.addEventListener("click", temperatureC);

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

let span = document.querySelector("span#date");
span.innerHTML = today;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// Display Forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="Clear"
                  id="icon"
                  width="42"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>`;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//C and F
function temperatureF(event) {
  event.preventDefault();
  let fahrenheit = Math.floor((celsiusTemp * 9) / 5 + 32);
  linkC.style.pointerEvents = "auto";
  linkF.style.pointerEvents = "none";
  let input = document.querySelector("#temperature");

  input.innerHTML = fahrenheit;
}

function temperatureC(event) {
  event.preventDefault();
  let input = document.querySelector("#temperature");
  linkC.style.pointerEvents = "none";
  linkF.style.pointerEvents = "auto";
  input.innerHTML = celsiusTemp;
}

// Weather
function displayWeatherCondition(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
  celsiusTemp = Math.round(response.data.main.temp);

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

  document.querySelector("#feel").innerHTML = Math.round(
    response.data.main.feels_like
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// City Form
function city(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", city);

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let showCurrentLocation = document.querySelector("#location-btn");
showCurrentLocation.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Gdansk");
