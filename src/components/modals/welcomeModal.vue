<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div class="wrapper_content">
            <h1 class="wrapper_hello content_title">Hello!</h1>
            <p class="wrapper_name _smaller">Write your name:</p>
            <input @keydown.enter="confirm" class="wrapper_input" v-model="userName" type="text">
            <button class="wrapper_button _confirm" @click="confirm">Confirm</button>
         </div>
      </div>
  </div>
</template>

<script>
export default {
name: "welcomeModalVue",

data(){
   return{
      userName: "",
      showModal: true,
   }
   },
   methods: {
      confirm(){
         this.$emit("dataConfirmed", {
            userName: this.userName,
            showModal: false,
            showNewCity: true,
         });
      }
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
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: rgb(52, 89, 126);
   z-index: 90;
}
.content_title{
   font-size: 2.05rem;
   background-color: white;
   color: rgb(52, 89, 126);
   padding: 3.5px;
   border-radius: 5px;
   text-align: center;
}
._smaller{
   font-size: 1.45rem;
}
.wrapper{
   position: relative;
   display: flex;
   align-items: center;
   flex-direction: column;
   justify-content: center;
   width: 100%;
}
.wrapper_content{
   scale: 1.1;
   display: flex;
   flex-direction: column;
   min-height: 200px;
   justify-content: space-between;
}
.wrapper_name{
   color: white;
   text-align: center;
}

._confirm{
   background: white;
   color: rgb(52, 89, 126);
}
._confirm:hover{
   background-color: rgb(212, 212, 212);
}
.wrapper_button{
   
   align-self: center;
   padding: 5px;
}
.wrapper_input{
   max-width: 540px;
   align-self: center;
}

@media (min-width: 769px) {
   .wrapper_content{
      scale: 1.5;
   }
}  
</style>