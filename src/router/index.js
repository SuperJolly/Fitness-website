import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import Plan from 'components/Plan'
import Rank from 'components/Rank'
import Admin from 'components/Admin'
import Profile from 'components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // {
    //   path: '/',
    //   name: 'List',
    //   component: List
    // },{
    //   path : '/movie/:title',
    //   name : 'detail',
    //   component : Detail
    // },
    // {
    //   path: '*',
    //   redirect : '/'
    // }
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/plan',
      name: 'plan',
      component: Plan
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/',
      redirect : '/index'
    }
  ]
})
