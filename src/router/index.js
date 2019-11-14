import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ShopGoods from "@/components/ShopGoods"
import OrderList from "@/components/OrderList"
import Statistic from "@/components/Statistic"
import UserManager from "@/components/userManager"
import ModelManager from "@/components/modelManager"
import ModelContent from "@/components/modelContent"

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
      path: '/shopGoods',
      name: "ShopGoods",
      component: ShopGoods,
      meta: { title: "商品管理" }
    },
    {
      path: "/orderList",
      name: "OrderList",
      component: OrderList,
      meta: { title: "订单管理" }
    },
    {
      path: "/statistic",
      name: "Statistic",
      component: Statistic,
      meta: { title: "订单管理" }
    },
    {
      path: "/userManager",
      name: "UserManager",
      component: UserManager,
      meta: { title: "用户管理" }
    },
    {
      path: "/modelManager",
      name: "ModelManager",
      component: ModelManager,
      meta: { title: "首页模块管理" }
    },
    {
      path: "/modelContent",
      name: "ModelContent",
      component: ModelContent,
      meta: { title: "模块内容管理" }
    }
  ]
})
