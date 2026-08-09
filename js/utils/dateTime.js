/**
 * Format Unix timestamp and timezone offset into 12-hour local time format (hh:mm AM/PM).
 * @param {number} unixTimestamp 
 * @param {number} timezoneOffset 
 * @returns {string} Formatted time string
 */
export function formatTime(unixTimestamp, timezoneOffset) {
  const date = new Date((unixTimestamp + timezoneOffset) * 1000);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Get formatted local date string based on timezone offset.
 * @param {number} timezoneOffset 
 * @returns {{ dateString: string }} Local date object
 */
export function getLocalTime(timezoneOffset) {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const cityTime = new Date(utc + 3600000 * (timezoneOffset / 3600));

  const options = { weekday: "long", day: "numeric", month: "short" };
  const dateString = cityTime.toLocaleDateString("en-US", options);

  return { dateString };
}
