function showWeatherDescription(response) {
  console.log(response);
  let h1 = document.querySelector("#main-heading");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#side-header");
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity:  ${response.data.main.humidity} %,`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind:${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  h1.innerHTML = response.data.name;
}
function search(city) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherDescription);
}
function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

function changeCurrentTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentTime = document.querySelector("#current-time");
  return (currentTime.innerHTML = `${day} ${hours} : ${minutes}`);
}
changeCurrentTime();

function showPosition(position) {
  let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(`${apiUrl}&units=${unit}`).then(showWeatherDescription);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

search("London");
