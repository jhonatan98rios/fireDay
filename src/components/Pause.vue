<template>
  <div v-if="inGame" class="pause" @click="$emit('pause')">
    <h2> &#10074; &#10074; </h2>
  </div>
</template>

<script>
export default {

  props:[
    'inGame'
  ],
}
</script>
<style scoped lang="scss">

.pause{
  position: absolute;
  height: 30px;
  width: 35px;
  color: #fff;
  margin: 10px;
  line-height: 0px;
  padding: 2px;
  border: solid 3px #fff;
  border-radius: 10px;
  text-align: center;

  h2{
    margin: 15px auto;
  }
}

</style>
