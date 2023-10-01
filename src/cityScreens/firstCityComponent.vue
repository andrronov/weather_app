<template>
   <welcome-modal-vue @dataConfirmed="handleDataConfirmed" v-if="showModal"></welcome-modal-vue>
  <div :id="isDay" class="weather__windows_grid">
    <div class="currentWeatherWindow">
        <currentWeatherComponentVue
          :city="city"
          :currentTemperature="currentTemperature"
          :feelsLikeTemp="feelsLikeTemp"
          :conditionText="conditionText"
        >
        </currentWeatherComponentVue>
    </div>
  </div>
  <!-- <h1>Hello, {{ this.userName }}!</h1> -->
</template>

<script>
import currentWeatherComponentVue from "../components/currentWeatherComponent.vue";
import { fetchCurrentWeatherDataCelsius } from "../APIs/currentWeatherCelsiusApi";
import welcomeModalVue from "@/components/welcomeModal.vue";

export default {
  name: "firstCityComponent",
  components: {
    currentWeatherComponentVue,
    welcomeModalVue,
  },
  data() {
    return {
      showModal: true,

      userName: "",
      city: "",
      currentLanguage: "ru",

      currentTemperature: null,
      feelsLikeTemp: null,
      conditionText: "",
      gustSpeed: null,
      humidity: null,
      isDay: true,
      currentDownfall: null,
      currentPressure: null,
      currentWindDirection: "",
    };
  },
  methods: {
    async fetchData() {
      try {
        const API_key = "7aecaa5e837b4dd09c3155109232609";
        const enteredCity = this.city; // Замените на вашу переменную
        const currentLanguage = this.currentLanguage;

        const weatherData = await fetchCurrentWeatherDataCelsius(
          API_key,
          enteredCity,
          currentLanguage
        );
        this.currentTemperature = weatherData.currentTemp;
        this.feelsLikeTemp = weatherData.feelsLike;
        this.conditionText = weatherData.tempText;
        this.gustSpeed = weatherData.gustSpeed;
        this.humidity = weatherData.currentHumidity;
        this.isDay = weatherData.isDay;
        if(this.isDay){
          this.isDay = "idDay";
        } else {
          this.isDay = "idNight";
        }
        this.currentDownfall = weatherData.currentDownfall;
        this.currentPressure = weatherData.currentPressure;
        this.currentWindDirection = weatherData.currentWindDirection;
      } catch (error) {
        console.error(error);
      }
    },
    handleDataConfirmed(data) {
      this.userName = data.userName;
      this.city = data.userCity;
      this.showModal = data.showModal;
      localStorage.setItem("showModal", JSON.stringify(this.showModal));

      this.fetchData();

      localStorage.username = this.userName;
      localStorage.city = this.city;
    },
  },
  mounted() {
    if (localStorage.username) {
      this.userName = localStorage.username;
    }
    if (localStorage.city) {
      this.city = localStorage.city;
    }

    this.fetchData();
  },
  created() {
    const showModalWind = localStorage.getItem("showModal");
    if (showModalWind) {
      this.showModal = JSON.parse(showModalWind);
    }
  },
};
</script>

<style lang="scss">
@import "../styles/mainStyles.scss";
</style>
