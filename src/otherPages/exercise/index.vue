<template>
  <view @touchstart="touchStart" @touchend="touchEnd" class="box">
    <nav-bar :title="navTitle"> </nav-bar>
    <!-- <view style="text-align:center;">
      <van-count-down :time="time"></van-count-down>
    </view> -->
    <m-do-topic
      v-if="isGetQuery"
      :bottomFunc="['previous', 'next', 'score', 'explain', 'skill']"
      :midFunc="['collect', 'readQuestion', 'readQuestionAndAnswer']"
      :trueNum.sync="trueNum"
      :falseNum.sync="falseNum"
      :query="query"
      allowMemory
      :problemListTotal.sync="problemListTotal"
      :problemListIndex.sync="problemListIndex"
      
    ></m-do-topic>
    <!-- <view class="function-list">
      <div class="function-item">
        <van-icon name="star-o" size="25px" />
        <span>收藏</span>
      </div>
      <div
        @click="readQuestion(problemList[problemListIndex].issuemp3)"
        class="function-item"
      >
        <van-icon name="bullhorn-o" size="25px" />
        <span>读题</span>
      </div>
    </view> -->
  </view>
</template>
<script>
import navBar from "./components/navBar.vue";
import api from "@/api/index";
import utils from "@/utils/index";
import explainJs from "./components/explainJs.vue";
import tabbar from "./components/tabbar.vue";
import mRadio from "@/components/m-radio/m-radio.vue";
import mRadioGroup from "@/components/m-radio-group/m-radio-group.vue";
import mCheckbox from "@/components/m-checkbox/m-checkbox.vue";
import mCheckboxGroup from "@/components/m-checkbox-group/m-checkbox-group.vue";
import mDoTopic from "@/components/m-do-topic/m-do-topic.vue";
export default {
  data() {
    return {
      isGetQuery: false,
      query: {
        cert: "",
        vehicle: "",
        subject: "",
        title: "",
      },
      gsMap: {
        xc: "小车",
        hc: "货车",
        mtc: "摩托车",
        kc: "客车",
      },
      trueNum: 0,
      falseNum: 0,
      currentOptions: [
        {
          selected: false,
          value: "",
          isAnswer: false,
        },
        {},
      ],
      explainJsVisible: false,
      selectProblemListVisible: false,
      time: 45 * 60 * 1000,
      problemListTotal: 1,
      touchx: 0,
      touchy: 0,
      problemList: [
        {
          questionType: 2,
          answer: "×",
          answerkeyword: "",
          answermp3:
            "https://ndata.zzxcx.net/kt/answer_mp3/answer1389.mp3",
          classIssue: "54",
          classIssueName: "车内开关/装置",
          classSort: 16,
          createTime: "2022-04-21 13:33:46",
          excellIssue: "23",
          excellIssueName: "必学题三",
          excellSort: 4,
          explainGif:
            "https://ndata.zzxcx.net/kt/explain_gif/explain1389.gif",
          explainJq:
            "看图答题：红色圆圈套在杆子中间.答对；不在中间或没有圆圈的.答错。",
          explainJs:
            "图中所示为左右转向灯开关转向灯操作：上提是右转向灯亮起，下压是左转向灯。",
          explainMp3:
            "https://ndata.zzxcx.net/kt/explain_mp3/explain1389.mp3",
          explainjsmp3:
            "https://ndata.zzxcx.net/kt/explain_js_mp3/explainJS1389.mp3",
          id: 831,
          idKt: 1389,
          idYdt: 950,
          image:
            "https://ndata.zzxcx.net/kt/image/image1389.png",
          imageYdt:
            "https://ndata.zzxcx.net/kt/image_ydt/5eb4d75agw1e291vmniovj.jpg",
          issue: "将转向灯开关向上提，左转向灯亮。",
          issuemp3:
            "https://ndata.zzxcx.net/kt/issue_mp3/issue1389.mp3",
          liceBus: "1",
          liceCar: "1",
          liceMoto: null,
          liceTruck: "1",
          number: 831,
          opts: "√-×",
          optsArr: ["√", "×"],
          placeIssue: null,
          placeIssueName: null,
          placeSort: null,
          questionType: 1,
          sequeIssue: "7",
          sequeIssueName: "机械仪表",
          sequeSort: 25,
          skillkeyword: "没有圆圈-答错",
          subject: 1,
          titlekeyword: "",
          updateTime: "2022-04-22 13:43:07",
          userAnswer: [],
        },
      ],
      problemListIndex: 0,
    };
  },
  filters: {
    questionType: function (value) {
      let question = "";
      switch (value) {
        case 1:
        case "1":
          question = "判断题";
          break;
        case 2:
        case "2":
          question = "单选题";
          break;
        case 3:
        case "3":
          question = "多选题";
          break;
      }
      return question;
    },
  },
  methods: {
    touchStart(e) {
      var that = this;

      (this.touchx = e.changedTouches[0].clientX),
        (this.touchy = e.changedTouches[0].clientY);
    },
    touchEnd(e) {
      console.log(e);
      var that = this;
      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      let turn = "";
      if (x - that.touchx > 50 && Math.abs(y - that.touchy) < 50) {
        //右滑
        turn = "right";
        this.problemListIndex <= 0
          ? uni.showToast({
              title: "到底了",
              icon: "none",
            })
          : this.problemListIndex--;
      } else if (x - that.touchx < -50 && Math.abs(y - that.touchy) < 50) {
        //左滑
        turn = "left";
        this.problemListIndex >= this.problemListTotal - 1
          ? uni.showToast({
              title: "到底了",
              icon: "none",
            })
          : this.problemListIndex++;
      }
      if (y - that.touchy > 50 && Math.abs(x - that.touchx) < 50) {
        //下滑
        turn = "down";
      } else if (y - that.touchy < -50 && Math.abs(x - that.touchx) < 50) {
        //上滑
        turn = "up";
      }
      //根据方向进行操作
      if (turn == "down") {
        //下滑触发操作
      }
      console.log(turn);
    },
    isRightAnswer(item) {
      if (
        typeof item.userAnswer == "object" &&
        Array.isArray(item.userAnswer)
      ) {
        let answerArr = item.answer.split("-");
        answerArr.sort((a, b) => {
          return a - b;
        });
        item.userAnswer.sort((a, b) => {
          return a - b;
        });
        return answerArr.join("-") === item.userAnswer.join("-");
      } else if (typeof item.userAnswer == "string") {
        return item.answer === item.userAnswer;
      }
    },
    submitExam(e) {
      let score = 0;
      let query = this.query;
      this.problemList.forEach((item, index) => {
        if (
          typeof item.userAnswer == "object" &&
          Array.isArray(item.userAnswer)
        ) {
          let answerArr = item.answer.split("-");
          answerArr.sort((a, b) => {
            return a - b;
          });
          item.userAnswer.sort((a, b) => {
            return a - b;
          });
          if (answerArr.join("-") === item.userAnswer.join("-")) {
            score = score + 1;
          }
        } else if (typeof item.userAnswer == "string") {
          item.answer === item.userAnswer ? (score = score + 1) : "";
        }
      });
      uni.showModal({
        title: "是否交卷",
        content: "交卷后不可再修改了",
        success() {
          uni.navigateTo({
            url:
              "/otherPages/mockExamEnd/index?" +
              utils.mapToUrlQuery({
                score,
                ...query,
              }),
          });
        },
        fail() {},
      });
    },
    goBeforeTopics() {
      if (this.problemListIndex <= 0) {
        uni.showToast({
          title: "到底了",
          icon: "none",
        });
        return;
      }
      this.problemListIndex = this.problemListIndex - 1;
    },
    goNextTopics() {
      if (this.problemListIndex >= this.problemList.length - 1) {
        uni.showToast({
          title: "到底了",
          icon: "none",
        });
        return;
      }
      this.problemListIndex = this.problemListIndex + 1;
    },
    readQuestion(e) {
      let globalAudio = utils.wxUtils.getGlobAudio();
      if (globalAudio) {
        globalAudio.src = e;
        globalAudio.stop();
        globalAudio.play();
      }
    },
    confirmMult(e) {
      this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
      if (
        JSON.stringify(
          this.problemList[this.problemListIndex].answer.split("-").sort()
        ) ===
        JSON.stringify(
          this.problemList[this.problemListIndex].userAnswer.sort()
        )
      ) {
        this.trueNum++;
      } else {
        this.falseNum++;
        api.exam.studentQuestionWrong({
          questionId: this.problemList[this.problemListIndex].id,
          carType: this.gsMap[this.query.gs],
          km: this.query.subject === "4" ? "科目四" : "科目一",
        });
      }
      // this.problemList[this.problemListIndex]
    },
    changeCheckboxGroup(e) {
      //console.log(e);
      // this.$set()
      // #ifdef MP-WEIXIN
      this.$set(
        this.problemList[this.problemListIndex],
        "userAnswer",
        e.detail
      );
      this.problemList[this.problemListIndex].optsArr.forEach((item) => {
        if (e.detail.includes(item.value)) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      //#endif
      // #ifdef MP-TOUTIAO
      this.$set(
        this.problemList[this.problemListIndex],
        "userAnswer",
        e.detail
      );
      this.problemList[this.problemListIndex].optsArr.forEach((item, index) => {
        if (e.detail.includes(item.value)) {
          item.selected = true;
          this.$set(
            this.problemList[this.problemListIndex].optsArr[index],
            "selected",
            true
          );
        } else {
          item.selected = false;
          this.$set(
            this.problemList[this.problemListIndex].optsArr[index],
            "selected",
            false
          );
        }
      });
      //#endif
      if (
        this.problemList[this.problemListIndex].answer
          .split("-")
          .sort()
          .toString() ===
        this.problemList[this.problemListIndex].userAnswer.sort().toString()
      ) {
        this.trueNum = this.trueNum + 1;
      } else {
        this.falseNum = this.falseNum + 1;
      }
    },
    changeRadioGroup(e) {
      console.log(e, "changeRadioGroup");
      // #ifdef MP-WEIXIN
      this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
      this.$set(
        this.problemList[this.problemListIndex],
        "userAnswer",
        e.detail.value
      );
      e.detail.selected = true;
      this.$set(
        this.problemList[this.problemListIndex].optsArr,
        e.detail.index,
        e.detail
      );
      e.detail.value === this.problemList[this.problemListIndex].answer
        ? (this.trueNum = this.trueNum + 1)
        : (this.falseNum = this.falseNum + 1);
      //#endif

      // #ifdef MP-TOUTIAO
      this.$set(this.problemList[this.problemListIndex], "isCompleted", true);
      this.$set(
        this.problemList[this.problemListIndex],
        "userAnswer",
        e.detail
      );
      this.problemList[this.problemListIndex].optsArr.forEach((item, index) => {
        if (e.detail === item.value) {
          item.selected = true;
          this.$set(
            this.problemList[this.problemListIndex].optsArr[index],
            "selected",
            true
          );
        } else {
          item.selected = false;
          this.$set(
            this.problemList[this.problemListIndex].optsArr[index],
            "selected",
            false
          );
        }
      });
      if (e.detail.value === this.problemList[this.problemListIndex].answer) {
        this.trueNum = this.trueNum + 1;
      } else {
        this.falseNum = this.falseNum + 1;
        api.exam.studentQuestionWrong({
          questionId: this.problemList[this.problemListIndex].id,
          carType: this.gsMap[this.query.gs],
          km: this.query.subject === "4" ? "科目四" : "科目一",
        });
      }

      //#endif
    },
    changeCheckbox(e) {
      //specify
      // console.log(e);
    },
    numberToLetter(index) {
      index = Number(index);
      return String.fromCharCode(index + 65);
    },
  },
  onLoad(query) {
    let that = this;
    this.query = query;
    this.isGetQuery = true;
    // api.exam
    //   .studentQuestionInfoList({
    //     ...this.query,
    //   })
    //   .then((res) => {
    //     res.rows.forEach((element) => {
    //       element.optsArr = [];
    //       element.opts.split("-").forEach((item, index) => {
    //         if (element.questionType == 3) {
    //           element.optsArr.push({
    //             selected: false,
    //             value: item,
    //             index: index,
    //             isAnswer: element.answer.split("-").includes(item),
    //           });
    //         } else {
    //           element.optsArr.push({
    //             selected: false,
    //             value: item,
    //             index: index,
    //             isAnswer: item === element.answer,
    //           });
    //         }
    //       });
    //       element.isCompleted = false;
    //       element.userAnswer = [];
    //     });
    //     that.problemListTotal = res.total;
    //     that.problemList = res.rows;
    //   });
  },
  computed: {
    //liceCar=1&liceTruck=&liceBus=&liceMoto=&name=科目一&cert=C1/C2/C3&vehicle=轿车&subject=1&title=顺序练习&sort=3
    navTitle() {
      let subjectName = this.query.subject == 1 ? "科目一" : "科目四";
      if(this.query.oldSubject=='k12'){
        return `(${this.query.cert})/满分学习/${this.query.title}/${this.query.chapter}`;
      }
      return `(${this.query.cert})/${subjectName}/${this.query.title}/${this.query.chapter}`;
    },
  },
  watch: {
    problemListIndex: {
      handler(newValue, oldValue) {},
      immediate: true,
    },
  },

  components: {
    mDoTopic,
    navBar,
    explainJs,
    tabbar,
    mRadio,
    mRadioGroup,
    mCheckbox,
    mCheckboxGroup,
  },
};
</script>

<style lang="scss" scoped>
.select-problem {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-content: flex-end;
  align-items: flex-end;
  .problem-index {
    width: 100vw;
    height: 650rpx;
    background: #fff;
    border-radius: 16rpx;
    padding-top: 50rpx;
  }
  .problem-bottom {
    width: 100%;
    display: flex;
    height: 80rpx;
    .problem-bottom-sure {
      width: 50%;
      height: 100%;
      border-right: 2rpx solid #d8d8d8;
      border-top: 2rpx solid #d8d8d8;
      text-align: center;
      color: #498ef5;
      line-height: 80rpx;
    }
    .problem-bottom-close {
      width: 50%;
      height: 100%;
      color: red;
      text-align: center;
      border-top: 2rpx solid #d8d8d8;
      line-height: 80rpx;
    }
  }
  .problem-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    padding: 0rpx 30rpx;
    .problem-header-left {
      display: flex;

      .problem-dui {
        display: flex;
        align-content: center;
        align-items: center;
      }
      .problem-cuo {
        display: flex;
        align-content: center;
        align-items: center;
      }
    }
    .problem-header-right {
      display: flex;
      align-content: center;
    }
  }
  .problem-body {
    height: 480rpx;
    padding-top: 30rpx;
    overflow-y: scroll;

    .problem-listBody {
      display: inline-block;
      overflow: hidden;
      .problem-listItem {
        display: inline-block;
        width: 99rpx;
        height: 99rpx;
        line-height: 100rpx;
        text-align: center;
        border-radius: 50%;
        border: 2rpx #d8d8d8 solid;
        margin-bottom: 15rpx;
        margin-left: 13rpx;
        margin-right: 13rpx;
      }
      .problem-listItem_dui {
        background: #01c18d;
      }
      .problem-listItem_cuo {
        background: red;
      }
    }
  }
}
.tabbar-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  align-content: space-around;
  align-items: space-around;
}
.divider {
  width: 100%;
  height: 24rpx;
  background-color: #f2f3f5;
}
.h-full {
  height: 100%;
}
.inline-block {
  display: inline-block;
}
.flex-center {
  display: flex;
  justify-content: center;
  width: 100%;
}
.function-list {
  width: 100%;
  font-size: 13px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 15px;
  box-sizing: border-box;
  .function-item {
    margin-bottom: 20px;
    width: 30%;
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
.box {
  width: 100%;
  height: 100vh;
  background: #fff;
  .look-answer {
    margin-top: 30rpx;
    padding: 0 12rpx;
    background: #f2f3f5;
    font-size: 36rpx;
    line-height: 62rpx;
  }
  .last-subject {
    transform: rotate(90deg);
  }

  .problem-select {
    display: flex;
    align-content: center;
    align-items: center;
    margin-top: 15rpx;
    padding-left: 30rpx;
  }
  .problem-box {
    padding: 15rpx;
    padding-bottom: 70rpx;
    background: #fff;
    ::v-deep .van-checkbox {
      padding-bottom: 15rpx;
    }
    ::v-deep .van-radio {
      padding-bottom: 15rpx;
    }
    .problem-type {
      padding-left: 10rpx;
      padding-right: 10rpx;
      padding-top: 4rpx;
      padding-bottom: 4rpx;
      font-size: 24rpx;
      border-radius: 16rpx 16rpx 0 16rpx;
      background: #498ef5;
      margin-right: 10rpx;
      color: #fff;
      font-size: 32rpx;
    }
    .problem-issue {
      font-size: 42rpx;
      font-weight: 600;
    }
    .problem-ops {
      margin-top: 30rpx;
      padding-left: 30rpx;
      .problem-checkbox {
        height: 100rpx;
      }
    }
    .problem-op {
      width: 75rpx;
      height: 75rpx;
      line-height: 75rpx;
      border-radius: 50%;
      text-align: center;
      overflow: hidden;
      background: #fff;
      box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.16);
    }
    .problem-op_green {
      width: 75rpx;
      height: 75rpx;
      line-height: 75rpx;
      border-radius: 50%;
      text-align: center;
      overflow: hidden;
      background: #01c18d;

      box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.16);
    }
    .problem-opAnswer {
      font-size: 16px;
      margin-left: 12rpx;
    }
    .problem-op_selected {
      background: #498ef5;
    }
    .problem-img {
      width: 100%;
      margin-top: 20rpx;
      display: flex;
      justify-content: center;
      image {
        margin: 0 auto;
      }
    }
  }
}
</style>