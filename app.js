function getWeather() {
  const apikey = '4a940ca856176fd4d754625ef2ae89ee';
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please Enter Your Location');
    return;
  }

  const currenturl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

  fetch(currenturl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);
      alert('Error fetching current weather data. Please try again.');
    });

  fetch(forecasturl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching forecast:', error);
      alert('Error fetching forecast data. Please try again.');
    });
}

// Updated displayWeather function using FontAwesome icons
function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp');
  const info = document.getElementById('info');
  const weatherIcon = document.getElementById('weather-icon');

  tempDivInfo.innerHTML = '';
  info.innerHTML = '';

  if (data.cod === '404') {
    info.innerHTML = `<p>${data.message}</p>`;
    weatherIcon.style.display = 'none';
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const weatherMain = data.weather[0].main.toLowerCase();

    const temperatureHTML = `<p>${temperature} °C</p>`;
    const weatherHTML = `
      <p>${cityName}</p>
      <p>${description}</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
    info.innerHTML = weatherHTML;

    let faClass = 'fa-sun';

    if (weatherMain === 'clouds') faClass = 'fa-cloud-sun';
    else if (weatherMain === 'rain') faClass = 'fa-cloud-sun-rain';
    else if (weatherMain === 'drizzle') faClass = 'fa-cloud-sun-rain';
    else if (weatherMain === 'thunderstorm') faClass = 'fa-cloud-bolt';
    else if (weatherMain === 'snow') faClass = 'fa-snowflake';
    else if (weatherMain === 'mist' || weatherMain === 'fog') faClass = 'fa-smog';
    else if (weatherMain === 'clear') faClass = 'fa-sun';

    weatherIcon.className = `fa-solid ${faClass}`;
    weatherIcon.style.display = 'inline-block';
    weatherIcon.style.color = '#f39c12';
    weatherIcon.style.fontSize = '64px';
  }
}


function displayForecast(hourlyData) {
  const forecastDiv = document.getElementById('forecast');
  forecastDiv.innerHTML = '';

  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach(item => {
    const dataTime = new Date(item.dt * 1000);
    const hour = dataTime.getHours();
    const temperature = Math.round(item.main.temp);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHTML = `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly weather icon">
        <span>${temperature} °C</span>
      </div>
    `;

    forecastDiv.innerHTML += hourlyItemHTML;
  });
}
