<template>
  <div class="duringday__content _container">
    <h3 class="duringday _title _detailed">During day</h3>
    <div class="duringday__columns">
      <div v-for="(data, index) in timeWeatherArray" :key="index" class="columns__content">
        <div class="duringday_column">
          <div :style='`height: ${heightArray[index].heightCol}%`' class="column_fill"></div>
        </div>
        <p class="column_p">{{ data.weatherData }}°</p>
        <p class="duringday_text">{{ data.timeData }}</p>
      </div>
    </div>
  </div>
  <!-- <div class="duringday__columns" v-for="a in aaa()" :key="a.index">a</div> -->
  <!-- <p v-for="time in timeWeatherArray" :key="time">{{time.timeData}}{{time.weatherData}}</p> -->
</template>

<script>
import { fetchDuringDay } from '@/APIs/duringDay';
export default {
  data(){
    return{
      timeWeatherArray: [],
      heihtGraph: [],
      heightArray: [],
    }
  },
  props: {
    currentCity: {
      type: Number,
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
        const enteredCity = this.currentCity;
        const currentLanguage = this.currentLanguage;

        const duringDayData = await fetchDuringDay( API_key, enteredCity, currentLanguage );
        // console.log(duringDayData.timeWeather1);
        for (const key in duringDayData) {
            const timeData = duringDayData[key].time.slice(10);
            const weatherData = duringDayData[key].temp_c
            // если что округляй числа toFixed(0);
            this.timeWeatherArray.push({ timeData, weatherData });

            this.heihtGraph.push( weatherData );
        }
        this.normalizeBar();
        // console.log(Math.max(...this.heihtGraph));

      } catch (error){
        console.error(error);
      }
    },
    
    normalizeBar(){
      const columnMax = Math.max(...this.heihtGraph);
        const columnMin = Math.min(...this.heihtGraph);
        this.heihtGraph.forEach((el) => {
          // this.height.push(((el * 100)/columnMax).toFixed(1));
          let heightCol = (5 + ((el - columnMin) * 95) / (columnMax - columnMin));
          this.heightArray.push( {heightCol} );
        } );
    }
  },
  mounted(){
    setTimeout(() => {
      this.fetchDuringDayData();
    }, 100);
  },
  watch:{
    currentCity(){
      console.log('city changed');
      setTimeout(() => {
      this.fetchDuringDayData();
    }, 100);
    }
  }
}
</script>

<style>

</style>