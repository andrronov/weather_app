<template>
   <div class="modalWrap">
      <div class="wrapper">
         <h1>Hello!</h1>
         <input v-model="userName" type="text">Write your name:
         <input @keydown.enter="confirm" v-model="userCity" type="text">Write city:
         <button @click="confirm">Confirm</button>
      </div>
  </div>
</template>

<script>
export default {
name: "welcomeModalVue",

data(){
   return{
      userName: "",
      userCity: "",
      showModal: true,
   }
   },
   methods: {
      confirm(){
         this.showModal = false;
         this.$emit("dataConfirmed", {
            userName: this.userName,
            userCity: this.userCity,
            showModal: this.showModal,
         });
      }
   },
}
</script>


<style lang="scss" scoped>
.modalWrap{
   overflow: hidden;
   z-index: 99;
   height: 100%;
   width: 100%;
   position: absolute;
   background: fixed;
   background-color: rgb(52, 89, 126);
}
.wrapper{
   position: relative;
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
}
</style>