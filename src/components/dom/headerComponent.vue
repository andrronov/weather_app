<template>
  <header :id="isDay">
    <div class="header_container">
      <div class="header">
        <div class="header_name">
        <p>Hello, <span class="marked">{{ userName }}</span>!</p>
        </div>
        <div class="header__addcity">
          <button @click="openAllCitiesModal" class="header__button">My cities</button>
        </div>
      </div>
    </div>
  </header>
</template>

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
  isDayImg:{},
  cities: {
    type: Array,
  }
},
data(){
  return{
    modalShowed: false,
    allCitiesModalShowed: false,
  }
},
methods: {
  openNewCityModal(){
    this.modalShowed = true;
    this.$emit("openCityModal", {modalShowed: this.modalShowed})
  },
  openAllCitiesModal(){
    this.allCitiesModalShowed = true;
    this.$emit("openAllCitiesModal", {allCitiesModalShowed: this.allCitiesModalShowed})
  }
}
}
</script>

<style lang="scss" scoped>
#day {
  background: rgb(242,242,255);
background: linear-gradient(72deg, rgba(242,242,255,1) 0%, rgba(0,111,195,1) 34%);
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
@media (max-width: 500px) {
  #day{
    background: rgb(242,242,255);
background: linear-gradient(72deg, rgba(242,242,255,1) 0%, rgba(0,98,172,1) 66%);
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
    background-color: rgb(104, 39, 184);
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
  color: rgb(44, 44, 44);
}
.header__addcity{
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.header__cities_list{
  min-width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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