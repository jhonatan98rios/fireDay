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
import lobo_guara from '../assets/store/lobo_guara.jpg'
import jaguapitanga from '../assets/store/jaguapitanga.jpg'
import capivara from '../assets/store/capivara.jpg'

export default {
  components:{
    Flickity
  },

  data(){
    return{
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: false
      },
      currentMoney: 0,
      shoppingList: [],
      itens:[
        {
          id: '001',
          img: lobo_guara,
          title: "Lobo Guará",
          price: "free",
          bought: true,
          selected: true,
          class: 'lobo-guara'
        },
        {
          id: '002',
          img: jaguapitanga,
          title: "Jaguapitanga",
          price: "1000",
          bought: false,
          selected: false,
          class: 'jaguapitanga'
        },
        {
          id: '003',
          img: capivara,
          title: "Capivara",
          price: "50000",
          bought: false,
          selected: false,
          class: 'capivara'
        },
        /* {
          id: '004',
          img: "https://www.estudopratico.com.br/wp-content/uploads/2018/09/caititu-porco-do-mato.jpg",
          title: "Caititu",
          price: "50000",
          bought: false,
          selected: false,
          class: 'caititu'
        },
        {
          id: '005',
          img: "https://i.pinimg.com/originals/9e/ef/a2/9eefa283e376bd98c627bf32ae727109.jpg",
          title: "Jaguatirica",
          price: "50000",
          bought: false,
          selected: false
        },
        {
          id: '006',
          img: "https://gcn.net.br/dir-arquivo-imagem/2012/12/%7B20121226232200%7D_tatu.jpg",
          title: "Tatu",
          price: "50000",
          bought: false,
          selected: false
        },
        {
          id: '007',
          img: "https://i.pinimg.com/474x/c8/26/44/c8264473a21ba455421952f9ff40fab4.jpg",
          title: "Onça Negra",
          price: "50000",
          bought: false,
          selected: false
        } */
      ]
    }
  },

  methods:{

    selecionar: function(val){
      this.itens.map((item)=>{
        if(item.id == val.target.id){
          if(item.bought == true){
            this.itens.map((skin)=>{
              skin.selected = false
              item.selected = true
              this.changeSkin()
              localStorage.setItem('fireDaySkin', item.class)
            })
          }
        }
      })
    },

    changeSkin: function(){
      this.itens.map((item)=>{
        if(item.selected == true){
          this.$emit('change-skin', item.class)
        }
      })
    },

    buy: function(val){
      let value = val.target.value
      let id = val.target.id

      if(value <= this.currentMoney){
        alert("Compra realizada")
        let array = this.shoppingList
        array.push(id)
        array = array.toString()
        localStorage.setItem('fireDayShoppingList', array)

        let oldMoney = localStorage.getItem('fireDayScore')
        let newMoney =  parseInt(oldMoney) - value

        localStorage.setItem('fireDayScore', newMoney)
        this.loadMoney()

      }else{
        alert("Dinheiro insuficiente")
      }
      this.loadItens()
    },

    loadItens: function(){
      let array = localStorage.getItem('fireDayShoppingList')
      let selected = localStorage.getItem('fireDaySkin')

      if(array){
        array = array.split(",")
        this.shoppingList = array
  
        this.shoppingList.map((buy)=>{
          this.itens.map((item)=>{
            if(buy == item.id){
              item.bought = true
            }
            if(selected == item.class){
              item.selected = true
            }else{
              item.selected = false
            }
          })
        })
      }
    },

    loadMoney: function(){
      this.currentMoney = localStorage.getItem('fireDayScore')
    }
  },

  mounted(){
    this.loadItens()
    this.loadMoney()
    this.changeSkin()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Store{
  background-color: #eee;
  height: 100vh;
  width: 100vw;
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
    width: 100vw;
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
