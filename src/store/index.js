import Vue from 'vue'
import Vuex from 'vuex'

import lobo_guara from '../assets/store/lobo_guara.jpg'
import jaguapitanga from '../assets/store/jaguapitanga.jpg'
import capivara from '../assets/store/capivara.jpg'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
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
					}
				]
    },
    mutations:{
			loadStore: state => {
				state.itens = JSON.parse(localStorage.getItem('fireDayStorage'))
			},
			buyItem: (state, id) => {
				state.itens = state.itens.map((item)=>{
					if(item.id == id && item.bought == false){
						item.bought = true
					}
					return item
				})
				localStorage.setItem('fireDayStorage', JSON.stringify(state.itens))
			},
			selectItem: (state, id) => {
				state.itens = state.itens.map((item)=>{
					if(item.id == id && item.bought == true && item.selected == false){
						item.selected = true
					}else{
						item.selected = false
					}
					return item
				})
				localStorage.setItem('fireDayStorage', JSON.stringify(state.itens))
			}
    }
})

export {store}

/* 
Getter: store.state.value
computed: { getValue(){ return this.$store.state.value } }

Setter: store.commit('mutation', true)

*/