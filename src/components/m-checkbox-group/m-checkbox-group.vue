<template>
  <view class="checkboxGroup">
    <view @tap.native="changeCheckboxGroup">
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
    changeCheckboxGroup(e) {
      if (this.value.includes(e.target.dataset.item.value)) {
        e.detail=this.value.filter((item) => {
          return item !== e.target.dataset.item.value;
        });
      } else {
        e.detail = [...this.value];
        e.detail.push(e.target.dataset.item.value);
      }
      // e.detail = e.target.dataset.item;
      this.$emit("update:value", e.detail);
      this.$emit("change", e);
      console.log(e);
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
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkboxGroup {
}
</style>