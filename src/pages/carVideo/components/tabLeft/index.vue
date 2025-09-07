<template>
	<view class="left">
		<view v-for="(item, index) in leftList" :key="index" class="left-item">
			<image @click="goPath(item, index)" :src="item.img"></image>
			<text>{{ item.text }}</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { onLoad } from '@dcloudio/uni-app';
	import utils from '../../../../utils';
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


	defineProps({
		leftList: Array as () => ({ text : string, img : string, path : string }[]),
		subject: Number
	})
	const goPath = (item : { text : string, img : string, path : string }, index : number) => {

		// const qcjk_set = uni.getStorageSync('qcjk_set')
		const userInfo = uni.getStorageSync('userInfo')
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
		if (item.path) {
			let str = utils.mapToUrlQuery(query);
			console.log(item.path + "?" + str, "str");
			uni.navigateTo({
				url: item.path + "?" + str,
			});
		}
	}
</script>

<style lang="scss">
	.left {
		width: 190rpx;
		font-size: 30rpx;
		padding-top: 25rpx;
		.left-item {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			flex-direction: column;
			align-content: center;
			align-items: center;

			text-align: center;
			height: 160rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}

		.separate {
			width: 100%;
			height: 40rpx;
			background: gray;
		}
	}
</style>