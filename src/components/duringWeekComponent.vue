<template>
  <!-- <div class="aaa" v-for="day in dataArray" :key="day.index">a {{ day.date }}</div> -->
  <div class="duringweek__content _container">
    <h3 class="duringweek _title _detailed">Next 3 days</h3>
    <div class="duringweek__rows">
      <div v-for="day in dataArray" :key="day.index" class="rows__content">
        <h5 class="row_title">{{ day.date }}</h5>
        <div class="row_columns">
          <li class="row_info"><span class="_detailed _font">{{day.avgTemp}}°</span> {{day.conditionDay}}</li>
          <li class="row_info"><p>Wind: {{day.windDay}} km/h</p> <p style="text-decoration: underline">Precipitation {{day.precipDay}} mm</p></li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchDuringWeek } from "../APIs/weatherApi.js";
export default {
data(){
  return{
    dataArray: [],
  }
},
props: {
  currentCity: {
      type: Number,
    },
  currentLanguage: {
    type: String,
    default: "us"
  },
},
methods:{
  async fetchWeek(){
    try{
      const API_KEY = "7aecaa5e837b4dd09c3155109232609";
      const enteredCity = this.currentCity;
      const lang = this.currentLanguage;

      const duringWeekData = await fetchDuringWeek( API_KEY, enteredCity, lang );
      // console.log(duringWeekData);

      for (const i in duringWeekData){
        const mainData = duringWeekData[i].day;
        // console.log(mainData.astro.sunrise);
        const date = duringWeekData[i].date.slice(5);
        const avgTemp = mainData.avgtemp_c;
        const conditionDay = mainData.condition.text;
        const windDay = mainData.maxwind_kph;
        const precipDay = mainData.totalprecip_mm;
        this.dataArray.push({ mainData, date, avgTemp, conditionDay, windDay, precipDay });

      }
    } catch(error){
      console.error(error);
    }
  }
},
mounted(){
    this.fetchWeek();
}
}
</script>

<style>

</style>