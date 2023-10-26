<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div v-if="!showNewCityWindow" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-for="(city, index) in cities" :key="index" @click="aaa(aaa)">{{ city.newCityName }}</li>
            </ul>
            <div class="form__content_buttons">
               <button @click="showNewCityWindow = !showNewCityWindow" class="form__button _confirm">Add new city</button>
               <button @click="close" class="form__button">Close</button>
            </div>
         </div>
         <label v-if="showNewCityWindow" for="newCity" class="form__content">
            <p class="content_title">Write city:</p>
            <div class="search_element">
               <input id="newCity" @keydown.enter="handleAddCity" v-model="userCity" type="text">
               <p class="search_error" v-if="searchError">Error! This city doesn't exist.</p>
               <div v-if="userCity.length > 2" class="search_results">
                  <div class="results_container" v-for="(city, index) in allCitiesArray" :key="index">
                     <p @click="addCity(city)" class="container_cities">{{ city.searchCity }}, {{ city.searchRegion }}, {{ city.searchCountry }}</p>
                  </div>
               </div>
            </div>
            <div class="form__content_buttons">
               <button class=" form__button _confirm" @click="handleAddCity">Confirm</button>
               <button class="form__button" @click="showNewCityWindow = false">Close</button>
            </div>
         </label>
      </div>
  </div>
</template>

<script>
import { fetchAutocompleteSearch } from '@/APIs/autocomplete';
export default {
name: "allCitiesModal",
data(){
   return{
      userCity: "",
      showNewCityWindow: false,
      allCitiesArray: [],
      cities: [],
      searchError: false,
   }
   },
   methods: {
      close(){
         this.$emit('closeAllCitiesModal', {showAllCitiesModal: false})
      },
      async autocompleteSearch(){
         try{
            const API_key = "7aecaa5e837b4dd09c3155109232609";
            const enteredCity = this.userCity;
            const currentLanguage = "us";

            const answer = await fetchAutocompleteSearch(API_key, enteredCity, currentLanguage);
            const searchHelp = answer.data;
            this.allCitiesArray = [];
            for (let idx in searchHelp){
               const searchCity = searchHelp[idx].name;
               const searchRegion = searchHelp[idx].region;
               const searchCountry = searchHelp[idx].country;
               const searchID = searchHelp[idx].id;
               
               this.allCitiesArray.push({ searchCity, searchRegion, searchCountry, searchID });
            }
         } catch(error){
            console.error(error);
         }
      },
      addCity(city){
         this.cities.push( {
            newCityName: city.searchCity,
            newCityCountry: city.searchCountry,
            newCityId: city.searchID, 
         });
         this.showNewCityWindow = false;
         this.userCity = "";
      },
      async handleAddCity(){
         try{
            const API_key = "7aecaa5e837b4dd09c3155109232609";
            const enteredCity = this.userCity;
            const currentLanguage = "us";

            const answer = await fetchAutocompleteSearch(API_key, enteredCity, currentLanguage);
            const cityAnswer = answer.data[0];
            // console.log(cityAnswer);
            if(cityAnswer === undefined){
               this.searchError = true;
            } else{
            this.cities.push( {
            newCityName: cityAnswer.name,
            newCityCountry: cityAnswer.country,
            newCityId: cityAnswer.id,
         });
         this.showNewCityWindow = false;
      }
         } catch(error){
            console.error(error);
         }

         this.userCity = "";
      },
   },
   watch: {
      userCity(){
         if(this.userCity.length > 2){
            console.log("autocomplete")
            this.autocompleteSearch();
            this.searchError = false
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
.search_element{

}
#newCity{
}
.search_results{
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