const apiKey = "02a0c178ddfdf08eeb0c18c23066dd4d"; // Your actual OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const error = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  error.classList.add("hidden");
  card.classList.add("hidden");

  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.getElementById("cityName").textContent = `City: ${data.name}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById("weatherCondition").textContent = `Weather: ${data.weather[0].main}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").textContent = `Wind Speed: ${data.wind.speed} km/h`;

    card.classList.remove("hidden");
  } catch (err) {
    error.textContent = "City not found. Please try again.";
    error.classList.remove("hidden");
  }
}
