import { createRouter, createWebHistory } from 'vue-router'
import HelpView from '../components/HelpView.vue'
import CreateNewFund from '../components/CreateNewFund.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/create',
      name: 'create',
      component: CreateNewFund
      //引数のないコンポーネントは上記3つで十分。
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
      // props: route => ({id: route.params.id, text: route.params.text})
      //引数がある場合はpropsを指定しておく。ここでは関数の書き方で引数を指定する。
    }
  ]
})
