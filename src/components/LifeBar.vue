<template>
  <div class="lifeBar">
    <div class="health" :style="[{ width: life + '%' }, { backgroundColor: bgColor }]" />
  </div>
</template>

<script>
export default {
  data(){
    return{
      bgColor: '#0f0'
    }
  },

  props:[
    'life'
  ],

  methods:{
    changeColor: function(){
      this.bgColor = (this.$props.life > 70)?'#0f0':this.bgColor
      this.bgColor = (this.$props.life < 70 && this.$props.life > 30)?'#ff0':this.bgColor
      this.bgColor = (this.$props.life < 30)?'#f00':this.bgColor
    }
  },

  watch:{
    life: 'changeColor'
  }
}
</script>
<style scoped lang="scss">

.lifeBar{
  width: 32vw;
  height: 30px;
  position: absolute;
  border: solid #fff 4px;
  border-radius: 10px;
  right: 0;
  margin: 5px;
  padding: 4px;

  .health{
    width: 100%;
    height: 100%;
    background-color: #0f0;
    border-radius: 5px;
  }
}

</style>
