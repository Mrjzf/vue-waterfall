<template>
  <div>
    <div class="title">
      <i class="icon-chs_cs_gz"></i>活动规则介绍
    </div>

    <div class="ruleInfo">
      <h4>参与方式：</h4>
      <p>1、关注【长沙县广播电视台微信公众号】，后台发送1张宝宝单人照，留下个人参赛昵称或姓名及家长电话号码，留言一句参赛宣言，我们将选取满足条件的萌娃进入投票环节！</p>
      <p>2、下载【长沙县广播电视台“星视界APP”】，首页进入投票活动页，对你喜欢的选手进行投票即可，每人每天可在投票平台投5票。最终得票前二十的萌宝，将获得我们丰厚的奖品！</p>
      <br>
      <h4>图片要求：</h4>
      <p>只可上传一张图到后台（图片不清晰、太暗、倒置等都无法审核）</p>
      <br>
      <h4>活动大奖：</h4>
      <p>一共选出前二十名</p>
      <div class="awards">
        <h5>一等奖（1名）</h5>
        <p>《小顽国亲子乐园》客房套票1张（价值998元）</p>
        <p>《长沙乐水魔方水世界》水上乐园家庭套票1张（价值388元，包括两个大人两个小孩）</p>
        <p>《湖南红领巾剧场》丹麦互动儿童剧《杰克的花式冰激凌》演出门票1张（价值260元）</p>

        <h5>二等奖（1名）</h5>
        <p>《小顽国亲子乐园》客房套票1张（价值998元）</p>
        <p>《长沙乐水魔方水世界》上乐园家庭套票1张（价值288元，包括两个大人1个小孩）</p>
        <p>《湖南红领巾剧场》丹麦互动儿童剧《杰克的花式冰激凌》演出门票1张（价值260元）</p>

        <h5>三等奖（1名）</h5>
        <p>《小顽国亲子乐园》客房套票1张（价值998元）</p>
        <p>《长沙乐水魔方水世界》水上乐园家庭套票1张（价值188元，包括1个大人1个小孩）</p>
        <p>《湖南红领巾剧场》丹麦互动儿童剧《杰克的花式冰激凌》演出门票1张（价值260元）</p>

        <h5>四等奖（7名）</h5>
        <p>《小顽国亲子乐园》入场券1张（价值298元）</p>
        <p>《湖南红领巾剧场》丹麦互动儿童剧《杰克的花式冰激凌》演出门票1张（价值260元）</p>

        <h5>优秀奖（10名）</h5>
        <p>《印象小镇私人影院》家庭亲子电影包厢1场（价值168元）</p>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "Rule",
    data() {
      return {

      };
    },
    methods: {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    text-align: center;
    color: #FF4F38;
    font-size: 16px;
  }

  .title i {
    font-size: 22px;
    margin-right: 2vw;
    position: relative;
    top: 4px;
  }

  .ruleInfo {
    margin: 0 2vw;
    color: #333;
  }

  .ruleInfo h4 {
    font-size: 16px;
    font-weight: bold;
  }

  .ruleInfo h5 {
    font-size: 15px;
  }

  p {
    line-height: 2;
  }

  .ruleInfo p {
    font-size: 14px;
  }

  .awards p {
    color: #777;

  }

</style>
