<template>
	<div class="bg">
		<van-dialog-plus use-slot show-cancel-button  title="请输入抖音或拼多多订单号" :show="activeCodeVisible" @confirm="bindOrderId"
			@close="() => {
                activeCodeVisible = false
            }">
			<div style="padding: 0 30rpx;">
				<van-field type="number" :value="orderId" placeholder="请输入抖音或拼多多订单号" @change="changeOrderId" />
			</div>

		</van-dialog-plus>
		<div class="code">
			<div class="left">

			</div>
			<div @click="() => { activeCodeVisible = !activeCodeVisible }" class="right">
				<image style="width: 30rpx;margin-right: 10rpx;" mode="widthFix" :src="activeCode" />
				<text>激活课程</text>
			</div>

		</div>
		<div class="list" :key="index" v-for="(item, index) in list">
			<view @click="goReality(item)">
				<view class="list-item">
					<view class="list-item-top">
						<img style="width: 32rpx;" mode="widthFix" src="@/assets/img/course_teacher.png">
						<text style="font-size: 32rpx;color: #5C6066;padding-left: 8rpx;">{{ item.teacherName }}</text>
					</view>
					<view class="list-item-bottom">
						<img style="width: 248rpx;" mode="widthFix" :src="item.coverImageUrl" />
						<view class=""
							style="display: flex;flex-direction: column;justify-content: space-between;padding-left: 24rpx;">
							<text
								style="font-size: 30rpx;color: #5C6066;padding-left: 8rpx;margin-bottom: 16rpx;">{{ item.title }}</text>
							<view style="font-size: 28rpx;margin-bottom: 16rpx;">{{ item.description }}</view>
							<view style="font-size: 26rpx;color: #8A9099;">共{{ item.videoCount }}节</view>
						</view>
					</view>

				</view>
			</view>

		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import api from '@/api'
	import activeCode from '@/assets/img/active_code@2x.png'


	// 1️⃣ 状态
	const list = ref([])
	const orderId = ref('')
	const activeCodeVisible = ref(false)

	// 2️⃣ 方法
	const bindOrderId= function(e) {
		
		api.buy.studentJyPurchasesBindUserByTidOnVipCode({
			tid: orderId.value
		}).then(res => {
			uni.showToast({
				title: res.msg,
				icon: 'none'
			})

			return api.carVideo.studentJyCoursePurchasedCoursesList({
				v: Date.now()
			})
		}).then(res => {
			list.value = res.rows
		})
	}

	function changeOrderId(e) {
		
		orderId.value = e.detail
	}

	function goReality(item) {
		uni.navigateTo({
			url: `/pages/reality/index?courseId=${item.courseId}&questionDb=${item.questionDb}`,
			fail(err) {
				console.log(err)
			}
		})
	}

	// 3️⃣ mounted（如后续需要）
	// import { onMounted } from 'vue'
	// onMounted(() => {
	//   api.carVideo.studentJyCoursePurchasedCoursesList({
	//     v: Date.now()
	//   }).then(res => {
	//     list.value = res.rows
	//   })
	// })
</script>

<style lang="less" scoped>
	.bg {
		background-color: #fff;
		width: 750rpx;
		min-height: 100vh;
		overflow-y: scroll;
	}

	.code {
		display: flex;
		justify-content: space-between;
		padding-top: 16rpx;

		.left {}

		.right {
			display: flex;
			align-items: center;
			font-size: 30rpx;
			padding-right: 60rpx;
			color: #5C6066;
		}
	}

	.list {
		width: 690rpx;
		margin: 0 auto;

		.list-item {
			padding-top: 16rpx;
			padding-bottom: 16rpx;
			border-bottom: 1rpx solid #d8d8dd;

			.list-item-top {
				display: flex;
				align-items: center;
				align-content: center;

			}

			.list-item-bottom {
				display: flex;
				padding-top: 10rpx;

			}
		}



	}
</style>