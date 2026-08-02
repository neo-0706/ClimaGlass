const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const messageBox = document.getElementById("message-box");
const weatherDisplay = document.getElementById("weather-display");
const API_KEY = "46501c7d7efcc7295e001386c0d9a842";

weatherDisplay.classList.add("hide");

searchBtn.addEventListener("click", () => {
  handleSearch();
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function handleSearch() {
  const cityName = cityInput.value.trim();
  if (cityName !== "") {
    getWeatherData(cityName);
    cityInput.value = "";
  }
}

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    );

    if (response.ok) {
      const data = await response.json();
      updateUI(data);
    } else {
      throw new Error(`City not found (Status: ${response.status})`);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("City not found or network error. Please try again.");
  }
}

function updateUI(data) {
  document.getElementById("city-name").textContent =
    `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").innerHTML =
    `${Math.round(data.main.temp)}<span>°C</span>`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;
  document.getElementById("weather-condition").textContent =
    data.weather[0].description;

  const timezoneOffset = data.timezone;
  const localDate = getLocalTime(timezoneOffset);

  document.getElementById("local-date").textContent = localDate.dateString;

  document.getElementById("sunrise-time").textContent = formatTime(
    data.sys.sunrise,
    timezoneOffset,
  );
  document.getElementById("sunset-time").textContent = formatTime(
    data.sys.sunset,
    timezoneOffset,
  );

  messageBox.classList.add("hide");
  weatherDisplay.classList.remove("hide");
}

function formatTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm}`;
}

function getLocalTime(timezoneOffset) {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + 3600000 * (timezoneOffset / 3600));

  const options = { weekday: "long", day: "numeric", month: "short" };
  const dateString = cityTime.toLocaleDateString("en-US", options);

  return { dateString };
}
