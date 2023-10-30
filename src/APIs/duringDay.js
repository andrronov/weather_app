// apiService.js
export async function fetchDuringDay(API_key, enteredCity, lang) {
   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=id:${enteredCity}&lang=${lang}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch weather data');
   }
   
   const data = await response.json();
   const dataCurrent = data.forecast.forecastday[0];
   const timeWeatherData = {};
  dataCurrent.hour.forEach((hourData, index) => {
    timeWeatherData[`timeWeather${index + 1}`] = hourData;
  });
  return timeWeatherData;
 }