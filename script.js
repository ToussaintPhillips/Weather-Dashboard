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
  // Function to display weather information
function displayWeather(data) {
    const currentWeather = data.list[0];
  
    // Update HTML elements with current weather information
    $("#cityName").text(data.city.name);
    $("#currentDate").text(`Date: ${dayjs(currentWeather.dt_txt).format("YYYY-MM-DD HH:mm:ss")}`);
    $("#weatherIcon").html(`<i class="wi wi-owm-${currentWeather.weather[0].id}"></i>`);
    $("#temperature").text(`Temperature: ${convertKelvinToCelsius(currentWeather.main.temp)}°C`);
    $("#humidity").text(`Humidity: ${currentWeather.main.humidity}%`);
    $("#windSpeed").text(`Wind Speed: ${currentWeather.wind.speed} m/s`);
  
    const forecastWeather = filterDailyForecast(data.list);
    $("#forecastWeather").empty();