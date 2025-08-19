<template>
	<view class="tabbar">
		<view :style="{ 'padding-top': topheight.top + 'px', 'padding-bottom': '15rpx',width:'100%',textAlign:'center',background:background }">
			<view class="slot-box" :style="{'padding-left': `calc(100vw - ${topheight.right}px)`,width:'100%','padding-right': `calc(100vw - ${topheight.left}px)`,height: topheight.height + 'px'}">
				<slot></slot>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data: () => ({
			topheight: uni.getMenuButtonBoundingClientRect(),
		}),
		props: {
			background: {
				type: String,
				default:'transparent'
			},
		},
		mounted() {
	
		}
	};
</script>

<style lang="scss" scoped>
	.tabbar {
		display: flex;
	
		width: 750rpx;
		.slot-box{
			display: flex;
			align-items: center;
		}
	}
</style>
