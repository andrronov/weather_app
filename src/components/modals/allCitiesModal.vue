<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div v-if="!showNewCityWindow" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-for="city in cities" :key="city.index">{{ city }}</li>
            </ul>
            <div class="form__content_buttons">
               <button @click="showNewCityWindow = !showNewCityWindow" class="form__button">Add new city</button>
               <button @click="close" class="form__button">Close</button>
            </div>
         </div>
         <label v-if="showNewCityWindow" for="newCity" class="form__content">
            <p class="content_title">Write city:</p>
            <input @keydown.enter="confirm" v-model="userCity" type="text">
            <div class="form__content_buttons">
               <button class=" form__button _confirm" @click="confirm">Confirm</button>
               <button class="form__button" @click="showNewCityWindow = false">Close</button>
               <button @click="autocompleteSearch">aaa</button>
            </div>
         </label>
      </div>
  </div>
</template>

<script>
import { fetchAutocompleteSearch } from '@/APIs/autocomplete';
export default {
name: "allCitiesModal",
props: {
   cities: {
      type: Array,
      require: true,
   }
},
data(){
   return{
      userCity: "",
      showNewCityWindow: false,
   }
   },
   methods: {
      close(){
         this.$emit('closeAllCitiesModal', {showAllCitiesModal: false})
      },
      async autocompleteSearch(){
         try{
            const API_key = "7aecaa5e837b4dd09c3155109232609";
            const enteredCity = "Mosc";
            const currentLanguage = "us";

            const answer = await fetchAutocompleteSearch(API_key, enteredCity, currentLanguage);
            console.log("aaaa", answer);
         } catch(error){
            console.error(error);
         }
      },
   },
}
</script>


<style lang="scss" scoped>
.modalWrap{
   height: 100%;
   width: 100%;
   position: absolute;
   background: fixed;
   overflow: hidden;
   background-color: rgb(52, 89, 126);
   z-index: 90;
}
.wrapper{
   position: relative;
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
}
.content_cities{
   display: flex;
   flex-direction: column;
}
.city{
   color: white;
   padding: 5px;
   border: 1px solid white;
   text-align: center;
}
</style>