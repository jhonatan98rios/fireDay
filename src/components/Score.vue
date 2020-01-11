<template>
  <div class="score" v-if="inGame">
    <h3 class="counter" v-html="score" />
  </div>
</template>

<script>
export default {
  data(){
    return{
    }
  },
  props:[
    'score',
    'inGame'
  ],
}
</script>
<style scoped lang="scss">

.score{
  position: absolute;
  height: 12vw;
  width: 40vw;

  .counter{
    text-align: left;
    font-size: 25px;
    margin: 60px 10px;
    color: #fff;

    &:before{
      content: 'Pontos: '
    }
  }
}

</style>
