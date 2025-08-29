<template>
  <div class="cell-box">
    <van-cell title-class="uni-app-fontsize-paragraph" class="cell" value-class="custom-right-cell" :title="item.title"
      center v-for="(item, index) in classData" :key="index" :border="false">
      <div class="select">
        <div class="select-item0 uni-app-fontsize-paragraph" @click="() => {
          goExercise({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        ">
          <image style="width: 22rpx; height: 26rpx; padding-right: 6rpx"
            src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/yuyin.png"></image>
          语音讲解
        </div>
        <div @click="() => {
          goExerciseExam({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        " class="select-item1 uni-app-fontsize-paragraph">
          <image style="width: 26rpx; height: 26rpx; padding-right: 6rpx"
            src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/danxiang.png"></image>
          单项测试
        </div>
      </div>
      <template #icon>
        <div class="icon">{{ index + 1 }}</div>
      </template>
    </van-cell>
    <div style="height: 40rpx; width: 750rpx"></div>
    <m-classify-tip :content="classifyTip"></m-classify-tip>
    <view class="wxad">
      <ad :ad-intervals="100" ad-type="video" unit-id="adunit-8eb44bbd7e3147d4"></ad>
    </view>
  </div>
</template>

<script>
import api from "@/api/index";
import utils from "@/utils/index";
export default {
  data() {
    return {
      classifyTip: [
        "地方题库,如有个别地区增加【地方题库】,请选择该区域的【地方题库】+【必学题】学习,如果没有无需学习地方题库",
      ],
      classData: [],
      query: {},
    };
  },
  onLoad(op) {
    this.query = op;
  },
  methods: {
    goExercise(extraQuery) {
      console.log(extraQuery);

      let query = Object.assign({}, this.query);
      if (extraQuery) {
        query = {
          ...query,
          ...extraQuery,
        };
      } else {
      }

      uni.navigateTo({
        url: "/otherPages/exercise/index?" + utils.mapToUrlQuery(query),
      });
    },
    goExerciseExam(extraQuery) {
      console.log(extraQuery);

      let query = Object.assign({}, this.query);
      if (extraQuery) {
        query = {
          ...query,
          ...extraQuery,
        };
      } else {
      }

      uni.navigateTo({
        url: "/otherPages/exerciseExam/index?" + utils.mapToUrlQuery(query),
      });
    },
    getClassData() {
      api.exam.studentQuestion2InfoGetQuestionColumn({
        subject: `k${this.query.subject}_4`,
        model: this.query.model
      }).then(res => {
        this.classData = res.data;
      })
    },
  },
  mounted() {
    this.getClassData();
  },
};
// const {
// 	route: { query },
// 	router: { push },
// } = new RouterBus();
// const classData = ref();
// getTopicClass(query.path as string, query).then(({ data }) => {
// 	//地方专题第一个选项去掉
// 	if (query.title == "地方专题") {
// 		data.data?.shift();
// 	}

// 	classData.value = data.data;
// });
</script>
<style>
.custom-right-cell {
  flex: 1.8 !important;
}
</style>
<style lang="scss" scoped>
.cell-box {
  display: flex;

  flex-wrap: wrap;
  justify-content: space-between;

  .select {
    display: flex;
    flex-direction: row;
    color: white;

    .select-item0 {
      padding: 0 18rpx;
      background: #d6e9fc;
      margin-right: 20rpx;
      border-radius: 8rpx;
      white-space: nowrap;
      font-size: 32rpx;
      color: #498ef5;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 50rpx;
    }

    .select-item1 {
      padding: 0 18rpx;
      background: #d1f5eb;
      white-space: nowrap;
      border-radius: 8rpx;
      font-size: 32rpx;
      color: #01c18d;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 50rpx;
    }
  }

  .cell {
    width: 100%;
    border-bottom: 2rpx solid #e8e8e8;
    font-size: 36rpx;
  }

  .icon {
    width: 40rpx;
    height: 40rpx;
    background: #3AC770;
    border-radius: 50%;
    font-weight: 500;
    font-family: PingFang SC;
    font-size: 26rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: 10rpx;
  }
}
</style>
