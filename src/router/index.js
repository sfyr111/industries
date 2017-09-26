import Vue from 'vue'
import Router from 'vue-router'
import {
        Test,
        Help,
        Home,
        User,
        Exp,
        Charts,
        Search,
        Dynamic,
        Personal,
        Analysis,
        Favorites,
        Discovery,
        DynamicDetail,
        AnalysisOption,
        AnalysisDetail
      } from './components'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/exp',
      name: 'Exp',
      component: Exp
    },
    {
      path: '/charts',
      name: 'Charts',
      component: Charts
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/discovery',
      name: 'discovery',
      component: Discovery,
      children: [
        {
          path: ':item',
          name: 'dynamic',
          component: Dynamic,
          children: [
            {
              path: ':id',
              name: 'dynamic-detail',
              component: DynamicDetail
            }
          ]
        }
      ]
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: Analysis,
      children: [
        {
          path: ':item',
          name: 'analysis-option',
          component: AnalysisOption,
          children: [
            {
              path: ':id',
              name: 'analysis-detail',
              component: AnalysisDetail
            }
          ]
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: 'personal',
          name: 'personal',
          component: Personal
        },
        {
          path: 'help',
          name: 'help',
          component: Help
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: Favorites
        }
      ]
    }
  ]
})
