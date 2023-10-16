<template>
  <div class="astro__content _container">
    <h3 class="astronomy _title _detailed">Astronomic info</h3>
    <ul class="astro _list">
      <li><p>Sunrise:</p> <p>{{ sunrise }}</p></li>
      <li><p>Sunset:</p> <p>{{ sunset }}</p></li>
      <li><p>Moonrise:</p> <p>{{ moonrise }}</p></li>
      <li><p>Moon phase:</p> {{ moon_phase }}</li>
    </ul>
  </div>
</template>

<script>
import { fetchAstronomy } from "@/APIs/astronomy.js";
export default {
  data(){
    return{
      sunrise: '',
      sunset: '',
      moonrise: '',
      moon_phase: '',
    }
  },
  props: {
    currentLanguage: {
      type: String,
      default: "ru",
    },
    city: {
      type: String,
      default: "Not found",
    },
  },
  methods:{
    async fetchAstro(){
      try {
        const API_key = "7aecaa5e837b4dd09c3155109232609";
        const enteredCity = this.city;
        const currentLanguage = this.currentLanguage;

        const astroData = await fetchAstronomy( API_key, enteredCity, currentLanguage );
        this.sunrise = astroData.sunrise;
        this.sunset = astroData.sunset;
        this.moonrise = astroData.moonrise;
        this.moon_phase = astroData.moon_phase;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchAstro();
    }, 10);
  },
}
</script>

<style>

</style>