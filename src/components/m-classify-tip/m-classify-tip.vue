<template>
  <div style="width:100%">
    <div class="box">
      <div class="line1"><image class="notice" src="https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/notice.png"></image>温馨提示</div>
      <div style="color: #5C6066;" v-for="(item, index) in content" :key="index">
        {{ index + 1 }}.{{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    content: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0 20rpx;
  width: 100%;
  font-size: 32rpx;
  padding-bottom: 15rpx;
  background: #D9FFE7;
  border-radius: 15rpx;
  box-sizing: border-box;

  .line1 {
    color: #0A1A33;
    font-size: 38rpx;
    line-height: 2;
    display: flex;
    align-items: center;
    height:100rpx;
    .notice{
      width: 40rpx;
      height: 40rpx;
      padding-right: 15rpx;
    }
  
  }
}
</style>