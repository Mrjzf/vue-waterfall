import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
const Ranking = resolve => require(['@/components/Ranking.vue'], resolve);
const Rule = resolve => require(['@/components/Rule.vue'], resolve);

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home' //重定向，页面一加载就在首页
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: '【投票】“星视界”首届萌娃网络大赛'
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        title: '【投票】“星视界”首届萌娃网络大赛'
      }
    },
    {
      path: '/rule',
      name: 'Rule',
      component: Rule,
      meta: {
        title: '【投票】“星视界”首届萌娃网络大赛'
      }
    }
  ]
})
