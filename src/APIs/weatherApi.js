export async function fetchAutocompleteSearch(API_KEY, enteredCity, lang){
   const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${enteredCity}&lang=${lang}`);

   if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    console.log(data);
    return { data };
}

export async function fetchAstronomy(API_key, enteredCity, lang) {
   const response = await fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${API_key}&q=id:${enteredCity}&lang=${lang}`);
   
   if (!response.ok) {
     throw new Error('Failed to fetch weather data');
   }
   
   const data = await response.json();
   const dataCurrent = data.astronomy.astro;
  //  console.log(dataCurrent);
   return {
      sunrise: dataCurrent.sunrise,
      sunset: dataCurrent.sunset,
      moonrise: dataCurrent.moonrise,
      moon_phase: dataCurrent.moon_phase,
    };
 }

 // apiService.js
export async function fetchCurrentWeatherDataCelsius(API_key, enteredCity, lang) {
   const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_key}&q=id:${enteredCity}&lang=${lang}`);
   
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

 // apiService.js
export async function fetchDuringWeek(API_key, enteredCity, lang) {
   const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=id:${enteredCity}&days=7&lang=${lang}`);
   
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