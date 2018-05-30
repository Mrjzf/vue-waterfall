import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: 0, //判断用户是否登录  1登录   2未登录
    userId: '', //用户号
    tips: true,
    mobileSn: '', //手机唯一编码
    back: true
  },
  mutations: {
    isLogin(_s, _v) {
      _s.isLogin = _v;
    },
    userId(_s, _v) {
      _s.userId = _v;
    },
    tips(_s, _v) {
      _s.tips = _v;
    },
    mobileSn(_s, _v) {
      _s.mobileSn = _v;
    },
    back(_s, _v) {
      _s.back = _v;
    }
  }
})


export default store;
