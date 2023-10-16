export async function fetchAstronomy(API_key, enteredCity, lang) {
   const response = await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${API_key}&q=${enteredCity}&lang=${lang}`);
   
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