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
    // Display forecast cards
  forecastWeather.forEach((forecast) => {
    const forecastCard = $("<div>").addClass("weather-card");
    // Add forecast information to the card
    forecastCard.append(`<p>Date: ${dayjs(forecast.dt_txt).format("YYYY-MM-DD")}</p>`);
    forecastCard.append(`<i class="wi wi-owm-${forecast.weather[0].id}"></i>`);
    forecastCard.append(`<p>Temperature: ${convertKelvinToCelsius(forecast.main.temp)}°C</p>`);
    forecastCard.append(`<p>Humidity: ${forecast.main.humidity}%</p>`);
    forecastCard.append(`<p>Wind Speed: ${forecast.wind.speed} m/s</p>`);

    $("#forecastWeather").append(forecastCard);
  });
}
// Function to filter the 6-day forecast to one entry per day, including the current day
function filterDailyForecast(list) {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const uniqueDates = new Set();
  const dailyForecast = [];

  // Variable to track if the current day has been added to the forecast
  let currentDayAdded = false;

  // Iterate through the forecast entries
  list.forEach((entry) => {
    const date = dayjs(entry.dt_txt).format("YYYY-MM-DD");

    // Add the current day only if it hasn't been added yet
    if (!currentDayAdded && date === currentDate) {
      dailyForecast.push(entry);
      currentDayAdded = true;
    }

    // Add future dates starting from the next day
    if (!uniqueDates.has(date) && date !== currentDate && dayjs(date).isAfter(currentDate)) {
      dailyForecast.push(entry);
      uniqueDates.add(date);
    }
  });

  // Return the filtered forecast for the next 5 days
  return dailyForecast.slice(1, 6);
}
// Function to convert temperature from Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }
  