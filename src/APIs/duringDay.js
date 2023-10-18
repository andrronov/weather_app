// apiService.js
export async function fetchDuringDay(API_key, enteredCity, lang) {
   const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${enteredCity}&lang=${lang}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch weather data');
   }
   
   const data = await response.json();
   // console.log(data);
   const dataCurrent = data.forecast.forecastday[0];
  //  console.log(dataCurrent.hour);
   // return {
   //    timeWeather: dataCurrent.hour[0],
   // }
   const timeWeatherData = {};
  dataCurrent.hour.forEach((hourData, index) => {
    timeWeatherData[`timeWeather${index + 1}`] = hourData;
  });

  return timeWeatherData;
 }