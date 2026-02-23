<template>
	<view class="iconfont" :class="['icon-'+type]" :style="{color:color,'font-size':size}" @click="onClick()"></view>
</template>

<script>
export default {
  props: {
    /**
      * 图标类型
      */
    type: String,
    /**
      * 图标颜色
      */
    color: String,
    /**
      * 图标大小
      */
    size: {
      type: String,
      default: '24px'
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>
	@import "./iconfont.css";
</style>