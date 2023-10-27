<template>
  <div class="idd">
   <welcome-modal-vue @dataConfirmed="handleDataConfirmed" v-if="showModal"></welcome-modal-vue>
   <all-cities-modal @city-to-weather="takeCityData" @close-all-cities-modal="allCitiesModalShowed = false" @handle-add-new-city="handleAddCity" v-if="allCitiesModalShowed"></all-cities-modal>
   <headerComponent @open-all-cities-modal="openAllCities" @open-city-modal="openCityModal" :isDay="isDay" :userName="userName"></headerComponent> 
   <div :id="isDay" class="weather__windows_grid">
        <div class="currentWeatherWindow _window _wind_backgrounded">
            <currentWeatherComponentVue
              :currentCity="currentCity"
              :currentTemperature="currentTemperature"
              :feelsLikeTemp="feelsLikeTemp"
              :conditionText="conditionText"
              :conditionIcon="conditionIcon"
              :isDay="isDay"
            >
            </currentWeatherComponentVue>
        </div>
        <div class="duringDayWeather _window _wind_bordered">
          <duringDayWeatherComponentVue
          :city="city"
          :currentLanguage="currentLanguage"
          >
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
          <astronomyComponent :city="city" :currentLanguage="currentLanguage"
          >
          </astronomyComponent>
        </div>
        <div class="nextWeather _window _bigHeight _wind_backgrounded">
          <nextDaysComponent :city="city" :currentLanguage="currentLanguage"></nextDaysComponent>
        </div>
    </div>
    </div>
  <!-- <h1>Hello, {{ this.userName }}!</h1> -->
</template>

<script>
import currentWeatherComponentVue from "@/components/currentWeatherComponent.vue";
import duringDayWeatherComponentVue from '@/components/duringDayWeatherComponent.vue';
import astronomyComponent from '@/components/astronomyComponent.vue';
import nextDaysComponent from '@/components/duringWeekComponent.vue';
import windComponent from "@/components/windComponent.vue";
import { fetchCurrentWeatherDataCelsius } from "../APIs/currentWeatherCelsiusApi";
import welcomeModalVue from "../components/modals/welcomeModal.vue";
import headerComponent from "@/components/dom/headerComponent.vue";
import allCitiesModal from "@/components/modals/allCitiesModal.vue";

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
    allCitiesModal,
  },
  data() {
    return {
      showModal: true,
      allCitiesModalShowed: false,

      currentCity: "",
      userName: "",
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
        const enteredCity = this.currentCity;
        const currentLanguage = this.currentLanguage;

        const weatherData = await fetchCurrentWeatherDataCelsius( API_key, enteredCity, currentLanguage );
        console.log(weatherData);
        console.log('aadsdsads', enteredCity);
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
      // console.log(this.conditionIcon);
    },
    handleDataConfirmed(data) {
      this.userName = data.userName;
      this.allCitiesModalShowed = true;
      this.showModal = data.showModal;
      localStorage.setItem("showModal", JSON.stringify(this.showModal));

      this.fetchData();

      localStorage.username = this.userName;
      localStorage.city = this.city;
      // localStorage.cities = this.cities;
      localStorage.setItem("citiesArray", JSON.stringify(this.cities));
    },
    openCityModal(data){
      this.modalShowed = data.modalShowed;
      // console.log(this.modalShowed);
    },
    openAllCities(data){
      this.allCitiesModalShowed = data.allCitiesModalShowed;
    },
    handleAddCity(cityData){
      let newCityName = cityData.newCityName, newCityCountry = cityData.newCityCountry, newCityId = cityData.newCityId;
      this.cities.push({ newCityName, newCityCountry, newCityId })
    },
    takeCityData(city){
      this.currentCity = city.city;
      this.allCitiesModalShowed = false;
      this.fetchData();
      localStorage.currentCity = this.currentCity;
    }
  },
  mounted() {
    if (localStorage.username) {
      this.userName = localStorage.username;
    }
    if (localStorage.city) {
      this.city = localStorage.city;
    }
    if(localStorage.cities){
      this.cities = localStorage.cities;
    }
    if(localStorage.currentCity){
      this.currentCity = localStorage.currentCity;
    }
    this.fetchData();
  },
  created() {
    const showModalWind = localStorage.getItem("showModal");
    const citiesAll = localStorage.getItem("citiesArray");
    if (showModalWind) {
      this.showModal = JSON.parse(showModalWind);
    }
    if(citiesAll){
      this.cities = JSON.parse(citiesAll);
    }
  },
};
</script>

<style lang="scss">
@import "../styles/mainStyles.scss";
</style>
