import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { title: "后台管理系统" }
    },
    {
      path: 'home',
      name: "Home",
      component: Home,
    }
  ]
})
