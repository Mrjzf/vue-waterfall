<template>
  <div id="app">

    <router-view/>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item " to="/home">
        <span class="mui-icon icon-chs_cs_home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/ranking">
        <span class="mui-icon icon-chs_cs_charts"></span>
        <span class="mui-tab-label">排行</span>
      </router-link>
      <router-link class="mui-tab-item" to="/rule">
        <span class="mui-icon icon-chs_cs_gz"></span>
        <span class="mui-tab-label">规则</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
  export default {
    name: "App",
    data: () => {
      return {
        isLogin: 0,
        userId: '',
        mobileSn: ''
        // isRouterAlive: true
      };
    },
    created() {
      // try {
      //   this.isLogin = jstomobile.jsIsUserLogin();
      // } catch (e) {
      //   this.isLogin = 2;
      // }
      // this.$store.commit("isLogin", this.isLogin);

      // try {
      //   if (isLogin == "1") {
      //     this.userId = jstomobile.getUserId();
      //   } else {
      //     this.userId = "12345";
      //   }
      // } catch (e) {
      //   this.userId = "12345";
      // }
      // this.$store.commit("userId", this.userId);

      //手机唯一编码
      try {
        this.mobileSn = jstomobile.jsgetScreenSN();
      } catch (error) {
        // this.mobileSn = Math.random();
        this.mobileSn = '12345';
      }
      this.$store.commit("mobileSn", this.mobileSn);

      try {
        jstomobile.setHtmlTitle('【投票】“星视界”首届萌娃网络大赛');
      } catch (error) {}

    },
    methods: {
      // reload() {
      //   this.isRouterAlive = false;
      //   this.$nextTick(() => {
      //     this.isRouterAlive = true;
      //   })
      // }
    },
    components: {

    },
    watch: {},
    computed: {},
    filters: {},
    mounted() {},
    updated() {}
  };

</script>

<style>
  /* css reset */

  body,
  h1,
  h2,
  h3,
  ul,
  ol,
  li,
  figure,
  figcaption {
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #fff !important;
    font-family: 'PingFang-SC-Regular';
  }

  h1,
  h2,
  h3 {
    font-weight: normal;
  }

  ul,
  ol {
    list-style: outside none none;
  }

  a {
    text-decoration: none;
  }

  /*区块,图片响应式*/

  img {
    display: block;
    max-width: 100%;
  }

  #app {
    width: 100%;
    padding-bottom: 9vh !important;
  }

  .mui-bar {
    background-color: #333 !important;
  }

  .mui-bar-tab {
    bottom: 0;
    display: table;
    width: 100%;
    height: 8vh;
    padding: 0;
    table-layout: fixed;
    border-top: 0;
    border-bottom: 0;
    -webkit-touch-callout: none;
  }

  .mui-bar {
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    height: 8vh;
    /*padding-right: 10px;*/
    /* padding-left: 10px; */
    border-bottom: 0;
    background-color: #fff;
    -webkit-box-shadow: 0 0 1px rgba(218, 218, 218, 0.85);
    box-shadow: 0 0 1px rgba(218, 218, 218, 0.85);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .mui-bar-tab .mui-tab-item {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 8vh;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }

  .mui-bar-tab .mui-tab-item .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .mui-bar .mui-icon {
    font-size: 22px;
    position: relative;
    z-index: 20;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .mui-bar-tab .mui-tab-item.router-link-active {
    color: #FF4F38 !important;
  }

  .mui-bar-tab .mui-tab-item .mui-icon~.mui-tab-label {
    font-size: 10px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-tab-label {
    font-size: 10px !important;
  }

</style>
