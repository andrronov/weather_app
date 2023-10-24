<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div for="newCity" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-for="city in cities" :key="city.index">{{ city }}</li>
            </ul>
            <div class="form__content_buttons">
<<<<<<< Updated upstream
               <button @click="close" class="form__button">Close</button>
            </div>
         </div>
=======
               <button @click="showNewCityWindow = !showNewCityWindow" class="form__button _confirm">Add new city</button>
               <button @click="close" class="form__button">Close</button>
            </div>
         </div>
         <label v-if="showNewCityWindow" for="newCity" class="form__content">
            <p class="content_title">Write city:</p>
            <input id="newCity" @keydown.enter="confirm" v-model="userCity" type="text">
            <div class="newCity_search">
               <div class="search_result" v-for="(result, index) in searchedCitiesArray" :key="index">
                  <li class="result_result"></li>
               </div>
            </div>
            <div class="form__content_buttons">
               <button class=" form__button _confirm" @click="confirm">Confirm</button>
               <button class="form__button" @click="showNewCityWindow = false">Close</button>
            </div>
         </label>
>>>>>>> Stashed changes
      </div>
  </div>
</template>

<script>
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
<<<<<<< Updated upstream
      showAllCitiesModal: true,
=======
      showNewCityWindow: false,

      searchedCitiesArray: [],
>>>>>>> Stashed changes
   }
   },
   methods: {
      close(){
         this.$emit('closeAllCitiesModal', {showAllCitiesModal: false})
<<<<<<< Updated upstream
      }
=======
      },
      async autocompleteSearch(){
         try{
            const API_key = "7aecaa5e837b4dd09c3155109232609";
            const enteredCity = this.userCity;
            const currentLanguage = "us";

            const answer = await fetchAutocompleteSearch(API_key, enteredCity, currentLanguage);
            const searchCityData = answer.data;

            for(let inx in searchCityData){
               const cityName = searchCityData[inx].name;
               const cityRegion = searchCityData[inx].region;
               const cityCountry = searchCityData[inx].country;
               const cityID = searchCityData[inx].id;

               this.searchedCitiesArray.push({ cityName, cityRegion, cityCountry, cityID });
            }

         } catch(error){
            console.error(error);
         }
      },
>>>>>>> Stashed changes
   },
   watch:{
      userCity(newValue, oldValue){
         if (newValue.length > 2) { 
            this.autocompleteSearch();
         }
         if(newValue.length < oldValue.length){
            this.searchedCitiesArray = [];
            this.autocompleteSearch();
         }
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