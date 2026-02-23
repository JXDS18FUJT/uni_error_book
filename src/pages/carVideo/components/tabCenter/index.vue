<template>
	<view class="center">
		<view @click="goPath(item, index)" :class="'center-item' + index" v-for="(item, index) in centerList"
			:key="index">
			<image class="center-img" :src="item.img"></image>

			<text v-if="index == 0" style="color: #0A6345;" class="center-text">
				<text v-if="subject == 4">{{
		          '精选考题' + '\n300题'
		        }}</text>
				<text v-else>{{
		          '精选考题' + '\n500题'
		        }}</text>
			</text>
			<text v-if="index == 1" style="color: #174087;" class="center-text">{{ '模拟考试' +
		        '\n仿真题目' }}</text>
		</view>
	</view>

</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app'
	import { useUserStore } from '@/store/user'
	defineProps({
		centerList: Array as () => ({ text : string, img : string, path : string }[]),
		subject: Number
	})
	let query = {
		title: '',
		sort: '1'
	}
	const platform = uni.getStorageSync('platform')
	onLoad(function (q) {
		console.log(q)
		query = q as {
			title : string;
			sort : string;
		}
	})
	const userStore = useUserStore()
	const goPath = (item : { text : string, img : string, path : string }, index : number) => {

		// const qcjk_set = uni.getStorageSync('qcjk_set')
		const userInfo = userStore.userInfo
		// const userInfo = uni.getStorageSync('userInfo')
		//ios 强制当会员

		if (platform == 'ios') {
			userInfo.isVip = 1

		};



		query.title = item.text;

		switch (query.title) {
			case "分类练习":
				query.sort = '1';
				break;
			case "精选考题":
				query.sort = '2';
				break;
			case "顺序练习":
				query.sort = '3';
				break;
			case "地方练习":
				query.sort = '4';
				break;
		}

		if (
			(item.text == "分类练习" && userInfo.isVip == 0) ||
			(item.text == "新规秘卷" && userInfo.isVip == 0) ||
			(item.text == "真实考场模拟" && userInfo.isVip == 0)
		) {
			if (platform == 'ios') {
				// let storageWebSrc =
				//   process.env.NODE_ENV === "development"
				//     ? "https://nbjk1-h5.zzxcx.net/buyQcjkVip?v="
				//     : "https://nbjk-h5.zzxcx.net/buyQcjkVip?v=";
				// storageWebSrc = storageWebSrc + Date.now();
				// uni.setStorageSync("storageWebSrc", storageWebSrc);
				// wx.navigateTo({
				//   url: "/pages/extraWeb/index?paramsMode=2",
				// });
				wx.navigateTo({
					url: "/otherPages/buyVip/index",
				});
			} else if (platform == 'android') {
				wx.navigateTo({
					url: "/otherPages/buyVip/index",
				});
			} else {
				wx.navigateTo({
					url: "/otherPages/buyVip/index",
				});
			}

			return;
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		display: flex;
		flex-direction: column;
		width: 300rpx;
		margin-top: 60rpx;

		.center-item0 {
			width: 240rpx;
			height: 240rpx;
			background: #8AE6C7;
			position: relative;
			color: #fff;
			text-align: center;
			border-radius: 50%;
			margin: 0 auto;
			margin-bottom: 70rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-content: center;
			justify-content: center;

		}

		.center-item1 {
			width: 240rpx;
			height: 240rpx;
			background: #B1CEFF;
			position: relative;
			color: #fff;
			text-align: center;
			border-radius: 50%;
			margin: 0 auto;
			margin-bottom: 70rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-content: center;

			justify-content: center;

		}

		.center-img {
			width: 72rpx;
			height: 84rpx;
		}

		.center-text {


			width: 100%;
			display: block;
			font-size: 28rpx;
			text-align: center;
		}
	}
</style>