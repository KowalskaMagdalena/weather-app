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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("New York");
