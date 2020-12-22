import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Hall from '../components/Hall/Hall.vue'
import Search from '../components/Search/Search.vue'
import List from '../components/List/List.vue'
import Account from '../components/Account/Account.vue'
import ResourceDetail from '../components/Hall/ResourceDetail.vue'
import Play from '../components/Play.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home', component: Home, redirect: '/hall', children: [
      { path: '/hall', component: Hall },
      { path: '/search', component: Search },
      { path: '/list', component: List },
      { path: '/account', component: Account }
    ]
  },
  { path: '/resourcedetail', name: 'resourcedetail', component: ResourceDetail },
  { path: '/play', name: 'play', component: Play }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
})

export default router
