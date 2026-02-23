<template>
  <view>
    <slot v-if="useIconSlot" name="icon" />
    <icon  v-else></icon>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    useIconSlot: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>