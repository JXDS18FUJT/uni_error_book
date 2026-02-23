<template>
  <view class="radioGroup">
    <view @tap.native="changeRadioGroup">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changeRadioGroup(e) {
      console.log(e);
      e.detail = e.target.dataset.item;
      this.$emit("update:value", e.target.dataset.value);
      this.$emit("change", e);
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
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.radioGroup {
}
</style>