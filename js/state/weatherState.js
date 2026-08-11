import { saveItem, getItem, removeItem } from "../utils/storage.js";

const STORAGE_KEY = "climavue_weather_state";

/**
 * Application state manager for tracking weather search state and data.
 */
class WeatherState {
  constructor() {
    this.state = {
      isLoading: false,
      weatherData: null,
      error: null,
      lastQuery: ""
    };
    this.listeners = [];
  }

  /**
   * Get a copy of current application state.
   * @returns {Object} State copy
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Serialize and save current application state to localStorage.
   */
  saveToStorage() {
    saveItem(STORAGE_KEY, {
      weatherData: this.state.weatherData,
      lastQuery: this.state.lastQuery,
      timestamp: Date.now()
    });
  }

  /**
   * Rehydrate application state from localStorage if available.
   * @returns {Object} Loaded state or initial state fallback
   */
  loadFromStorage() {
    const defaultData = { weatherData: null, lastQuery: "" };
    const stored = getItem(STORAGE_KEY, defaultData);

    if (stored && stored.weatherData) {
      this.state.weatherData = stored.weatherData;
      this.state.lastQuery = stored.lastQuery || "";
      this.notify();
    }

    return this.getState();
  }

  /**
   * Reset application state to default and clear saved storage.
   */
  clearState() {
    this.state = {
      isLoading: false,
      weatherData: null,
      error: null,
      lastQuery: ""
    };
    removeItem(STORAGE_KEY);
    this.notify();
  }

  /**
   * Update loading state.
   * @param {boolean} isLoading 
   */
  setLoading(isLoading) {
    this.state.isLoading = isLoading;
    if (isLoading) {
      this.state.error = null;
    }
    this.notify();
  }

  /**
   * Update weather data on successful fetch and save to localStorage.
   * @param {Object} data - Weather API payload
   * @param {string} query - Searched city query
   */
  setWeatherData(data, query = "") {
    this.state.isLoading = false;
    this.state.weatherData = data;
    this.state.error = null;
    this.state.lastQuery = query;
    this.saveToStorage();
    this.notify();
  }

  /**
   * Update state with an error.
   * @param {string|Error} error 
   */
  setError(error) {
    this.state.isLoading = false;
    this.state.error = error;
    this.notify();
  }

  /**
   * Subscribe to state changes.
   * @param {Function} listener 
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    const currentState = this.getState();
    this.listeners.forEach((listener) => listener(currentState));
  }
}

export const weatherState = new WeatherState();

