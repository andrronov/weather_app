<template>
  <p>Weather in {{ city }}: {{ currentTemperature }}</p>
  <p>Feels like: {{ feelsLikeTemp }}</p>
  <p>Condition: {{ conditionText }}</p>
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
   default: 0,
   },
   feelsLikeTemp: {
   type: Number,
   default: 0,
   },
   conditionText: {
   type: String,
   default: "Not found",
   },
},
data(){
   return{}
},
methods:{},
}
</script>

<style></style>
