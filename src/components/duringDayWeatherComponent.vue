<template>
  <div class="duringday__content _container">
    <h3 class="duringday _title _detailed">During day</h3>
    <div class="duringday__columns">
      <div v-for="data in timeWeatherArray" :key="data.index" class="columns__content">
        <p>{{ data.weatherData }}°</p>
        <div class="duringday_column">
          <div :style='`height: ${data.weatherData*10}%`' class="column_fill"></div>
        </div>
        <p class="duringday_text">{{ data.timeData }}</p>
      </div>
    </div>
  </div>
  <!-- <p v-for="time in timeWeatherArray" :key="time">{{time.timeData}}{{time.weatherData}}</p> -->
</template>

<script>
import { fetchDuringDay } from '@/APIs/duringDay';
export default {
  data(){
    return{
      timeWeatherArray: [],
      heihtGraph: [],
      // timeData: '',
      // weatherData: 0,
      height: [],
    }
  },
  props: {
    city: {
      type: String,
      default: "Not found",
    },
    currentLanguage: {
      type: String,
      default: "us",
    },
  },
  methods: {
    async fetchDuringDayData(){
      try{
        const API_key = "7aecaa5e837b4dd09c3155109232609";
        const enteredCity = this.city;
        const currentLanguage = this.currentLanguage;

        const duringDayData = await fetchDuringDay( API_key, enteredCity, currentLanguage );
        for (const key in duringDayData) {
            const timeData = duringDayData[key].time.slice(10);
            const weatherData = duringDayData[key].temp_c;
            this.timeWeatherArray.push({timeData, weatherData});

            this.heihtGraph.push(weatherData);
            
        }
      } catch (error){
        console.error(error);
      }
    },
    normalizeBar(){
      const columnMax = Math.max(...this.heihtGraph);
        this.heihtGraph.forEach((el) => {
          this.timeWeatherArray.push(((el * 100)/columnMax).toFixed(1));
        } )
        console.log(...this.heihtGraph);
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchDuringDayData();
      this.normalizeBar();
    }, 100);
    // this.fetchDuringDayData();
  }
}
</script>

<style>

</style>