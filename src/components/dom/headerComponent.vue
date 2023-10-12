<template>
  <header :id="isDay">
    <div class="header_container">
      <div class="header">
        <p>Good afternoon, <span class="marked">{{ userName }}</span>!</p>
        <div class="header__cities_list">
          <li class="marked">{{ city }}</li>
        </div>
        <div class="header__addcity">
          <button @click="openNewCityModal" class="header__button">Add new city</button>
        </div>
      </div>
    </div>
  </header>
  <!-- city list -->
  <!-- посередине переключалка городов из листа со стрелочками -->
</template>

<!-- TODO: good morning/evening depends on what time is -->
<!-- Parsing all cities and show -->
<!-- пока получил просто город, потом сделать массив -->

<script>
export default {
props: {
  userName: {
    type: String,
    default: "Not found",
  },
  city: {
    type: String,
    deafult: "Not found",
  },
  isDay: {
    type: String,
    default: "day",
  },
},
data(){
  return{
    modalShowed: false,
  }
},
methods: {
  openNewCityModal(){
    this.modalShowed = true;
    this.$emit("openCityModal", {modalShowed: this.modalShowed})
  }
}
}
</script>

<style lang="scss" scoped>
#day {
  background-color: rgb(89, 93, 214);
  color: rgb(230, 230, 230);
  font-size: 1.2rem;
  button:hover{
    background: white;
    color: black;
  }
  .header__button{
    color: white;
    background: none;
  }
}
#night{
  background-color: black;
  .header__button{
    color: rgb(89, 93, 214);
    background-color: white;
  }
  button:hover{
    border: none;
    color: white;
    background-color: rgb(89, 93, 214);
  }
}
.header_container{
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: content-box;
}
.header{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  z-index: 80;
}
.header__cities_list{
  min-width: 20%;
}
.header__button{
  padding: 5px;
  border: 1px solid white;
  border-radius: 7.5px;
}
button:hover{
  cursor: pointer;
}

.marked{
  font-weight: 700;
}
</style>