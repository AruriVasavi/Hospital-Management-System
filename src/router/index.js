import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import LoginPage from '../components/Administration/LoginPage.vue';
import NotFound from '../components/Administration/NotFound.vue';
import OpHome from '../components/Op/OpHome.vue';
import DoctorHome from '../components/Doctor/DoctorHome.vue';
import DiagnosisDt from '../components/Diagnosis/DiagnosisDt.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: NotFound
  },
  {
    path: '/ophome',
    name: 'ophome',
    component: OpHome
  },
  {
    path: '/doctorhome',
    name: 'doctorhome',
    component:DoctorHome
  },
  {
    path: '/diagnosishome',
    name: 'diagnosishome',
    component:DiagnosisDt
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
