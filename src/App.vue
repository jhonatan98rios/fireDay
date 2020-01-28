<template>
  <div class="screen">
    <div id="app">
      <router-view />
    </div>
    <div class="banner"></div>
    <div class="banner right"></div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
  data(){
    return{
      currentSkin: 'lobo-guara'
    }
  },

  computed:{
    ...mapState({
      itens: state => state.itens
    })
  },

  methods:{
    ...mapMutations([
      'loadStore'
    ]),

    hasMoney: function(money){
      this.content.money = money
    },

    loadStorage: function(){
      if(localStorage.getItem('fireDayStorage')){
        this.loadStore()
      }else{
        localStorage.setItem('fireDayStorage', JSON.stringify(this.itens))
      }
    },
  },

  mounted(){
    this.loadStorage()
  }
}
</script>

<style lang="scss">

body{
  margin: 0 auto;
  overflow-y: hidden;
}

.install{
  overflow-y: auto;
  margin: 0 auto;
  text-align: center;
  z-index: 99;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20vh;
  min-height: 150px;
  padding-top: 2vh;
  background-color: #fff;
  font-family: sans-serif;
  transform: translateY(200px);
  transition: all 1s;

  span{
    position: absolute;
    right: 10px;
  }

}

.screen{
background-image: linear-gradient(to bottom, #000, #f50);
height: 100vh;
width: 100vw;

  .banner{
    @media(min-width: 769px){
      width: calc((100vw - 778px)/2);
      height: 100vh;
      position: absolute;
      background-color: #f50;
      top: 0;
      background-image: linear-gradient(to bottom, #000, #f50);
    }
  }

  .right{
    right: 0;
  }

  #app {
    margin: 0 auto;
    padding: 0;
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    font-family: sans-serif;
    max-width: 768px;
    max-height: 900px;
    top: 100px;
    
    @media(min-width: 769px){
      border: 5px solid #ccc;
      box-shadow: 0px 0px 20px rgba(0,0,0,.8);
    }

    @media(max-height: 1080px){
      top: 50px;
    }

    @media(max-height: 920px){
      top: 0;
    }
  }
}

</style>
