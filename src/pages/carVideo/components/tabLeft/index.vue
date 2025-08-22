<template>
	<view class="left">
		<view v-for="(item, index) in leftList" :key="index" class="left-item">
			<image @click="goPath(item, index)" :src="item.img"></image>
			<text>{{ item.text }}</text>
		</view>
	</view>
</template>

<script lang="ts" setup>
	interface tablist {
		img:string
		text:string
		path:string
	}[]
	 defineProps({
		 leftList: Array as () => ({text: string, img: string,path: string}[])
	 })
	const goPath = (item, index) => {
		let query = Object.assign({}, this.query);
		let taht = this
		const qcjk_set = uni.getStorageSync('qcjk_set')
		const userInfo = uni.getStorageSync('userInfo')
		//ios 强制当会员

		if (qcjk_set.QCJK_XCX_IOS_EXAMINE == '1' && this.systemType == 'ios') {
			userInfo.isVip = 1

		};

		console.log(qcjk_set, userInfo)

		query.title = item.text;
		let that = this;
		switch (query.title) {
			case "分类练习":
				query.sort = 1;
				break;
			case "精选考题":
				query.sort = 2;
				break;
			case "顺序练习":
				query.sort = 3;
				break;
			case "地方练习":
				query.sort = 4;
				break;
		}

		if (
			(item.text == "分类练习" && userInfo.isVip == 0) ||
			(item.text == "新规秘卷" && userInfo.isVip == 0) ||
			(item.text == "真实考场模拟" && userInfo.isVip == 0)
		) {
			if (that.phoneType == 1 && that.iosVipOpen == 0) {
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
			} else if (that.phoneType == 2) {
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

<style>
</style>