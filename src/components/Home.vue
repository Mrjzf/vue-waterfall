<template>

  <div id="home" ref="wrapper" :style="{overflow: Scroll,position: Position,height: wrapperHeight + 'px'}">

    <mt-loadmore :auto-fill="false" :bottom-all-loaded="allLoaded" :bottom-method="getNextPage" @bottom-status-change="handleBottomChange"
      ref="loadmore">

      <!-- 头部 -->
      <header>
        <img src="../assets/images/banner.jpg" alt="">
        <div class="statistics">
          <div class="weui-flex">
            <div class="weui-flex-item">
              <div class="statName">报名人数</div>
              <div class="statNum">{{totalnum}}</div>
            </div>
            <div class="weui-flex-item">
              <div class="statName">投票数</div>
              <div class="statNum">{{voteNum}}</div>
            </div>
            <!-- <div class="weui-flex-item">
            <div class="statName">访问量</div>
            <div class="statNum">543.564</div>
          </div> -->
          </div>
        </div>
      </header>

      <!-- 结束时间 -->
      <div class="endTime">
        <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :startTime="currentTime" :currentTime="currentTime"
          :endTime="endTime" :tipText="startTipText" :tipTextEnd="endTipText" :endText="endText" :dayTxt="'天'" :hourTxt="'小时'"
          :minutesTxt="'分钟'" :secondsTxt="'秒'">
        </count-down>
      </div>

      <!-- 活动介绍 -->
      <div class="introduce">
        <div class="weui_cells weui_cells_access">
          <div class="weui_cell">
            <div class="icon-chs_cs_zhuti" style="color:#06CD32"></div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>长沙县广播电视台“星视界”首届萌娃网络大赛</p>
            </div>
          </div>
          <div class="weui_cell">
            <div class="icon-chs_cs_sj" style="color:#FF3E19"></div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>2018年5月27日9:00—5月30晚9:00</p>
            </div>
          </div>
          <div class="weui_cell" @click="goRule()">
            <div class="icon-chs_cs_event" style="color:#FF8406"></div>
            <div class="weui_cell_bd weui_cell_primary">
              <p>活动介绍</p>
            </div>
            <div class="weui_cell_ft"></div>
          </div>
        </div>
      </div>

      <div class="water">
        <!--
          gutterWidth:瀑布流子组件水平间距  
          gutterHeight:瀑布流子组件垂直间距	
          resizable:当浏览器窗口调整大小时是否重新布局	
          align:对齐方式	
          fixWidth:是否固定组件宽度	
          minCol:最小显示列数	
          maxCol:最大显示列数	
        -->
        <Waterfall align="center" :gutterWidth="10" :gutterHeight="10" :minCol="2" :maxCol="2">
          <WaterfallItem :width="imgWidth" v-for="(item,index) in imgsArr">
            <div class="imgbox" @click="zoom(index)">
              <img :src="item.itemurl | imgUrl" onclick="return false">
              <div class="voteInfo1">
                <span class="userNum">{{item.itemsort}}号</span>
                <span class="userInfo">{{item.itemname | txtStr}}</span>
                <span class="zoom icon-chs_cs_amplify"></span>
              </div>
            </div>
            <div class="voteInfo2">
              <span class="poll">{{item.itemcount}}票</span>
              <span class="voteBtn" @click="voteBtn(index,item.itemid)">
                <i class="icon-chs_cs_love"></i>
                投票
              </span>
            </div>
          </WaterfallItem>
        </Waterfall>
      </div>

      <div slot="bottom" class="mint-loadmore-bottom" v-show="pageisOK">
        <div v-show="bottomStatus !== 'loading'">
          <span :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
          <span v-if="bottomStatus === 'pull'">&nbsp;上拉加载</span>
          <span v-else>&nbsp;释放加载</span>
        </div>
        <!-- <span v-show="bottomStatus === 'loading'">加载中...</span> -->
      </div>
      <div id="dataEnd" v-show="allLoaded">没有更多了！</div>

    </mt-loadmore>

    <!-- 放大预览 -->
    <div class="preview" v-show="preview">
      <div class="previewBox">
        <div class="pic">
          <img :src="previewList.itemurl | imgUrl">
          <div class="previewInfo">
            <span>{{previewList.itemsort}}号</span>
            <span>{{previewList.itemname}}</span>
            <span>{{previewList.itemcount}}票</span>
          </div>
        </div>
        <div class="preIntroduce" style="-webkit-box-orient: vertical;-moz-box-orient: vertical;">{{previewList.itemdesc}}</div>
        <div class="voteShare">
          <!-- onclick="voteBtn(voteIndex,previewList.itemid)" -->
          <span @click="voteBtn(voteIndex,previewList.itemid)">
            <i class="icon-chs_cs_love"></i>
            投票
          </span>
          <!-- <span>
            <i class="icon-chs_cs_share"></i>
            拉票
          </span> -->
        </div>

        <div class="closeBtn" @click="closeBtn()"></div>
      </div>

    </div>

  </div>

</template>

<script>
  //倒计时
  import CountDown from '@/components/CountDown'
  //瀑布流
  import {
    Waterfall,
    WaterfallItem
  } from 'vue2-waterfall'

  import {
    Toast,
    Indicator
  } from "mint-ui";

  export default {
    name: "Home",
    data() {
      return {
        preview: false, //预览是否关闭
        currentTime: '', //当前时间戳
        startTime: 1527382800, //开始时间戳
        endTime: 1527685200, //结束时间戳
        startTipText: '距活动开始还有',
        endTipText: '距活动结束还有',
        endText: '结束了~',
        imgsArr: [], //瀑布流数据
        previewList: [], //预览数据
        voteIndex: 0, //投票索引
        voteNum: 0, //投票数
        mobileSn: '', //手机唯一编码当做用户id
        Scroll: 'auto', // 弹出遮罩后禁止后面页面滚动
        Position: 'static', //给后面页面定位
        currentpage: 1, //当前页数
        totalpage: 1, //页数
        totalnum: 0, //总条数，总人数 == 报名人数
        wrapperHeight: 0, //加载的内容的高度
        bottomStatus: "",
        allLoaded: false,
        pageisOK: false,
        imgWidth: 0
      };
    },
    components: {
      CountDown,
      Waterfall,
      WaterfallItem
    },
    updated() {},
    created() {
      this.currentTime = Date.parse(new Date());
      this.getVoteAllList();
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.getVoteList();
      this.mobileSn = this.$store.state.mobileSn;
      this.imgWidth = Number(document.documentElement.clientWidth / 2 - 20);
    },
    methods: {

      //倒计时的回调
      countDownS_cb: function (x) {
        console.log('countDownS：' + x);
      },
      countDownE_cb: function (x) {
        console.log('countDownE：' + x);
      },

      //加载所有数据，计算投票数
      getVoteAllList() {
        var url = '/market/interface/getVoteItem?terminaltype=Mobile&eventid=2';
        this.$http.get(url).then(res => {
          // console.log(res.body);
          var list = res.body.result.resourcelist;
          for (let i = 0; i < list.length; i++) {
            this.voteNum += list[i].itemcount;
          }
        })
      },

      //加载数据
      getVoteList() {
        Indicator.open();
        //先加载8条
        var url = '/market/interface/getVoteItem?terminaltype=Mobile&eventid=2&pagesize=8&pagenum=' + this.currentpage;
        this.$http.get(url).then(res => {
          console.log(res.body);
          this.imgsArr = res.body.result.resourcelist;
          this.totalpage = res.body.result.pageinfo.totalpage;
          this.totalnum = res.body.result.pageinfo.totalnum;

          this.pageisOK = true;
          this.allLoaded = false;
          Indicator.close();
        })
      },
      getNextPage() {
        console.log(this.currentpage, this.totalpage);
        if (this.currentpage < this.totalpage) {
          this.currentpage++;
          Indicator.open();
          var url = '/market/interface/getVoteItem?terminaltype=Mobile&eventid=2&pagesize=8&pagenum=' + this.currentpage;
          this.$http.get(url).then(res => {
            console.log(res.body);
            this.imgsArr = this.imgsArr.concat(res.body.result.resourcelist);
            Indicator.close();
            this.$refs.loadmore.onBottomLoaded();
          })
        } else {
          this.allLoaded = true;
          Indicator.close();
        }
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
      //投票
      voteBtn(index, id) {
        if (this.mobileSn == '12345') {
          Toast('请先下载“星视界”app,并在app里参与投票!');
          setTimeout(function () {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.chs.phone.xingsha';
          }, 2000)
        } else {
          var url = '/market/interface/votesubmit?terminaltype=Mobile&customerno=' + this.mobileSn +
            '&voteid=2&voteresult=' + id;
          this.$http.get(url).then(res => {
            var code = res.body.result.errorcode;
            switch (code) {
              case 0:
                //投票成功，改变票数
                this.imgsArr[index].itemcount = this.imgsArr[index].itemcount * 1 + 1;
                this.voteNum = this.voteNum * 1 + 1;
                Toast({
                  message: '投票成功！',
                  duration: 1500
                });
                break;
              case -1:
                Toast('规定时间内不允许重复投票!');
                break;
              case -2:
                Toast('不允许多选!');
                break;
              case -7:
                Toast('活动未开始!');
                break;
              case -8:
                Toast('活动已结束!');
                break;
              case -5:
                Toast('当前活动不存在!');
                break;
              case -11:
                Toast('没有投票次数了~!');
                break;
            }
          })
        }
      },

      //预览
      zoom(index) {
        this.preview = !this.preview;
        this.voteIndex = index;
        this.previewList = this.imgsArr[index];
        this.Scroll = 'hidden';
        this.Position = 'fixed';
      },
      //关闭预览
      closeBtn() {
        this.preview = !this.preview;
        this.Scroll = 'auto';
        this.Position = 'static';
      },

      //去往活动介绍
      goRule() {
        // this.$router.push({path: '/live/channel', query: {isPayChannel: true, isFromMore: true}});
        this.$router.push({
          path: '/rule'
        });
      },

    },

    filters: {
      txtStr(v1) {
        return v1.substr(0, 6);
      },
      imgUrl(v1) {
        return '/market' + v1;
      }
    },
    computed: {
      // voteCount() {
      //   return this.imgsArr[this.voteIndex]
      // }
    },
    watch: {
      // imgsArr(val, oldval) {
      //   console.log(newVal, oldVal);
      // }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #home {
    background-color: #f2f2f2;
  }

  header {
    width: 100%;
    height: 40vh;
    background: #ccc;
    position: relative;
  }

  header img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .statistics {
    width: 100%;
    height: 8vh;
    background-color: rgba(255, 255, 255, .8);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    color: #333;
    font-size: 12px;
  }

  .statName {
    text-align: center;
    margin-top: 6px;
  }

  .statNum {
    text-align: center;
  }

  .endTime {
    width: 100%;
    height: 6vh;
    line-height: 6vh;
    text-align: center;
    background-color: #fff;
    color: #FF4F37;
    font-size: 14px;
  }

  .introduce {
    width: 100%;
  }

  .introduce .weui_cells {
    margin-top: 0;
    font-size: 15px;
  }

  .introduce .weui_cell:before {
    border-top: none;
  }

  .introduce .weui_cell_bd {
    color: #333;
    margin-left: 6px;
  }

  .water {
    width: 100%;
    background-color: #f2f2f2;
    margin-top: 1vh;
  }

  .imgbox {
    position: relative;
  }

  .imgbox>img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: block;
  }

  .voteInfo1 {
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    background-color: rgba(31, 6, 6, 0.5);
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    font-size: 16px;
  }

  .userNum {
    float: left;
    height: 100%;
    margin-left: 0.8vw;
  }

  .userInfo {
    float: left;
    height: 100%;
    margin-left: 1.6vw;
  }

  .zoom {
    font-size: 24px;
    float: right;
    line-height: 4.5vh;
    margin-right: 0.9vw;
  }

  .voteInfo2 {
    width: 100%;
    height: 7vh;
    background-color: #fff;
    font-size: 16px;
  }

  .poll {
    line-height: 7vh;
    color: #FF4F38;
    margin-left: 6px;
  }

  .voteBtn {
    width: 21vw;
    height: 5vh;
    line-height: 5vh;
    float: right;
    text-align: right;
    padding-right: 2vw;
    box-sizing: border-box;
    background-color: #ff4f38;
    color: #fff;
    font-size: 15px;
    border-radius: 6px;
    margin: 4% 6px 0 0;
  }

  .voteBtn i {
    height: 100%;
    color: #fff;
    font-size: 20px;
    float: left;
    line-height: 5vh;
    margin-left: 2vw;
  }
  
  .preview {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background-color: rgba(0, 0, 0, .7);
    /* visibility: hidden; */
    display: flex;
    /*Flex布局*/
    display: -webkit-flex;
    /* Safari */
    align-items: center;
    /*指定垂直居中*/
  }

  .previewBox {
    width: 100%;
    background-color: #fff;
    margin: 0 4vw;
    border-radius: 1%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    /* overflow: scroll; */
  }

  .pic {
    width: 100%;
    position: relative;
  }

  .pic img {
    width: 100%;
    max-height: 358px !important;
    display: block;
  }

  .previewInfo {
    width: 100%;
    height: 4vh;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    font-size: 16px;
    line-height: 4vh;
  }

  .previewInfo span:first-child {
    margin-left: 2vw;
  }

  .previewInfo span:nth-child(2) {
    margin-left: 4vw;
  }

  .previewInfo span:last-child {
    float: right;
    margin-right: 4vw;
  }

  .preIntroduce {
    width: 100%;
    margin-top: 1vh;
    font-size: 12px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    /*设置成弹性盒子 */
    display: -webkit-box;
    /*显示的个数 */
    -webkit-line-clamp: 3;
    /* 属性规定框的子元素应该被水平或垂直排列。 */
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
  }

  .voteShare {
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    margin-top: 1vh;
  }

  .voteShare span:first-child {
    width: 21vw;
    height: 5vh;
    line-height: 5vh;
    /* float: left; */
    float: right;
    background-color: #FF4F38;
    color: #fff;
    border-radius: 6px;
  }

  .voteShare span i {
    font-size: 20px;
    line-height: 5.2vh;
    float: left;
    margin: 0 1vw;
  }

  /* .voteShare span:last-child {
    width: 28vw;
    float: right;
    padding-left: 10vw;
    color: #FF4F38;
    position: relative;
  } */

  .closeBtn {
    width: 6vw;
    height: 6vw;
    background-color: aqua;
    position: absolute;
    top: -5px;
    right: -4px;
    background: url('../assets/images/close.png') no-repeat;
    background-size: 6vw 6vw;
  }

  #dataEnd {
    text-align: center;
  }

</style>
