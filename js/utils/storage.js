/**
 * Storage utility module for handling localStorage persistence safely
 * with fallbacks for corrupted data, restricted access, or unavailable storage.
 */

/**
 * Check if localStorage is available and accessible in the current browser context.
 * @returns {boolean} True if localStorage is operational.
 */
export function isStorageAvailable() {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.warn("localStorage is unavailable or restricted:", error);
    return false;
  }
}

/**
 * Save data to localStorage with JSON serialization and error handling.
 * @param {string} key - Storage key
 * @param {*} data - Data to serialize and store
 * @returns {boolean} True if save succeeded, false otherwise.
 */
export function saveItem(key, data) {
  if (!isStorageAvailable()) return false;
  try {
    const serializedData = JSON.stringify(data);
    window.localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error(`Error saving key "${key}" to localStorage:`, error);
    return false;
  }
}

/**
 * Retrieve and parse data from localStorage with fallback handling.
 * @param {string} key - Storage key
 * @param {*} fallbackValue - Value returned if item is missing or corrupt
 * @returns {*} Stored data or fallbackValue
 */
export function getItem(key, fallbackValue = null) {
  if (!isStorageAvailable()) return fallbackValue;
  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) {
      return fallbackValue;
    }
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage. Falling back to default:`, error);
    return fallbackValue;
  }
}

/**
 * Remove a specific key from localStorage.
 * @param {string} key - Storage key
 * @returns {boolean} True if removal succeeded
 */
export function removeItem(key) {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
    return false;
  }
}

/**
 * Clear all localStorage items or specific keys.
 * @returns {boolean} True if clear succeeded
 */
export function clearStorage() {
  if (!isStorageAvailable()) return false;
  try {
    window.localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}
