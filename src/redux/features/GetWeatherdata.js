import axios from "axios";

const API_KEY = '4e74b0518062432c974140447251409';
const BASE_URL = "https://api.weatherapi.com/v1";

export async function getWeather(endpoint,location) {
  if (location.length < 3) return [];
  if (location.length >= 3) {
    try {
      const response = await axios.get(`${BASE_URL}/${endpoint}?key=${API_KEY}&q=${location}`);
      return response.data;
    } catch (error) {
      console.error("Search error:", error.message);
      return [];
    }
  }
  return [];
}
