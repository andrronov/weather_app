<template>
   <div class="modalWrap">
      <div class="wrapper">
         <label for="newCity" class="form__content">
            <p class="content_title">Write city:</p>
            <input @keydown.enter="confirm" v-model="userCity" type="text">
            <div class="form__content_buttons">
               <button class=" form__button _confirm" @click="confirm">Confirm</button>
               <button class="form__button" @click="closeModal">Close</button>
            </div>
         </label>
      </div>
  </div>
</template>

<script>
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
</style>