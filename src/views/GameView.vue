<template>
  <div class="gameView">
    <Game :inGame='content.inGame' :currentSkin="currentSkin" @hit='hit' @game-over="stopGame" />
    <Score :score='content.score' />
    <LifeBar :life='content.life' />
    <GameOver @start="start" :content='content' />
  </div>
</template>

<script>
import Game from '@/components/Game'
import Score from '@/components/Score'
import LifeBar from '@/components/LifeBar'
import GameOver from '@/components/GameOver'

export default {
  components:{
    Game,
    Score,
    LifeBar,
    GameOver
  },

  data(){
    return{
      content: {
        score: 0,
        money: 0,
        inGame: false,
        life: 100
      }
    }
  },

  props:[
    'currentSkin'
  ],

  methods:{

    start: function(){
      this.resetValues()
      this.content.inGame = true
    },

    hit: function(){
      this.content.life -= 8
      if(this.content.life < 0){
        this.stopGame()
      }
    },

    resetValues: function(){
      this.content.score = 0
      this.content.life = 100
    },

    stopGame: function(){
      let score = localStorage.getItem('fireDayScore') ? localStorage.getItem('fireDayScore') : 0
      score = parseInt(score) + parseInt(this.content.score)
      localStorage.setItem('fireDayScore', score);
      this.content.money = score
      this.content.inGame = false
    },
  },
  
  mounted(){
    setInterval(()=>{
      if(this.content.inGame){
        this.content.score ++
      }
    }, 1000)
    this.stopGame()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
