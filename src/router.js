import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('./pages/Main.vue'),
  },
  {
    path: '/tablet',
    component: () => import('./pages/Main.vue'),
    props: {
      isTablet: true,
    }
  },
  {
    path: '/docs',
    component: () => import('./pages/Docs.vue'),
  },
  {
    path: '/naked',
    component: () => import('./pages/Naked.vue'),
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})