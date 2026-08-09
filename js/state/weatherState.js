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
   * Update weather data on successful fetch.
   * @param {Object} data - Weather API payload
   * @param {string} query - Searched city query
   */
  setWeatherData(data, query = "") {
    this.state.isLoading = false;
    this.state.weatherData = data;
    this.state.error = null;
    this.state.lastQuery = query;
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
