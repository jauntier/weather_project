// const apiKey = '98956d49394b0a7e2fd43b6aaa150765'; // Replace with your actual API key
// const weatherForm = document.getElementById('weatherForm');
// const locationInput = document.getElementById('locationInput');
// const weatherInfo = document.getElementById('weatherInfo');
// const loadingIndicator = document.getElementById('loadingIndicator');

// weatherForm.addEventListener('submit', async function(event) {
//   event.preventDefault();
//   const location = locationInput.value.trim();

//   if (location === '') {
//     alert('Please enter a valid location');
//     return;
//   }

//   try {
//     loadingIndicator.style.display = 'block';

//     const response = await fetch(`api.openweathermap.org/data/2.5/forecast?id&appid={98956d49394b0a7e2fd43b6aaa150765}`);
//     const data = await response.json();

//     const temperature = data.main.temp;
//     const condition = data.weather[0].description;

//     weatherInfo.innerHTML = `
//       <h2>Weather in ${location}</h2>
//       <p>Temperature: ${temperature}°C</p>
//       <p>Condition: ${condition}</p>
//     `;
//   } catch (error) {
//     console.error('Error fetching weather data:', error.message);
//     weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
//   } finally {
//     loadingIndicator.style.display = 'none';
//   }
// });


const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const loadingIndicator = document.getElementById('loadingIndicator');

const API_KEY = '98956d49394b0a7e2fd43b6aaa150765'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (!location) return;

  try {
    showLoading();
    const weatherData = await fetchWeather(location);
    displayWeather(weatherData);
  } catch (error) {
    displayError(error);
  } finally {
    hideLoading();
  }
});

async function fetchWeather(location) {
  const response = await fetch(`${API_URL}?q=${location}&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return await response.json();
}

function displayWeather(data) {
  const { name, main, weather } = data;
  const temperature = (main.temp - 273.15).toFixed(1); // Convert temperature from Kelvin to Celsius
  const condition = weather[0].description;
  const html = `
    <h2>${name}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${condition}</p>
  `;
  weatherInfo.innerHTML = html;
}

function displayError(error) {
  weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
}

function showLoading() {
  loadingIndicator.style.display = 'block';
}

function hideLoading() {
  loadingIndicator.style.display = 'none';
}

