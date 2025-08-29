<template>
  <div class="cell-box">
    <van-cell title-class="uni-app-fontsize-paragraph" class="cell" :title="item.title
        " is-link @click="goExercise({

        columnAll: item.columnId,
        chapter: item.title
      })" center v-for="(item, index) in classData" :key="index" :border="false">
      <template #icon>
        <div class="icon">{{ index + 1 }}</div>
      </template>
    </van-cell>
    <div style="height:40rpx;width: 750rpx;"></div>
    <m-classify-tip :content="classifyTip"></m-classify-tip>
  </div>
</template>


<script>
import api from "@/api/index";
import utils from "@/utils/index";
export default {
  data() {
    return {
      classifyTip: ['分类练习,学员可重点学习自己不懂的题目.', '建议新学员直接看软件必考题技巧,快速学习'],
      classData: [],
      query: {},
    };
  },
  onLoad(op) {
    this.query = op;
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
    getClassData() {
      api.exam.studentQuestion2InfoGetQuestionColumn({
        subject: `${(this.query.oldSubject||'k'+this.query.subject)+'_3'}`,
        model: this.query.model
      }).then(res => {
        this.classData = res.data;
      })
      // api.exam
      //   .studentQuestionInfoSelectFlQuestionInfo(this.query)
      //   .then((res) => {
      //     res.data.shift()
      //     this.classData = res.data;
      //   });
    },
  },
  mounted() {
    this.getClassData();
  },
};
</script>

<style lang="scss" scoped>
.cell-box {
  display: flex;
  padding: 30rpx 30rpx;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;

  .cell {
    width: 690rpx;
    border-bottom: 2rpx solid #E8E8E8;
    // box-shadow: 0rpx 0rpx 20rpx rgba(124, 129, 136, 0.2);
    background: #fff;
    font-size: 32rpx;

  }

  //地区
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
    color: #ffffff;
    margin-right: 10rpx;
    color: #fff;
  }
}
</style>
