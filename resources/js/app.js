require('./bootstrap');

import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import {routes} from "./routes"
import StoreDate from "./store"
import MainApp from "./views/MainApp"
import Loader from "./components/Loader"
import CKEditor from "@ckeditor/ckeditor5-vue"
import VueToast from 'vue-toast-notification'

import {setCommonHeaders} from './store/axiosConfig'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(CKEditor)
Vue.use(VueToast)
Vue.component('Loader', Loader)
Vue.component('pagination', require('laravel-vue-pagination'));

const store = new Vuex.Store(StoreDate);

setCommonHeaders();

const router = new VueRouter({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = store.state.auth.currentUser

    if (requiresAuth && !currentUser) {
        next('/')
    } else {
        next()
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        MainApp
    }
})
