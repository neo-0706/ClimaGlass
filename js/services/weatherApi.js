import { API_KEY, API_BASE_URL } from "../config.js";

/**
 * Fetch weather data for a given city from OpenWeatherMap API.
 * @param {string} city - Name of the city to search for.
 * @returns {Promise<Object>} Resolved OpenWeatherMap weather object.
 */
export async function getWeatherData(city) {
  const response = await fetch(
    `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error(`City not found (Status: ${response.status})`);
  }

  return await response.json();
}
