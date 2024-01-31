// OpenWeatherMap API key
const apiKey = "2a259694721562eb41fb0ee93caa7d37";
// Function to get weather data based on city name
async function getWeather(city) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    try {
      const response = await fetch(queryURL);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  