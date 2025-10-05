const apiKey = "fe63b3a2d63451280cf14ab274872043";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherDiv = document.getElementById("weather");

    if (city === "") {
        weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            weatherDiv.innerHTML = "<p>City not found!</p>";
            return;
        }

        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherDiv.innerHTML = `
          <img src="${icon}" alt="Weather icon">
          <div class="temp">${data.main.temp}°C</div>
          <div class="desc">${data.weather[0].description}</div>
          <div class="city">${data.name}, ${data.sys.country}</div>
          <div class="extra">
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
          <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
          <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
          </div>
        `;
    } catch (error) {
        weatherDiv.innerHTML = "<p>Something went wrong. Try again.</p>";
    }
}

