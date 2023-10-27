<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div v-if="!showNewCityWindow" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-if="!cities.length">None</li>
               <li class="city" v-for="(city, index) in cities" :key="index" @click="cityToWeather(city.newCityId)">{{ city.newCityName }}
               <svg @click="handleDeleteCity(city)"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                  <g fill="#34597e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-5v2h1v15c0,0.52222 0.19133,1.05461 0.56836,1.43164c0.37703,0.37703 0.90942,0.56836 1.43164,0.56836h10c0.52222,0 1.05461,-0.19133 1.43164,-0.56836c0.37703,-0.37703 0.56836,-0.90942 0.56836,-1.43164v-15h1v-2h-5l-1,-1zM7,5h10v15h-10zM9,7v11h2v-11zM13,7v11h2v-11z"></path></g></g>
               </svg>
               </li>
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
               <p class="search_error" v-if="addError">Error! This city has already added.</p>
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
      addError: false,
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
         let isCityAlreadyExists = false;
               for (let i = 0; i < this.cities.length; i++) {
               if (city.searchID == this.cities[i].newCityId) {
                  isCityAlreadyExists = true;
                  break;
               }
            }
         if(isCityAlreadyExists){
            this.addError = true;
            this.userCity = "";
            this.allCitiesArray = [];
         } else {
            this.cities.push({
            newCityName: city.searchCity,
            newCityCountry: city.searchCountry,
            newCityId: city.searchID, 
         });
         this.showNewCityWindow = false;
         this.userCity = "";
         }
      },
      async handleAddCity(){
         try{
            const API_key = "7aecaa5e837b4dd09c3155109232609";
            const enteredCity = this.userCity;
            const currentLanguage = "us";

            const answer = await fetchAutocompleteSearch(API_key, enteredCity, currentLanguage);
            const cityAnswer = answer.data[0];
            let isCityAlreadyExists = false;
               for (let i = 0; i < this.cities.length; i++) {
               if (cityAnswer.id == this.cities[i].newCityId) {
                  isCityAlreadyExists = true;
                  console.log(isCityAlreadyExists);
                  break;
               }
            }
            // console.log(cityAnswer);
            if(cityAnswer === undefined){
               this.searchError = true;
            } else{
                  if(isCityAlreadyExists){
                     this.addError = true;
                  } else {
                     this.cities.push( {
                  newCityName: cityAnswer.name,
                  newCityCountry: cityAnswer.country,
                  newCityId: cityAnswer.id,
                  });
                  this.showNewCityWindow = false;
                  }
               }  
         }
          catch(error){
            console.error(error);
         }
         this.userCity = "";
      },
      handleDeleteCity(cityToDelete){
         this.cities = this.cities.filter((c) => c != cityToDelete);
         // console.log(cityToDelete);
      },
      cityToWeather(city){
         this.$emit('cityToWeather', city);
         // console.log(city);
      },
   },
   watch: {
      userCity(){
         if(this.userCity.length > 2){
            console.log("autocomplete")
            this.autocompleteSearch();
            this.searchError = false;
            this.addError = false;
         }
      },
      cities:{
         handler:function(){
         localStorage.setItem('citiesData', JSON.stringify(this.cities));
         console.log('local updated');
         },
         deep: true
      },
   },
   created(){
      const citiesData = localStorage.getItem('citiesData');
      if (citiesData){
         this.cities = JSON.parse(citiesData);
      }
   }
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
.content_cities li:hover{
   cursor: pointer;
   background-color: white;
   color: rgb(52, 89, 126);
}
.content_cities svg{
   position: absolute;
   right: -45px;
   border: 1px solid white;
}
svg:hover{
   cursor: pointer;
}
svg:hover g{
   fill: rgba(3, 0, 69, 0.159);
}
.city{
   color: white;
   padding: 5px;
   border: 1px solid white;
   text-align: center;
   display: flex;
   flex-direction: row;
   align-items: center;
}
</style>