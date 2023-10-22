<template>
   <div class="modalWrap">
      <div class="wrapper">
         <div for="newCity" class="form__content">
            <p class="content_title">Choose a city:</p>
            <ul class="content_cities">
               <li class="city" v-for="city in cities" :key="city.index">{{ city }}</li>
            </ul>
            <div class="form__content_buttons">
               <button @click="close" class="form__button">Close</button>
            </div>
         </div>
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
      showAllCitiesModal: true,
   }
   },
   methods: {
      close(){
         this.$emit('closeAllCitiesModal', {showAllCitiesModal: false})
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