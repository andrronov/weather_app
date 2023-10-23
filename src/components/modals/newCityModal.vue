<template>
   <div class="modalWrap">
      <div class="wrapper">
         <label for="newCity" class="form__content">
            <p class="content_title">Write city:</p>
            <input @keydown.enter="confirm" v-model="userCity" type="text">
            <div class="form__content_buttons">
               <button class=" form__button _confirm" @click="confirm">Confirm</button>
               <button class="form__button" @click="closeModal">Close</button>
               <button @click="autocompleteSearch">aaa</button>
            </div>
         </label>
      </div>
  </div>
</template>

<script>
import { fetchAutocompleteSearch } from '@/APIs/autocomplete';
export default {
name: "newCityModal",

data(){
   return{
      userCity: "",
      showCityModal: true,
   }
   },
   methods: {
      confirm(){
         this.$emit("newCityData", {
            userCity: this.userCity,
            showCityModal: this.showCityModal,
         });
      },
      closeModal(){
         this.$emit("closeModal", {showCityModal: false});
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
      }
   },
   // mounted(){
   //    setTimeout(() => {
   //       this.autocompleteSearch();
   //    }, 100)
   // }
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
</style>