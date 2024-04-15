const apiKey = 'validdate;t_2m:C'; // Replace with your actual API key
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');
const loadingIndicator = document.getElementById('loadingIndicator');

weatherForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const location = locationInput.value.trim();

  if (location === '') {
    alert('Please enter a valid location');
    return;
  }

  try {
    loadingIndicator.style.display = 'block';

    const response = await fetch(`https://api.meteomatics.com/2024-04-15T00:00:00Z/t_2m:C/52.520551,13.461804/html`);
    const data = await response.json();

    const temperature = data.main.temp;
    const condition = data.weather[0].description;

    weatherInfo.innerHTML = `
      <h2>Weather in ${location}</h2>
      <p>Temperature: ${temperature}°C</p>
      <p>Condition: ${condition}</p>
    `;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
  } finally {
    loadingIndicator.style.display = 'none';
  }
});
