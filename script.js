 document.addEventListener('DOMContentLoaded', function() {
            const apiKey = 'e6f79f26369747a9bc9172915252808';
            const baseUrl = 'http://api.weatherapi.com/v1/current.json';
            
            const locationInput = document.getElementById('location-input');
            const searchBtn = document.getElementById('search-btn');
            const loading = document.getElementById('loading');
            const currentWeather = document.getElementById('current-weather');
            const forecast = document.getElementById('forecast');
            
            // Elements to update
            const locationElement = document.getElementById('location');
            const dateTimeElement = document.getElementById('date-time');
            const weatherIcon = document.getElementById('weather-icon');
            const temperatureElement = document.getElementById('temperature');
            const conditionElement = document.getElementById('condition');
            const windSpeedElement = document.getElementById('wind-speed');
            const humidityElement = document.getElementById('humidity');
            const feelsLikeElement = document.getElementById('feels-like');
            const visibilityElement = document.getElementById('visibility');
            
            // Function to fetch weather data
            async function fetchWeatherData(location) {
                try {
                    loading.style.display = 'block';
                    currentWeather.style.display = 'none';
                    forecast.style.display = 'none';
                    
                    const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&aqi=no`);
                    
                    if (!response.ok) {
                        throw new Error('Weather data not found');
                    }
                    
                    const data = await response.json();
                    displayWeatherData(data);
                    
                } catch (error) {
                    alert('Error fetching weather data: ' + error.message);
                    loading.style.display = 'none';
                }
            }
            
            // Function to display weather data
            function displayWeatherData(data) {
                // Update current weather
                locationElement.textContent = `${data.location.name}, ${data.location.country}`;
                dateTimeElement.textContent = formatDateTime(data.location.localtime);
                temperatureElement.textContent = `${data.current.temp_c}°C`;
                conditionElement.textContent = data.current.condition.text;
                windSpeedElement.textContent = `${data.current.wind_kph} km/h`;
                humidityElement.textContent = `${data.current.humidity}%`;
                feelsLikeElement.textContent = `${data.current.feelslike_c}°C`;
                visibilityElement.textContent = `${data.current.vis_km} km`;
                
                // Update weather icon based on condition
                updateWeatherIcon(data.current.condition.code, data.current.is_day);
                
                // Hide loading and show weather data
                loading.style.display = 'none';
                currentWeather.style.display = 'flex';
                
                // In a real app, we would also fetch and display forecast data
                // For now, we'll simulate forecast data
                displayForecastData();
            }
            
            // Function to format date and time
            function formatDateTime(dateTimeString) {
                const date = new Date(dateTimeString);
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                return date.toLocaleDateString('en-US', options);
            }
            
            // Function to update weather icon based on condition code
            function updateWeatherIcon(conditionCode, isDay) {
                const iconElement = weatherIcon.querySelector('i');
                
                // Map condition codes to Font Awesome icons
                // This is a simplified mapping - in a real app, you'd want a more comprehensive mapping
                const iconMap = {
                    '1000': isDay ? 'fa-sun' : 'fa-moon', // Sunny/Clear
                    '1003': isDay ? 'fa-cloud-sun' : 'fa-cloud-moon', // Partly cloudy
                    '1006': 'fa-cloud', // Cloudy
                    '1009': 'fa-cloud', // Overcast
                    '1030': 'fa-smog', // Mist
                    '1063': 'fa-cloud-rain', // Patchy rain
                    '1066': 'fa-snowflake', // Patchy snow
                    '1069': 'fa-cloud-meatball', // Patchy sleet
                    '1072': 'fa-cloud-rain', // Freezing drizzle
                    '1087': 'fa-bolt', // Thundery outbreaks
                    '1114': 'fa-wind', // Blowing snow
                    '1117': 'fa-wind', // Blizzard
                    '1135': 'fa-smog', // Fog
                    '1147': 'fa-smog', // Freezing fog
                    '1150': 'fa-cloud-rain', // Patchy light drizzle
                    '1153': 'fa-cloud-rain', // Light drizzle
                    '1168': 'fa-cloud-rain', // Freezing drizzle
                    '1171': 'fa-cloud-rain', // Heavy freezing drizzle
                    '1180': 'fa-cloud-rain', // Patchy light rain
                    '1183': 'fa-cloud-rain', // Light rain
                    '1186': 'fa-cloud-rain', // Moderate rain
                    '1189': 'fa-cloud-rain', // Heavy rain
                    '1192': 'fa-cloud-rain', // Heavy rain
                    '1195': 'fa-cloud-rain', // Heavy rain
                    '1198': 'fa-cloud-rain', // Light freezing rain
                    '1201': 'fa-cloud-rain', // Moderate/heavy freezing rain
                    '1204': 'fa-cloud-meatball', // Light sleet
                    '1207': 'fa-cloud-meatball', // Moderate/heavy sleet
                    '1210': 'fa-snowflake', // Patchy light snow
                    '1213': 'fa-snowflake', // Light snow
                    '1216': 'fa-snowflake', // Patchy moderate snow
                    '1219': 'fa-snowflake', // Moderate snow
                    '1222': 'fa-snowflake', // Patchy heavy snow
                    '1225': 'fa-snowflake', // Heavy snow
                    '1237': 'fa-cloud-meatball', // Ice pellets
                    '1240': 'fa-cloud-showers-heavy', // Light rain shower
                    '1243': 'fa-cloud-showers-heavy', // Moderate/heavy rain shower
                    '1246': 'fa-cloud-showers-heavy', // Torrential rain shower
                    '1249': 'fa-cloud-meatball', // Light sleet showers
                    '1252': 'fa-cloud-meatball', // Moderate/heavy sleet showers
                    '1255': 'fa-snowflake', // Light snow showers
                    '1258': 'fa-snowflake', // Moderate/heavy snow showers
                    '1261': 'fa-cloud-meatball', // Light showers of ice pellets
                    '1264': 'fa-cloud-meatball', // Moderate/heavy showers of ice pellets
                    '1273': 'fa-bolt', // Patchy light rain with thunder
                    '1276': 'fa-bolt', // Moderate/heavy rain with thunder
                    '1279': 'fa-bolt', // Patchy light snow with thunder
                    '1282': 'fa-bolt' // Moderate/heavy snow with thunder
                };
                
                const iconClass = iconMap[conditionCode] || 'fa-cloud';
                iconElement.className = `fas ${iconClass}`;
            }
            
            // Function to display forecast data (simulated)
            function displayForecastData() {
                forecast.innerHTML = '';
                
                // In a real app, you would fetch forecast data from the API
                // For now, we'll simulate 5 days of forecast
                const days = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri'];
                const icons = ['fa-sun', 'fa-cloud-sun', 'fa-cloud', 'fa-cloud-rain', 'fa-cloud-showers-heavy'];
                const temps = ['32°C', '31°C', '29°C', '28°C', '30°C'];
                
                days.forEach((day, index) => {
                    const forecastCard = document.createElement('div');
                    forecastCard.className = 'forecast-card';
                    
                    forecastCard.innerHTML = `
                        <div class="forecast-day">${day}</div>
                        <div class="forecast-icon"><i class="fas ${icons[index]}"></i></div>
                        <div class="forecast-temp">${temps[index]}</div>
                    `;
                    
                    forecast.appendChild(forecastCard);
                });
                
                forecast.style.display = 'grid';
            }
            
            // Event listeners
            searchBtn.addEventListener('click', function() {
                const location = locationInput.value.trim();
                if (location) {
                    fetchWeatherData(location);
                } else {
                    alert('Please enter a location');
                }
            });
            
            locationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
            
            // Load default location (India) on page load
            fetchWeatherData('India');
        });