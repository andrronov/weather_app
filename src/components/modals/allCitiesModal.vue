<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div v-if="!showNewCityWindow" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-if="!cities.length">None</li>
               <li class="city" v-for="(city, index) in cities" :key="index" @click="cityToWeather(city.newCityId)">{{ city.newCityName }}, {{ city.newCityCountry }}
               <svg @click.stop="handleDeleteCity(city)"
                xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0,0,256,256">
                  <g fill="#34597e" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(10.66667,10.66667)"><path d="M10,2l-1,1h-5v2h1v15c0,0.52222 0.19133,1.05461 0.56836,1.43164c0.37703,0.37703 0.90942,0.56836 1.43164,0.56836h10c0.52222,0 1.05461,-0.19133 1.43164,-0.56836c0.37703,-0.37703 0.56836,-0.90942 0.56836,-1.43164v-15h1v-2h-5l-1,-1zM7,5h10v15h-10zM9,7v11h2v-11zM13,7v11h2v-11z"></path></g></g>
               </svg>
               </li>
            </ul>
            <div class="form__content_buttons">
               <button @click="showNewCityWindow = !showNewCityWindow" class="form__button _confirm">Add new city</button>
               <svg @click="changeName" class="form__button" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="1" id="_1"><path d="M403.67,187.94a68,68,0,0,1-9.16-.63c-17.89-2.4-35.5-11.48-49.57-25.55h0c-14.07-14.08-23.15-31.68-25.56-49.58-2.57-19.12,2.93-37.07,15.11-49.25s30.13-17.69,49.25-15.11c17.9,2.41,35.51,11.48,49.58,25.56s23.15,31.68,25.56,49.57c2.57,19.13-2.94,37.08-15.11,49.26C433.56,182.41,419.29,187.94,403.67,187.94Zm-37.52-47.4c9.31,9.32,21.11,15.53,32.37,17,9.91,1.34,18.45-1,24-6.59s7.93-14.12,6.59-24c-1.51-11.26-7.72-23.06-17-32.37C394,76.47,368.16,71.69,355.7,84.14s-7.67,38.29,10.45,56.4Z"/><path d="M189.36,402.24a68,68,0,0,1-9.15-.62c-17.9-2.41-35.51-11.48-49.58-25.56s-23.15-31.68-25.56-49.57c-2.57-19.13,2.94-37.08,15.11-49.26a15,15,0,0,1,21.22,21.22c-5.59,5.58-7.93,14.12-6.6,24,1.52,11.26,7.73,23.06,17,32.37C170,373,195.79,377.75,208.25,365.3a15,15,0,1,1,21.21,21.21C219.25,396.72,205,402.24,189.36,402.24Z"/><path d="M71.69,450a15,15,0,0,1-14.64-18.25c.26-1.17,6.46-29,15.07-59.7,16.16-57.6,25.91-72.67,32.6-79.36L334.49,62.93A15,15,0,1,1,355.7,84.14L125.94,313.91c-.91.9-9.27,10.43-24.94,66.25-3.51,12.51-6.65,24.69-9.1,34.64,10-2.47,22.21-5.61,34.75-9.14,55.72-15.64,65.24-24,66.14-24.9L422.55,151a15,15,0,0,1,21.22,21.21L214,402c-6.69,6.69-21.75,16.44-79.36,32.61-30.65,8.6-58.53,14.8-59.7,15.06A15,15,0,0,1,71.69,450Z"/><path d="M391.63,135.07a15,15,0,0,1-10.61-4.4l-5-5a15,15,0,0,1,21.21-21.21l5,5a15,15,0,0,1-10.6,25.61Z"/></g></svg>
               <button v-if="cities.length" @click="close" class="form__button">Close</button>
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
      currentCity: '',
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
      },
      cityToWeather(city){
         this.$emit('cityToWeather', city);
      },
      changeName(){
         this.$emit('changeName');
      }
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
   display: flex;
   flex-direction: column;
   align-items: center;
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
   width: 100%;
   margin: 0px 15px;
   justify-content: center;
}
.content_cities{
   display: flex;
   flex-direction: column;
   margin: 15px 0px;
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
   text-align: left;
}
</style>