<template>
  <div
    :style="{
      height: (menuButton.height+8) + 'px',
    }"
    class="header"
  >

    <div class="header-title">
      <text> {{title}}</text>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      menuButton: {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
      },
    };
  },
  props: {
      title: {
          type: String,
          default:''
      },
      size:{
          type:String,
          default:'16px'
      }
  },
  mounted() {
    this.menuButton = uni.getMenuButtonBoundingClientRect();
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-content: center;
  align-items: center;
  position: relative;
  background: #fff;
  .header-title {
    font-size: 32rpx;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: center;
    vertical-align: baseline;
    display: flex;
    align-content: center;
    align-items: center;
    text {
      vertical-align: text-top;
    }
  }
  .header-left {
    position: absolute;
    left: 0;
    padding-left: 24rpx;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    .arrow-left {
      color: #1989fa;
      vertical-align: middle;
    }
  }
}
</style>