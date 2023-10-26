// apiService.js
export async function fetchDuringWeek(API_key, enteredCity, lang) {
   const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=id:${enteredCity}&days=7&lang=${lang}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch weather data');
   }
   
   const data = await response.json();
   const dataCurrent = data.forecast;
   // console.log(dataCurrent);
   const timeWeatherData = {};
  dataCurrent.forecastday.forEach((dayData, index) => {
    timeWeatherData[`dayWeather${index + 1}`] = dayData;
  });
  return timeWeatherData;
 }