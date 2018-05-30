// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'  //状态管理
import resource from 'vue-resource' //导入resource

Vue.config.productionTip = false;

//导入mui框架
// import './assets/mui/mui.min.css'
// import Mui from './assets/mui/mui.min'

//导入weui框架
import './assets/weui/weui.css'
import './assets/weui/weui2.css'
import './assets/weui/icon.css'

//导入字体文件
import './assets/icon/style.css';

//使用vue-resource,后面才能调用其方法
Vue.use(resource);

//导入mint-ui框架,包括css(全局注册)
import 'mint-ui/lib/style.min.css'
import mintUi from 'mint-ui'
Vue.use(mintUi);

//设置路由变化修改页面title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面meta */
  // if (to.meta.content) {
  //   let head = document.getElementsByTagName('head');
  //   let meta = document.createElement('meta');
  //   meta.content = to.meta.content;
  //   head[0].appendChild(meta)
  // }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next()
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
