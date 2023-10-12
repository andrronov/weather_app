<template>
   <div class="modalWrap">
      <div class="wrapper">
         <h1>Hello!</h1>
         <input @keydown.enter="confirm" v-model="userCity" type="text">Write city:
         <button @click="confirm">Confirm</button>
         <button @click="closeModal">Close</button>
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
         // ЕЩЕ НЕ ОТПРАВИЛ ЭМИТЫ РОДИТЕЛЮ!!!
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
   top: 50%;
}
</style>