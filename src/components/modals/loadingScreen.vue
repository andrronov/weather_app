<template>
   <div class="loading-screen">
      <h1 v-if="userName">Welcome, {{ userName }}!</h1>
     <div class="spinner"></div>
   </div>
 </template>

 <script>
 export default {
   name: 'loadingScreen',
   props: {
   userName: {
      type: String,
      default: "Not found",
   }
},
 }
</script>




<style scoped>
 .loading-screen {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   z-index: 95;
   height: 100%;
   background-color: #fff;
   display: flex;
   gap: 30px;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
 
 .spinner {
   width: 40px;
   height: 40px;
   border-radius: 50%;
   border: 4px solid #ccc;
   border-top-color: #888;
   animation: spin 0.8s linear infinite;
 }
 
 h1{
   font-size: 2rem;
 }
 @keyframes spin {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
 }
 </style>