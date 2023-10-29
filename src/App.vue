<template>
  <transition>
    <loadingScreen :userName="userName" v-if="!appLoaded"></loadingScreen>
  </transition>
  <!-- <welcomeModalVue @dataConfirmed="handleDataConfirmed" v-if="showModal"></welcomeModalVue> -->
  <firstCityComponentVue></firstCityComponentVue>
</template>

<!-- Разобраться с \константами для будущих изменений -->

<script>
import firstCityComponentVue from "./cityScreens/firstCityComponent.vue";
import loadingScreen from "@/components/modals/loadingScreen.vue";
// import welcomeModalVue from "./components/welcomeModal.vue";
export default {
  name: "App",
  data(){
    return{
      appLoaded: false,
      showModal: true,
      userName: '',
    }
  },
  components: {
    firstCityComponentVue,
    loadingScreen,
    // welcomeModalVue,
  },
  methods: {
    handleDataConfirmed(data) {
      this.userName = data.userName;
      this.showModal = data.showModal;
      localStorage.setItem("showModal", JSON.stringify(this.showModal));

      localStorage.username = this.userName;
    },
  },
  mounted(){
    if (localStorage.username) {
      this.userName = localStorage.username;
    }
    setTimeout(() => {
      this.appLoaded = true;
    }, 350);
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
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
