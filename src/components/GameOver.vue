<template>
  <div class="gameOver" v-if="!content.inGame || content.inPause">
    <div v-if="content.inPause" class="button" @click="$emit('play')">
      Continuar
    </div>
    <div v-if="!content.inPause" class="button" @click="start">
      Iniciar
    </div>
    <div v-if="!content.inPause" class="button">
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
  height: 50%;
  width: 60%;
  left: calc(20% - 5px);
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
