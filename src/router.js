import Vue from 'vue'
import VueRouter from 'vue-router'

import UserList from './components/UserList.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/users' },
    {
        path: '/users',
        name: 'user-list',
        component: UserList
    }
]

export default new VueRouter({
    mode: 'hash',
    routes
})