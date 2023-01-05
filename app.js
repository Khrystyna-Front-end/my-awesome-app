function showWeatherDescription(response) {
  let h1 = document.querySelector("#main-heading");
  let description = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#side-header");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#current-time");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  humidity.innerHTML = `Humidity:  ${response.data.main.humidity} %,`;
  wind.innerHTML = `Wind:${Math.round(response.data.wind.speed)} m/s`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  description.innerHTML = response.data.weather[0].description;
  h1.innerHTML = response.data.name;
  showDailyForecast(response.data.coord);
  console.log(response);
}

function search(city) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherDescription);
  console.log(apiUrl);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  search(city);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let currentTime = document.querySelector("#current-time");
  return (currentTime.innerHTML = `${day} ${hours} : ${minutes}`);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showPosition(position) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#side-header");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#side-header");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahr");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function dailyForecast(response) {
  let weatherForecast = document.querySelector("#weather-forecast");
  // let weatherDay = document.querySelector("#weather-day");
  // let minTemperature = document.querySelector("#min-temperature");
  // let maxTemperature = document.querySelector("#max-temperature");
  // let iconElement = document.querySelector("#weather-icon");
  let forecast = response.data.daily;
  // weatherDay.innerHTML = response.data.daily.dt;
  // iconElement.innerHTML = response.data.daily.weather[0].icon;
  // minTemperature = response.data.daily.temp.min;
  // maxTemperature.innerHTML = response.data.daily.temp.max;
  let forecastHTML = `<div class="row justify-content-center second">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 weather-items">
            <p id="weather-day">${formatDay(forecastDay.dt)}</p>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="weather-icon3" id = "weather-icon"/><br />
            <p id="weather-temperature"><span id = "max-temperature">${Math.round(
              forecastDay.temp.max
            )}</span>.....<span id = "min-temperature">${Math.round(
          forecastDay.temp.min
        )}</span></p>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecast.innerHTML = forecastHTML;
}

function showDailyForecast(coord) {
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dailyForecast);
}

search("London");
