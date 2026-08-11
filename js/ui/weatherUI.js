import { elements } from "./domElements.js";
import { formatTime, getLocalTime } from "../utils/dateTime.js";

/**
 * Display loading spinner and disable search button.
 */
export function setLoadingState() {
  setSearchDisabled(true);
  showMessage("Fetching weather data...", false, "fa-spinner fa-spin");
}

/**
 * Display message state (welcome or error message).
 * @param {string} text 
 * @param {boolean} isError 
 * @param {string} iconClass 
 */
export function showMessage(text, isError = false, iconClass = "fa-cloud-sun") {
  elements.messageText.textContent = text;
  elements.messageIcon.className = `fa-solid ${iconClass} message-icon${isError ? " error" : ""}`;
  elements.weatherWrapper.classList.add("hide");
  elements.messageWrapper.classList.remove("hide");
}

/**
 * Toggle visibility of the clear saved state button.
 * @param {boolean} visible 
 */
export function toggleClearButton(visible) {
  if (elements.clearBtn) {
    if (visible) {
      elements.clearBtn.classList.remove("hide");
    } else {
      elements.clearBtn.classList.add("hide");
    }
  }
}

/**
 * Update and render weather content onto the page.
 * @param {Object} data - Weather API data object
 */
export function renderWeather(data) {
  elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
  elements.temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.windSpeed.textContent = `${data.wind.speed} km/h`;
  elements.weatherCondition.textContent = data.weather[0].description;

  const timezoneOffset = data.timezone;
  const localDate = getLocalTime(timezoneOffset);

  elements.localDate.textContent = localDate.dateString;

  elements.sunriseTime.textContent = formatTime(
    data.sys.sunrise,
    timezoneOffset
  );
  elements.sunsetTime.textContent = formatTime(
    data.sys.sunset,
    timezoneOffset
  );

  elements.messageWrapper.classList.add("hide");
  elements.weatherWrapper.classList.remove("hide");
  toggleClearButton(true);
}

/**
 * Get trimmed value from city input field.
 * @returns {string}
 */
export function getInputValue() {
  return elements.cityInput.value.trim();
}

/**
 * Set value in city input field.
 * @param {string} value 
 */
export function setInputValue(value = "") {
  if (elements.cityInput) {
    elements.cityInput.value = value;
  }
}

/**
 * Clear the input field text.
 */
export function clearInput() {
  elements.cityInput.value = "";
}

/**
 * Enable or disable search button.
 * @param {boolean} disabled 
 */
export function setSearchDisabled(disabled) {
  elements.searchBtn.disabled = disabled;
}
