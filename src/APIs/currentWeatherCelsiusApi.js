// apiService.js
export async function fetchCurrentWeatherDataCelsius(API_key, enteredCity, lang) {
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_key}&q=id:${enteredCity}&lang=${lang}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  const data = await response.json();
  // console.log(dataCurrent);
  return {
    currentCityName: data.location.name,
    currentTemp: data.current.temp_c,
    feelsLike: data.current.feelslike_c,
    tempText: data.current.condition.text,
    gustSpeed: data.current.gust_kph,
    currentHumidity: data.current.humidity,
    isDay: data.current.is_day,
    currentDownfall: data.current.precip_mm,
    currentPressure: data.current.pressure_mb,
    currentWindDirection: data.current.wind_dir,
    currentWindSpeed: data.current.wind_kph,
    conditionIcon: data.current.condition.icon,
    visibilityKm: data.current.vis_km,
   };
}