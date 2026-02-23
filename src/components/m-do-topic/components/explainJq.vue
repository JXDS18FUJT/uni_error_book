<template>
  <van-overlay z-index="10" :show="show">
    <div class="skills-box">
      <div class="skills">
        <div class="title uni-app-fontsize-paragraph">技巧讲解</div>
        <image class="skills-gif" v-if="explainJqGif" :src="explainJqGif"></image>
        <rich-text :nodes="markRedSkillKeyWord(skillkeyword)"></rich-text>
        <!-- <div class="text uni-app-fontsize-paragraph">{{ explainJq }}</div> -->
        <div class="btn uni-app-fontsize-paragraph">
          <span
            @click="
              () => {
                $emit('close');
              }
            "
          >
            关闭
          </span>
          <span
            @click="
              () => {
                playexplainMp3();
              }
            "
          >
            语音重播
          </span>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import utils from "@/utils/index";
export default {
  data() {
    return {};
  },
  methods: {
    markRedSkillKeyWord(keyWord) {
      let explainJq = this.explainJq;
      let keyWords = keyWord.split("-");
      keyWords.forEach((element) => {
        explainJq = explainJq.replace(
          element,
          '<span style="color:red">' + element + "</span>"
        );
      });

      return explainJq;
    },

    playexplainMp3() {
      let audio = utils.wxUtils.getGlobAudio();
      audio.stop();
      console.log(this.explainMp3, "explainMp3");
      audio.src = this.explainMp3;
      audio.onCanplay(() => {
        console.log("onCanplay");
      });
      audio.onPlay(() => {
        console.log("onPlay");
      });
      audio.onError((res) => {
        console.log(res);
      });
      //体验比较好
      setTimeout(() => {
        audio.play();
      }, 1000);
    },
  },
  watch: {
    show(newValue, oldValue) {
      let audio = utils.wxUtils.getGlobAudio();
      console.log(this.explainMp3);
      if (newValue) {
        audio.src = this.explainMp3;

        audio.play();
      } else {
        audio.stop();
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    explainJq: {
      type: String,
      default: "",
    },
    explainJqGif: {
      type: String,
      default: "",
    },
    skillkeyword:{
      type: String,
      default: "",
    },
    explainMp3: {
      type: String,
      default: "https://ndata.zzxcx.net/kt/explain_js_mp3/explainJS683.mp3",
    },
  },
};
</script>

<style lang="scss" scoped>
.skills-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .skills {
    width: 290px;
    background: #ffffff;
    box-shadow: 0px 0px 8px rgba(124, 129, 136, 0.16);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 16px;
    box-sizing: border-box;
    .skills-gif {
      width: 100%;
    }
    .title {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 21px;
      color: #0a1a33;
    }
    .img {
      width: 258px;
      height: 129px;
      border: 1px solid #e8e8e8;
      margin-top: 16px;
    }
    .divider {
      margin-top: 20px;
      color: #0a1a33;
      background: #ffffff;
    }
    .text {
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 19px;
      color: #5c6066;
      margin-top: 10px;
      line-height: 1.5;
    }
    .btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 15rpx;
      box-sizing: border-box;
      margin-top: 20px;
      span {
        width: 100px;
        height: 30px;
        border-radius: 15px;

        display: flex;
        justify-content: center;
        align-items: center;
        &:active {
          background-color: #afaaaa;
          filter: brightness(50%);
        }
        &:nth-of-type(1) {
          border: 1px solid #707070;
          color: #5c6066;
        }
        &:nth-of-type(2) {
          background: #498ef5;
          border: 1px solid #498ef5;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
