<template>
	<view class="box">
		<view class="box-left">
			<image class="headImage" v-if="userInfo.headImage" :src="userInfo.headImage"></image>
			<image class="headImage" v-else :src="unLoginHead"></image>
			<view style="margin-left: 10px" class="">{{
        userInfo.nickName ? userInfo.nickName : "新用户"
      }}</view>

		</view>
		<view class="box-right">
			<!-- <view
        @click="goBuyVip"
        v-if="!isVip"
        style="color: #0a1a33; margin-left: 15px"
        >开通VIP</view
      > -->

			<image v-if="isVip" style="margin-left: 8px" class="diamond" :src="diamond"></image>
			<!-- <view style="margin-left: 10px;font-size: 26rpx;" class="">{{
        userInfo.expTime ?  userInfo.expTime : "永久会员"
      }}</view> -->
			<!-- <text v-if="isVip" style="margin-left: 15rpx">vip会员</text> -->
			<!-- <image
        @click="goBuyVip"
        v-if="!isVip"
        style="margin-left: 8px"
        class="diamond"
        :src="diamondGray"
      ></image> -->
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { useUserStore } from '@/store/user';
	import { storeToRefs } from 'pinia'
	import diamond from "@/assets/img/diamond1.png";
	import diamondGray from "@/assets/img/diamondGray.png";
	const unLoginHead = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
	const userStore = useUserStore()

	const { userInfo, isVip } = storeToRefs(userStore)

</script>

<style lang="scss" scoped>
	.box {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		flex-wrap: wrap;
		width: 100%;
		padding: 15rpx 30rpx;
		font-size: 32rpx;

		.box-left {
			display: flex;
			align-content: center;
			align-items: center;
		}

		.box-right {
			display: flex;
			align-content: center;
			align-items: center;
		}
	}

	.diamond {
		width: 36rpx;
		height: 30rpx;
	}

	.headImage {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>