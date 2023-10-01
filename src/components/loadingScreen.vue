<template>
   <div class="loading-screen">
      <h1>Welcome, {{ userName }}!</h1>
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
   height: 100%;
   background-color: #fff;
   display: flex;
   gap: 30px;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   animation: slide 2000ms linear 0s infinite;
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
 @keyframes slide {
   0% {
      opacity: 1;
   }
   100% {
      opacity: 0;
   }
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