const cityInput      = document.getElementById("city-input");
const searchBtn      = document.getElementById("search-btn");
const glassContainer = document.querySelector(".glass-container");

searchBtn.addEventListener("click", () => {
    const cityName = cityInput.value.trim();
    if (cityName !== "") {
        console.log(cityName);
        cityInput.value = "";
    }
});