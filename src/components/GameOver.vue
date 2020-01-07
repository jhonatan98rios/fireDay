<template>
  <div class="gameOver" v-if="!content.inGame">
    <div class="button" @click="start">
      Iniciar
    </div>
    <div class="button">
      <router-link to="/store"> Store </router-link>
    </div>
    <p> Pontos: {{content.money}} </p>
  </div>
</template>

<script>
export default {

  props:[
    'content'
  ],

  methods:{
    start: function(){
      this.$emit('start')
    }
  }
}
</script>
<style scoped lang="scss">

.gameOver{
  text-align: center;
  position: absolute;
  height: 50vh;
  width: 60vw;
  left: calc(20vw - 5px);
  top: 20vh;
  color: #fff;
  font-size: 20px;

  .button{
    border: 5px solid #fff;  
    border-radius: 10px;
    padding: 5px;
    margin: 10px 0;
    margin: 5px;
    font-size: 32px;
    text-decoration: none;
    color: #fff;

    a{
      text-decoration: none;
      color: #fff;
    }
  }
}

</style>
