<template>
  <view class="bg-white">
    <div class="cell-box">
      <view v-for="(item, index) in classData" :key="index">
        <van-cell title-class="uni-app-fontsize-paragraph" value-class="custom-right-cell" class="cell" :title="item.title
        " center :border="false">
          <div class="select">
            <div class="select-item0 uni-app-fontsize-paragraph" @click="() => {
          goExercise({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        ">
              <image style="width: 22rpx; height: 26rpx;padding-right:6rpx;"
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
              <image style="width: 26rpx; height: 26rpx;padding-right:6rpx;"
                src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/danxiang.png"></image>
              单项测试
            </div>
          </div>
          <template #icon>
            <div class="icon">{{ index + 1 }}</div>
          </template>
        </van-cell>
      </view>
    </div>
    <!-- <div style="height: 40rpx; width: 750rpx"></div>
    <div style="padding:0rpx 15rpx">
         <m-classify-tip :content="classifyTip"></m-classify-tip>
    </div> -->
  </view>
</template>

<script>
import api from "@/api/index";
import utils from "@/utils/index";
export default {
  data() {
    return {
      classData: [],
      classifyTip: ["软件题库已同步更新至车管所最新"],
      query: {
        title: "",
        vehicle: "",
      },
    };
  },
  methods: {
    goExercise(extraQuery) {

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
  },
  onLoad(op) {
    this.query = op;
  },
  mounted() {
    api.exam.studentQuestion2InfoGetQuestionColumn({
      subject: `${(this.query.oldSubject||'k'+this.query.subject)}`,
      model: this.query.model
    }).then(res => {
      this.classData = res.data;
    })
  },
};
</script>
<style>
.custom-right-cell {
  flex: 1.8 !important;
}
</style>

<style lang="scss" scoped>
.bg-white {
  background: #ffffff;
}

.cell-box {
  display: flex;
  padding: 10rpx 0rpx;
  flex-wrap: wrap;
  justify-content: space-between;

  >view {
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  .cell {
    width: 100%;

    line-height: 56rpx;

    // box-shadow: 0px 0px 10px rgba(124, 129, 136, 0.2);
  }

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