<template>
  <div class="city__title"><h3>{{ city }}</h3> <p class="_detailed">{{ currentTemperature }}°</p></div>
  <div class="city__description"><h5 class="_detailed _font">{{ conditionText }}</h5><h4>Feels like: {{ feelsLikeTemp }}°</h4></div>
  <!-- <img :src='`../../src/images/${isDay}/${conditionIcon}`' alt="aaa"> -->
  <!-- <img src='../../src/images/night/116.png' alt="aaa"> -->
</template>

<script>
export default {
name: 'currentWeatherComponent',
props: {
   city: {
   type: String,
   default: 'Not found',
   },
   currentTemperature: {
   type: Number,
   default: -999,
   },
   feelsLikeTemp: {
   type: Number,
   default: -999,
   },
   conditionText: {
   type: String,
   default: "Not found",
   },
   isDay: {
      type: String,
      default: "day",
      required: true,
   },
   conditionIcon: {
      type: String,
      default: "116.png",
      required: true,
   },
},
data(){
   return{
   }
},
methods:{},
mounted() {},
}
</script>

<style></style>
