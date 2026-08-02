const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const glassContainer = document.querySelector(".glass-container");
const API_KEY = "YOUR_API_KEY_HERE";

// جستجو با کلیک روی دکمه
searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName !== "") {
        getWeatherData(cityName);
        cityInput.value = "";
    }
});

// جستجو با زدن دکمه Enter در کیبورد
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const cityName = cityInput.value.trim();
        if (cityName !== "") {
            getWeatherData(cityName);
            cityInput.value = "";
        }
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}