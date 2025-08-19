<template>
	<view class="bg">
		<view :style="{
			'height':statusBarHeight+'px',
			'width':'100%'
		}"></view>
		<userInfoHead>
			
		</userInfoHead>
	
	</view>
	
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import topbar from '../../components/topbar/topbar.vue';
	import userInfoHead from './components/userInfoHead/userInfoHead.vue';
	const msg = ref('hello world')
	const systemInfo = uni.getSystemInfoSync()

	const statusBarHeight = ref(systemInfo.statusBarHeight)
	
</script>

<style lang="scss">
	.bg {
		display: flex;
		flex-wrap: wrap;
		.msg {
			font-size: 36rpx;
		}
	}
</style>