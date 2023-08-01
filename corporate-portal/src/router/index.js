import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserInfoView from '@/views/UserInfoView.vue';
import UserInfoEmptyView from '@/views/UserInfoEmptyView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: {name: 'user'}
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      redirect: {name: 'user.empty'},
      children: [
        {
          path: '',
          name: 'user.empty',
          component: UserInfoEmptyView
        },
        {
          path: ':id',
          name: 'user.info',
          component: UserInfoView
        },

      ]
    }
  ]
})

export default router
