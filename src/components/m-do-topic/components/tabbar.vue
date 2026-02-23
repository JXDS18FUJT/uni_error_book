<template>
  <view
    class="box"
    :style="{
      height: height
    }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    name() {},
  },
  props: {
    height: {
      type: String,
      default: "0rpx",
    },
  },
};
</script>

<style lang="scss" scoped>
.box{
    width: 100%;
    display:flex;
    justify-content: space-between;
    overflow: scroll;
    position: fixed;
    bottom: 0;
    font-size: 14px;
    background: #fff;
    padding:0 30rpx;
    border-top: 2rpx solid #d8d8d8;
    padding-top: 5rpx;


}


</style>