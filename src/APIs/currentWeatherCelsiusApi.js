// apiService.js
export async function fetchCurrentWeatherDataCelsius(API_key, enteredCity, lang) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_key}&q=id:${enteredCity}&lang=${lang}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  const dataCurrent = data.current;
  // console.log(dataCurrent);
  return {
    currentTemp: dataCurrent.temp_c,
    feelsLike: dataCurrent.feelslike_c,
    tempText: dataCurrent.condition.text,
    gustSpeed: dataCurrent.gust_kph,
    currentHumidity: dataCurrent.humidity,
    isDay: dataCurrent.is_day,
    currentDownfall: dataCurrent.precip_mm,
    currentPressure: dataCurrent.pressure_mb,
    currentWindDirection: dataCurrent.wind_dir,
    currentWindSpeed: dataCurrent.wind_kph,
    conditionIcon: dataCurrent.condition.icon,
    visibilityKm: dataCurrent.vis_km,
   };
}