import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import sellerPage from "../views/SellerPage.vue";
// import trendPage from '../views/TrendPage.vue';
import mapPage from '../views/MapPage.vue';
// import rankPage from '../views/RankPage.vue';
import hotPage from '../views/HotPage.vue';
// import stockPage from '../views/StockPage.vue'
import screenPage from '../views/ScreenPage.vue';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: screenPage
  },
  // {
  //   path: '/sellerPage',
  //   component: sellerPage
  // },
  // {
  //   path: '/trendPage',
  //   component: trendPage
  // },
  {
    path: '/mapPage',
    component: mapPage
  },
  // {
  //   path: '/rankPage',
  //   component: rankPage
  // },
  {
    path: '/hotPage',
    component: hotPage
  },
  // {
  //   path: '/stockPage',
  //   component: stockPage
  // }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router