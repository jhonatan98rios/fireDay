<template>
  <div class="game">
    <div class="starry background" ></div>
    <div class="sky background" :class="{animatedSky:inGame}"></div>
    <div class="mountain background" :style="{ backgroundPosition: game.mountainPos + '%' }" />
    <div class="mountains background" :style="{ backgroundPosition: game.mountainsPos + '%' }" />
    <div class="forest background" :style="{ backgroundPosition: game.forestPos + 'px' }" />
    <div class="fire background" :style="{ left: game.firePos + 'px' }" />

    <div class="player" 
      :style="[{ backgroundPosition: player.image + 'px' }, { bottom: player.posY + 'vh' }]"
      v-bind:class="currentSkin "
      />

    <particlesJS v-if="inGame && !inPause" />
    <div class="touchable background" @mousedown="jump" :class="{ 'block' : (!inGame || inPause) }" />
  </div>
</template>

<script>
import particlesJS from './ParticlesJS'

export default {

  components:{
    particlesJS,
  },

  data(){
    return{
      game: {
        skyPos: 0,
        mountainPos: 0,
        mountainsPos: 0,
        forestPos: 0,
        firePos: window.innerWidth,
        vel: 0.02,
      },
      player:{
        sprite: 1,
        image: 0,
        posY: 10,
        accel: 1,
        isTouch: true,
      },
    }
  },

  props:[
    'inGame',
    'inPause',
    'currentSkin'
  ],

  watch:{
    inGame: function(){
      if(this.$props.inGame){
        this.startGame()
      }else{
        this.gameOver()
      }
    },
    currentSkin: function(){
      
    }
  },

  methods:{

    updateSprite: function(){
      if(this.$props.inGame == true && this.$props.inPause == false){
        let sprite = this.player.sprite
        let image = this.player.image

        sprite = (sprite == 4) ? 1 : (sprite + 1)

        image = sprite == 1 ? 0 : image
        image = sprite == 2 ? -160 : image
        image = sprite == 3 ? -340 : image
        image = sprite == 4 ? -520 : image

        sprite = this.player.posY > 10 ? 1 : sprite

        this.player.image = image
        this.player.sprite = sprite
      }

      this.upSpeed()
    },

    render: function (){    
      if(this.$props.inGame == true && this.$props.inPause == false){
        this.game.mountainPos += (this.game.vel / 10)
        this.game.mountainsPos += (this.game.vel)
        this.game.forestPos -= (this.game.vel * 300)
        this.game.firePos -= (this.game.vel * 300)

        if(this.game.firePos < -100){
          let random = Math.random() * 2
          if(random > 1){
            this.game.firePos = window.innerWidth * random
          }
        }

        this.collision()
      }
    },

    upSpeed: function(){
      if(this.$props.inGame == true && this.$props.inPause == false){
        if(this.game.vel < 0.05 || window.innerWidth > 600){
          this.game.vel += (this.game.vel / 1000)
        }
      }
    },

    jump: function(){
      if(this.$props.inGame == true && this.$props.inPause == false){
        if(this.player.isTouch == true){
          let up = setInterval(()=>{
            if(this.$props.inGame == true && this.$props.inPause == false){
              this.player.posY += this.player.accel // Height jump
              this.player.accel -= 0.03
  
              if(this.player.posY < 10){
                this.player.accel = 1
                this.player.isTouch = true
                clearInterval(up)
              }
            }
          }, 12)
        }
        this.player.isTouch = false
      }
    },

    collision: function(){
      if((this.game.firePos < 15 && this.game.firePos > -10) && this.player.posY < 15 ){
        this.$emit('hit')
      }
    },

    gameOver: function(){
      this.$emit('game-over')
    },

    startGame: function(){
      this.game.skyPos = 0
      this.game.mountainPos = 0
      this.game.mountainsPos = 0
      this.game.forestPos = 0
      this.game.firePos = window.innerWidth
      this.game.vel = 0.02
      this.player.sprite = 1
      this.player.image = 0
      this.player.posY = 10
      this.player.accel = 1
      this.player.isTouch = true

      if(window.innerWidth > 600){
        this.game.vel = 0.04
      }
    },
  },

  mounted(){
    setInterval(this.render, 30)
    setInterval(this.updateSprite, 100)
  },
}
</script>
<style scoped lang="scss">

.background{
  width: 100vw;
  height: 100vh;
  position: absolute;
}

.starry{
  background-image: url("../assets/dark-sky.jpg");
  background-size: contain;
}

.sky{
  margin: 0 auto;
  padding: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  max-height: 850px;
  max-width: 768px;
  background-color: #5af
}

.animatedSky{
  animation-name: animaSky;
  animation-duration: 300s;
}

@keyframes animaSky {
  0%   {background-color: #5af}
  20%  {background-color: #c6adf4}
  30%  {background-color: #c74e1f}
  40% {background-color: #002}
  50% {background-color: rgba(0,0,0,0.8)}
  60% {background-color: #c74e1f}
  80% {background-color: #c6adf4}
  90% {background-color: #9aa}
  100% {background-color: #5af}
}

.mountain{
  background-image: url("../assets/mountain.png");
  background-size: 400%;
  top: 0;
  background-repeat: repeat-x;
  opacity: .8;
  height: 110%;
}

.mountains{
  background-image: url("../assets/mountains.png");
  background-position: bottom left;
  background-repeat: no-repeat;
  top: 150px;
  background-repeat: repeat-x;
  opacity: .9;

  @media(min-width: 768px){
    top: 100px;
  }
}

.forest{
  background-image: url("../assets/forest.png");
  background-repeat: repeat-x;
  top: calc(70% - 200px);
  background-position-y: 36px !important;

  @media(min-width: 768px){
    top: 30vh;
  }

  @media(min-height: 700px){
    top: calc(70% - 170px);
  }
}

.player{
  width: 150px;
  height: 100px;
  left: 10px;
  position: absolute;
}

.lobo-guara{
  background-image: url("../assets/lobo.png");
}

.jaguapitanga{
  background-image: url("../assets/jaguapitanga.png");
}

.capivara{
  background-image: url("../assets/capivara.png");
}

.fire{
  width: 150px;
  height: 100px;
  background-image: url("../assets/fire.png");
  background-position: -10px;
  background-repeat: no-repeat;
  top: 78%;
  left: 100%;
  position: fixed;
  object-fit: cover;

  @media(max-height: 1400px)and(min-height: 1200px){
    top: 60%;
  }
  @media(max-height: 1199px)and(min-height: 1100px){
    top: calc(60% + 100px);
  }
  @media(max-height: 1099px)and(min-height: 1000px){
    top: 78%;
  }
  @media(max-height: 999px)and(min-height: 800px){
    top: 82%;
  }
  @media(max-height: 799px)and(min-height: 680px){
    top: 81%;
  }
  @media(max-height: 679px)and(min-height: 500px){
    top: 80%;
  }

}

.block{
  background-color: rgba(0,0,0,0.5);
  transition: all .3s;
}

</style>
