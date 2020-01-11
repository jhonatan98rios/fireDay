import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        inGame: false,
        inPause: false,
        score: 0
    },
    mutations:{
        changeInGame(state, status){
            state.inGame = status
        },
        changeInPause(state, status){
            state.inPause = status
        },
        incrementScore(state){
            state.score ++
        },
        setScore(state, value){
            state.score = value
        }
    }
})

export default store

/* 
Getter: store.state.value
computed: { getValue(){ return this.$store.state.value } }

Setter: store.commit('mutation', true)

*/