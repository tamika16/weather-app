function refreshWeather(response) {
    let temperatureElement = document.querySelector("#weather-app-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let speed = response.data.wind.speed;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let weatherIconElement = document.querySelector("#weather-app-icon");
    
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${Math.round(speed)}mph`;
    timeElement.innerHTML = formateDate(date);
    weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class=weather-app-icon />`;

    getForecast(response.data.city);
}

function formateDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "ebca453d09d2of07d0aaa7ab4fdt23ed";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "ebca453d09d2of07d0aaa7ab4fdt23ed";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecast = document.querySelector("#forecast");

    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
        forecastHtml +=
        `
        <div class="row">
            <div class="col-2">
                <div class="forecast-day">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="forecast-icon" />
                <div class="forecast-temperature">
                    <span class="forecast-temperature-max">${Math.round(day.temperature.maximum)}</span>
                    <span class="forecast-temperature-min">${Math.round(day.temperature.minimum)}</span>
                </div>
            </div>
        </div>
        `;
        }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Pittsburgh");