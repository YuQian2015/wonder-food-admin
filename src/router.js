import Vue from 'vue';
import VueRouter from 'vue-router';

import Users from './components/Users.vue';
import LoginPage from './components/LoginPage.vue';
import Posts from './components/Posts.vue';
import Store from './components/Store.vue';
import Products from './components/Products.vue';
import Roles from './components/Roles.vue';
import Polices from './components/Polices.vue';
import Banner from './components/Banner.vue';

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/login',
        name: 'login-page',
        component: LoginPage
    },
    {
        path: '/users',
        name: 'user-list',
        component: Users
    },
    {
        path: '/index',
        name: 'index',
        component: Posts
    },
    {
        path: '/store',
        name: 'store',
        component: Store
    },
    {
        path: '/banner',
        name: 'banner',
        component: Banner
    },
    {
        path: '/dish',
        name: 'dish',
        component: Products
    },
    {
        path: '/roles',
        name: 'roles',
        component: Roles
    },
    {
        path: '/polices',
        name: 'polices',
        component: Polices
    }
];

export default new VueRouter({
    mode: 'hash',
    routes
})