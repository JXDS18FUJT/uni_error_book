<template>
  <view @tap.native="clickRadio" :data-item="item" class="radio">
    <view :data-item="item" class="custom-icon" v-if="useIconSlot">{{
      name
    }}</view>
    <view :data-item="item" style="width: 8px"></view>
    <text :data-item="item">{{ item.value }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    stopClick(e) {
      e.stopPropagation();
    },
    clickRadio(e) {
      console.log(e);
      this.$emit("clickRadio", e);
      e.stopPropagation();
    },
  },
  props: {
    useIconSlot: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "",
    },
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 8px 0;
}
.custom-icon {
  width: 75rpx;
  height: 75rpx;
  line-height: 75rpx;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 4rpx 12rpx rgba(0, 0, 0, 0.16);
}
</style>