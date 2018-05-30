<template>
  <div id="ranking" ref="wrapper" :style="{overflow: Scroll,position: Position,height: wrapperHeight + 'px'}">
    <h2>排行榜</h2>
    <table class="weui-table weui-border-tb">
      <thead>
        <tr>
          <th>名次</th>
          <th>封面图</th>
          <th>编号</th>
          <th>姓名</th>
          <th>票数</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="rankingColor(index)" v-for="(item,index) in voteList" :key="index" @click="zoom(index)">
          <td>
            <i class="icon-chs_cs_hg" v-show="index<3"></i>
            <i v-show="index>2">{{index+1}}</i>
          </td>
          <td>
            <img :src="item.itemurl | imgStr">
          </td>
          <td>{{item.itemsort}}</td>
          <td>{{item.itemname}}</td>
          <td>{{item.itemcount}}</td>
        </tr>
      </tbody>
    </table>

    <!-- 弹出提示 -->
    <div class="tips" v-show="tips" @click="closeTips()">
      <div class="tipsInfo"></div>
    </div>

    <!-- 选手页面，同首页预览 -->
    <div class="preview" v-show="preview">
      <div class="previewBox">
        <div class="pic">
          <img :src="previewList.itemurl | imgStr">
          <div class="previewInfo">
            <span>{{previewList.itemsort}}号</span>
            <span>{{previewList.itemname}}</span>
            <span>{{previewList.itemcount}}票</span>
          </div>
        </div>
        <div class="preIntroduce" style="-webkit-box-orient: vertical;-moz-box-orient: vertical;">{{previewList.itemdesc}}</div>
        <div class="voteShare">
          <span @click="voteBtn()">
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
  import {
    Toast
  } from "mint-ui";

  export default {
    name: "Ranking",
    data() {
      return {
        voteList: [],
        preview: false,
        tips: '',
        voteIndex: 0,
        voteId: 0,
        previewList: [],
        Scroll: 'auto', // 弹出遮罩后禁止后面页面滚动
        Position: 'static', //给后面页面定位
        wrapperHeight: 0
      };
    },
    methods: {
      //获取排行数据
      getVoteList() {
        var url = '/market/interface/getVoteItem?terminaltype=Mobile&eventid=2';
        this.$http.get(url).then(res => {
          // console.log(res.body);
          this.voteList = res.body.result.resourcelist;
        })
      },

      //前三名显示不同颜色
      rankingColor(index) {
        var color;
        switch (index) {
          case 0:
            color = 'gold'
            break;
          case 1:
            color = 'silver'
            break;
          case 2:
            color = 'copper'
            break;
        }
        return color;
      },

      //关闭提示弹出层
      closeTips() {
        this.tips = false;
        this.$store.commit("tips", false);
      },

      //弹出预览
      zoom(index) {
        this.preview = !this.preview;
        this.voteIndex = index;
        this.voteId = this.voteList[index].itemid;
        this.previewList = this.voteList[index];

        this.Scroll = 'hidden';
        this.Position = 'fixed';
      },
      closeBtn() {
        this.preview = !this.preview;
        this.Scroll = 'auto';
        this.Position = 'static';
      },
      voteBtn() {
        if (this.$store.state.mobileSn == '12345') {
          Toast('请先下载“星视界”app,并在app里参与投票!');
          setTimeout(function () {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.chs.phone.xingsha';
          }, 2000)
        } else {
          var url = '/market/interface/votesubmit?terminaltype=Mobile&customerno=' + this.$store.state.mobileSn +
            '&voteid=2&voteresult=' + this.voteId;
          this.$http.get(url).then(res => {
            var code = res.body.result.errorcode;
            switch (code) {
              case 0:
                //投票成功，改变票数
                this.voteList[this.voteIndex].itemcount = this.voteList[this.voteIndex].itemcount * 1 + 1;
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
      }
    },
    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
      this.getVoteList();
      this.tips = this.$store.state.tips;
    },
    filters: {
      imgStr(v1) {
        return '/market' + v1;
      }
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2 {
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    text-align: center;
    color: #333;
    font-size: 15px;
    font-weight: 700;
  }

  table {
    color: #333;
  }

  table thead {
    background-color: #F7F7F7;
    font-size: 16px;
  }

  table tbody {
    font-size: 16px;
  }

  .weui-table td,
  .weui-table th {
    border: none;
  }

  .weui-border-tb {
    background-image: none;
  }

  table tbody tr {
    border-bottom: 1px solid rgb(231, 229, 229);
    height: 10vh;
  }

  tbody td:nth-child(2) img {
    width: 18vw;
    height: 18vw;
    display: block;
    margin: 1vh auto;
  }

  .gold {
    color: #FFD822;
  }

  .silver {
    color: #999;
  }

  .copper {
    color: #FE9822;
  }

  i {
    font-style: normal;
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
    text-overflow: -o-ellipsis-lastline;
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

  .tips {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    background-color: rgba(0, 0, 0, .3);
    /* visibility: hidden; */
    display: flex;
    /*Flex布局*/
    display: -webkit-flex;
    /* Safari */
    align-items: center;
    /*指定垂直居中*/
  }

  .tipsInfo {
    width: 215px;
    height: 62px;
    margin: auto;
    background: url('../assets/images/point.png') no-repeat;
    background-size: 215px 62px;
  }

</style>
