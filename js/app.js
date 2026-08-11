import { getWeatherData } from "./services/weatherApi.js";
import { weatherState } from "./state/weatherState.js";
import { elements } from "./ui/domElements.js";
import {
  setLoadingState,
  showMessage,
  renderWeather,
  getInputValue,
  setInputValue,
  clearInput,
  setSearchDisabled,
  toggleClearButton
} from "./ui/weatherUI.js";

/**
 * Handle city weather search action.
 */
async function handleSearch() {
  const cityName = getInputValue();
  if (!cityName) return;

  weatherState.setLoading(true);
  setLoadingState();

  try {
    const data = await getWeatherData(cityName);
    weatherState.setWeatherData(data, cityName);
    renderWeather(data);
    setInputValue(data.name);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    weatherState.setError(error.message);
    showMessage("City not found. Check the spelling and try again.", true);
  } finally {
    setSearchDisabled(false);
  }
}

/**
 * Handle clearing persistent weather state.
 */
function handleClear() {
  weatherState.clearState();
  clearInput();
  showMessage("Search for a city to see the magic happen.", false);
  toggleClearButton(false);
}

/**
 * Initialize event listeners and start the application.
 */
function init() {
  // Rehydrate state from localStorage on app load
  const currentState = weatherState.loadFromStorage();

  if (currentState.weatherData) {
    renderWeather(currentState.weatherData);
    setInputValue(currentState.lastQuery || currentState.weatherData.name || "");
  } else {
    toggleClearButton(false);
  }

  if (elements.searchBtn) {
    elements.searchBtn.addEventListener("click", handleSearch);
  }

  if (elements.clearBtn) {
    elements.clearBtn.addEventListener("click", handleClear);
  }

  if (elements.cityInput) {
    elements.cityInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  }
}

// Start application after DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}