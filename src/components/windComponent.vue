<template>
  <div class="wind__content">
    <ul class="wind__content_list">
      <li><p>Wind speed:</p> <p>{{ gustSpeed }}Km/h ({{ gustSpeedMeters }}m/s)</p></li>
      <li><p>Gust speed:</p> <p>{{ currentWindSpeed }}Km/h ({{ windSpeedMeters }}m/s)</p></li>
      <li><p>Air humidity:</p> <p>{{ humidity }}%</p></li>
      <li><p>Wind direction:</p> <p>{{ currentWindDirection }}</p></li>
      <li><p>Downfall:</p> <p>{{ currentDownfall }}mm</p></li>
      <li><p>Visibility:</p> <p>{{ visibilityKm }} km</p></li>
      <!-- <li><p>Air pressure:</p> <p>{{ currentPressure }}mb</p></li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      gustSpeedMeters: -999,
      windSpeedMeters: -999,
    }
  },
props: {
  gustSpeed: {
    type: Number,
    default: -999,
  },
  humidity: {
    type: Number,
    default: -999,
  },
  currentWindDirection:{
    type: String,
    default: "err",
  },
  currentDownfall: {
    type: Number,
    default: -999,
  },
  visibilityKm: {
    type: Number,
    default: -999,
  },
  currentPressure: {
    type: Number,
    default: -999,
  },
  currentWindSpeed: {
    type: Number,
    default: -999,
  }
},
updated(){
  const gustPerSecond = ((this.gustSpeed*1000)/3600).toFixed(2);
  const windPerSecond = ((this.currentWindSpeed*1000)/3600).toFixed(2);
  this.gustSpeedMeters = gustPerSecond;
  this.windSpeedMeters = windPerSecond;
}
}
</script>

<style>

</style>