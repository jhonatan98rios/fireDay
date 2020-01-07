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
