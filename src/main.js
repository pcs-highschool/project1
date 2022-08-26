import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.css'
import {createRouter, createWebHistory} from 'vue-router'
import axios from 'axios'

import Home from './components/UserHome.vue'
import UserItem from './components/userIdItem.vue'
import Detail from './components/UserItemDetail.vue'


const routes =[
    {name: 'home', path: '/', component: Home},
    {name: 'item', path: '/:userid', component: UserItem},
    {name: 'Detail', path: '/:userid/detail', component: Detail},
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$datas = []

app.use(router).mount('#app')

