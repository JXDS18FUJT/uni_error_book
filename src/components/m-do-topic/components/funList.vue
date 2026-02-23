<template>
  <view class="function-list">
    <div
      v-if="midFunc.includes('collect')"
      @click="
        () => {
          $emit('collect');
        }
      "
      class="function-item"
    >
      <van-icon
        v-if="!privateProblemListItem.isCollect"
        name="star-o"
        size="25px"
      />
      <van-icon
        color="#ffde00ff"
        v-if="privateProblemListItem.isCollect"
        name="star"
        size="25px"
      />
      <span>收藏</span>
    </div>
    <!-- <div class="function-item" @click="answerAudioPlay">
      <m-icon type="a-dtda" size="25px" />
      <span>读题+答案</span>
    </div> -->
    <div
      v-if="midFunc.includes('readQuestionAndAnswer')"
      @click="
        () => {
          $emit('readQuestionAndAnswer');
        }
      "
      class="function-item"
    >
      <m-jp-icon type="a-dtda" size="25px" />
      <span>读题+答案</span>
    </div>
    <div
      v-if="midFunc.includes('readQuestion')"
      @click="readQuestion()"
      class="function-item"
    >
      <m-jp-icon type="duti" size="25px" />
      <span>读题</span>
    </div>
    <div
      v-if="midFunc.includes('skill')"
      @click="
        () => {
          explainJqVisible = true;
        }
      "
      class="function-item"
    >
      <m-jp-icon type="jqjj" size="25px" />
      <span>技巧讲解</span>
    </div>
    <!-- <div class="function-item" @click="currentAnswerIndexBack">
      <m-icon type="shangyiti" size="25px" />
      <span>上一题</span>
    </div>
    <div class="function-item" @click="skillsShow = true">
      <m-icon type="zongtishu" size="25px" />
      <span>1/100</span>
    </div>
    <div class="function-item" @click="currentAnswerIndexGo">
      <m-icon type="xiayiti" size="25px" />
      <span>下一题</span>
    </div> -->
    <explainJq
      :show="explainJqVisible"
      :explainJqGif="problemListItem.explainGif"
      :explainJq="problemListItem.explainJq"
      :explainMp3="problemListItem.explainMp3"
      @close="
        () => {
          explainJqVisible = false;
        }
      "
    ></explainJq>
  </view>
</template>

<script>
import utils from "@/utils/index";
import explainJq from "./explainJq.vue";
export default {
  data() {
    return {
      explainJqVisible: false,
    };
  },
  methods: {
    readQuestion() {
      let globalAudio = utils.wxUtils.getGlobAudio();
      if (globalAudio) {
        globalAudio.src = this.problemListItem.issuemp3;
        globalAudio.stop();
        globalAudio.play();
      }
    },
    readQuestionAndAnswer() {
      let globalAudio = utils.wxUtils.getGlobAudio();
      this.$emit("completeTopic");

      if (globalAudio) {
        globalAudio.src = this.problemListItem.issuemp3;
        globalAudio.stop();
        globalAudio.play();
        globalAudio.onEnded(() => {
          globalAudio.src = this.problemListItem.answermp3;
          globalAudio.stop();
          globalAudio.play();
          globalAudio.offEnded();
        });
      }
    },
  },
  computed: {
    //private的
    privateProblemListItem() {
      return this.problemListItem;
    },
  },
  components: {
    explainJq,
  },
  props: {
    problemListItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
    midFunc: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.function-list {
  width: 100%;
  font-size: 13px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 8px;
  box-sizing: border-box;
  border-top: 2rpx solid #d8d8d8;
  .function-item {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
    color: #8a9099;
    span {
      margin-top: 5px;
    }
  }
}
</style>