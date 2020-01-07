<template>
  <div id="app">
    <router-view :currentSkin="currentSkin" @change-skin="changeSkin" />
  </div>
</template>

<script>

export default {
  components: {
    
  },

  data(){
    return{
      currentSkin: 'lobo-guara'
    }
  },

  methods:{
    hasMoney: function(money){
      this.content.money = money
    },

    changeSkin: function(skin){
      this.currentSkin = skin
    }
  }
}
</script>

<style lang="scss">

body{
  margin: 0 auto;
  overflow-y: hidden;
}

.install{
  margin: 0 auto;
  text-align: center;
  z-index: 99;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 18vh;
  padding-top: 2vh;
  background-color: #fff;
  font-family: sans-serif;
  transform: translateY(150px);
  transition: all 1s;

  span{
    position: absolute;
    right: 10px;
  }

}

#app {
  margin: 0 auto;
  padding: 0;
  position: relative;
  overflow-y: hidden;
  width: 100vw;
  height: 100vh;
  font-family: sans-serif;

}
</style>
