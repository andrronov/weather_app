export async function fetchAutocompleteSearch(API_KEY, enteredCity, lang){
   const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${enteredCity}&lang=${lang}`);

   if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    console.log(data);
    return { data };
}
