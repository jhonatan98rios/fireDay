<template>
  <div class="Store">

    <div class="header">
      <router-link class="back" to="/"> &#9668; </router-link>
      <h2 class="title">
        Loja
      </h2>
    </div>

    <flickity ref="flickity" :options="flickityOptions" class="carousel">
      <div v-for="(item, index) in itens" :key="index" class="item" :id="itens.id"  > 
        <img :src="item.img" :alt="item.title" class="item-image" >
        <h3 v-html="item.title" class="item-title"/>
        <div>
          <p v-html="('&#9830; ' + item.price)" class="item-price"/>
        </div>

        <button class="buy"
          @click="buy"
          :id="item.id"
          :value="item.price"
          v-if="!item.bought"
          > 
          Comprar 
        </button>

        <button class="select" 
          @click="selecionar"
          :id="item.id"
          :value="item.price"
          v-else-if="(item.bought && !item.selected)"> 
          Selecionar 
        </button>

        <button class="selected" 
          :id="item.id"
          :value="item.price"
          v-else-if="item.selected"> 
          Selecionado 
        </button>

      </div>
    </flickity>

    <div class="footer">
      <h3>
        &#9830; {{ currentMoney }}
      </h3>
    </div>
    
  </div>
</template>

<script>

import Flickity from 'vue-flickity';
import { mapState, mapMutations } from 'vuex'

export default {
  components:{
    Flickity
  },

  data(){
    return{
      flickityOptions: {
        initialIndex: 1,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false
      },
      currentMoney: 0,
      shoppingList: [],
    }
  },

  computed:{
    ...mapState({
      itens: state => state.itens
    })
  },

  methods:{
    ...mapMutations([
      'buyItem',
      'selectItem'
    ]),

    selecionar: function(val){
      let id = val.target.id
      this.selectItem(id)
    },

    buy: function(val){
      let value = val.target.value
      let id = val.target.id

        if((this.currentMoney - value) >= 0 ){
          alert("Compra realizada")
          this.buyItem(id)

          let oldMoney = localStorage.getItem('fireDayScore')
          let newMoney =  parseInt(oldMoney) - value
  
          localStorage.setItem('fireDayScore', newMoney)
          this.loadMoney()

        }else{
        alert("Dinheiro insuficiente")
      }
    },

    loadMoney: function(){
      this.currentMoney = localStorage.getItem('fireDayScore')
    }
  },

  mounted(){
    this.loadMoney()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Store{
  background-color: #eee;
  height: 100%;
  width: 100%;
  max-width: 768px;
  max-height: 900px;
  position: absolute;

  .header{
    width: 100vw;
    height: 60px;
    background-image: linear-gradient(to right, #a00, #fa0);
    color: #fff;
    text-align: center;
    display: flex;
    flex-direction: row;
    filter: drop-shadow(0px 0px 5px rgba(0,0,0,.5));

    .back{
      color:#fff;
      width: 50px;
      padding: 20px 0px;
      position: absolute;
      text-decoration: none;
    }

    .title{
      margin: 0 auto;
      padding: 20px 0px;
    }
  }

  .carousel{
    width: 100%;
    margin: 0 auto;
    height: 400px;
    margin-top: 10px;

    .item{
      width: 60%;
      max-width: 250px;
      background-color: #fff;
      margin: 10px;
      height: 90%;
      display: flex;
      flex-direction: column;
      text-align: center;
      border-radius: 20px;
      filter: drop-shadow(0px 0px 5px rgba(0,0,0,.2));

      &:hover{
        transform: scale(1.05);
        transition: all .5s;
      }

      img{
        width: 90%;
        height: 50%;
        border: solid #fff 2px;
        margin: 10px auto;
        border-radius: 15px;
      }

      .item-title{
        margin: 10px auto;
      }

      .item-price{
        margin: 0 auto;
      }
      
      button{
        width: 120px;
        height: 50px;
        margin: 0 auto;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        margin: 20px auto;
      }

      .buy{
        background-color: #0af;
      }

      .select{
        background-color: #0f0;
      }

      .selected{
        background-color: #aaa;
        color: #555;
      }
    }
  }

  .footer{
    width: 100vw;
    height: 60px;
    background-image: linear-gradient(to right, #a00, #fa0);
    position: absolute;
    bottom: 0;
    text-align: center;
    margin: 0 auto;
    color: #fff;
    filter: drop-shadow(0px 0px 5px rgba(0,0,0,.5));
  }
}
</style>
