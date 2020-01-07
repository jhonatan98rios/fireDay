import Vue from 'vue'
import Router from 'vue-router'
import GameView from '../views/GameView'
import Store from '../views/Store'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'gameView',
        component: GameView,
    },
    {
        path: '/store',
        name: 'store',
        component: Store,
    },
]

const router = new Router({ routes })

export default router