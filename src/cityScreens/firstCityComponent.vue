<template>
  <div class="idd">
   <welcome-modal-vue @dataConfirmed="handleDataConfirmed" v-if="showModal"></welcome-modal-vue> 
   <new-city-modal @close-modal="modalShowed = false" v-if="modalShowed"></new-city-modal>
   <headerComponent @open-city-modal="openCityModal" :isDay="isDay" :userName="userName" :city="city"></headerComponent> 
   <div :id="isDay" class="weather__windows_grid">
        <div class="currentWeatherWindow _window _wind_backgrounded">
            <currentWeatherComponentVue
              :city="city"
              :currentTemperature="currentTemperature"
              :feelsLikeTemp="feelsLikeTemp"
              :conditionText="conditionText"
              :conditionIcon="conditionIcon"
              :isDay="isDay"
            >
            </currentWeatherComponentVue>
        </div>
        <div class="duringDayWeather _window _wind_bordered">
          <duringDayWeatherComponentVue>

          </duringDayWeatherComponentVue>
        </div>
        <div class="windWeather _window _wind_bordered">
          <windComponent
          :gustSpeed="gustSpeed"
          :humidity="humidity"
          :currentWindDirection="currentWindDirection"
          :currentDownfall="currentDownfall"
          :visibilityKm="visibilityKm"
          :currentPressure="currentPressure"
          :currentWindSpeed="currentWindSpeed"
          >
          </windComponent>
        </div>
        <div class="astroWeather _window _wind_bordered">
          <astronomyComponent></astronomyComponent>
        </div>
        <div class="nextWeather _window _wind_backgrounded">
          <nextDaysComponent></nextDaysComponent>
        </div>
    </div>
    </div>
  <!-- <h1>Hello, {{ this.userName }}!</h1> -->
</template>

<script>
import currentWeatherComponentVue from "@/components/currentWeatherComponent.vue";
import duringDayWeatherComponentVue from '@/components/duringDayWeatherComponent.vue';
import astronomyComponent from '@/components/astronomyComponent.vue';
import nextDaysComponent from '@/components/nextDaysComponent.vue';
import windComponent from "@/components/windComponent.vue";
import { fetchCurrentWeatherDataCelsius } from "../APIs/currentWeatherCelsiusApi";
import welcomeModalVue from "../components/modals/welcomeModal.vue";
import headerComponent from "@/components/dom/headerComponent.vue";
import newCityModal from "@/components/modals/newCityModal.vue";

export default {
  name: "firstCityComponent",
  components: {
    currentWeatherComponentVue,
    duringDayWeatherComponentVue,
    windComponent,
    astronomyComponent,
    nextDaysComponent,
    welcomeModalVue,
    headerComponent,
    newCityModal,
  },
  data() {
    return {
      showModal: true,
      modalShowed: false,

      userName: "",
      city: "",
      currentLanguage: "us",

      currentTemperature: null,
      feelsLikeTemp: null,
      conditionText: "",
      gustSpeed: null,
      humidity: null,
      isDay: "",
      currentDownfall: null,
      currentPressure: null,
      currentWindDirection: "",
      conditionIcon: "",
      visibilityKm: 0,
      currentWindSpeed: 0,
    };
  },
  methods: {
    async fetchData() {
      try {
        const API_key = "7aecaa5e837b4dd09c3155109232609";
        const enteredCity = this.city;
        const currentLanguage = this.currentLanguage;

        const weatherData = await fetchCurrentWeatherDataCelsius( API_key, enteredCity, currentLanguage );
        this.currentTemperature = weatherData.currentTemp;
        this.feelsLikeTemp = weatherData.feelsLike;
        this.conditionText = weatherData.tempText;
        this.gustSpeed = weatherData.gustSpeed;
        this.humidity = weatherData.currentHumidity;
        this.isDay = weatherData.isDay;
        this.conditionIcon = weatherData.conditionIcon.substring(weatherData.conditionIcon.length - 7);
        this.isDay ? this.isDay = "day" : this.isDay = "night";
        this.currentDownfall = weatherData.currentDownfall;
        this.currentPressure = weatherData.currentPressure;
        this.currentWindDirection = weatherData.currentWindDirection;
        this.visibilityKm = weatherData.visibilityKm;
        this.currentWindSpeed = weatherData.currentWindSpeed;
      } catch (error) {
        console.error(error);
      }
      console.log(this.conditionIcon);
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
    openCityModal(data){
      this.modalShowed = data.modalShowed;
      console.log(this.modalShowed);
    }
  },
  mounted() {
    if (localStorage.username) {
      this.userName = localStorage.username;
    }
    if (localStorage.city) {
      this.city = localStorage.city;
    }

    this.fetchData();
    console.log(this.modalShowed);
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
