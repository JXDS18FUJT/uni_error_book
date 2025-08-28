<template>
	<view class="iPhoneX">
		<view class="part1">
			<view style="position:relative;">
				<div @click="goBuyVip" v-if="buyVipVisible" class=""
					style="z-index: 100;position: absolute;top: 0;left: 0;width: 750rpx;height: 225px;background-image: url('https://ndata.zzxcx.net/ctjk/mp-wx/reality/buy_vip_bg2@2x.png');background-size: 100% 100%;">
					<img style="width: 216rpx;margin-left: 267rpx;margin-top: 160px;" mode="widthFix"
						src="https://ndata.zzxcx.net/ctjk/mp-wx/reality/buy_vip_button2@2x.png" />
				</div>
				<video @timeupdate="videoTimeUpdate" id="first" autoplay ad-unit-id="adunit-8bb3780fd279bfcb"
					style="width: 100%;" :src="currentVideoUrl"></video>
			</view>
			<view class="head1">
				<view class="left-head1">
					专项精品课

				</view>
				<view v-if="query.questionDb == '0'"></view>
				<view v-else @click="scrollBottom" class="right-head1">
					我的题库<van-icon name="arrow" />
				</view>
			</view>
			<view class="list1">
				<view v-for="(item, index) in videoList" :key="index" class="item">
					<view @click="playVideo(item, index)" class="left">
						<div style="width: 204rpx;position: absolute;top: 84rpx;text-align: center;font-size:34rpx;font-weight:bold"
							class="">第{{ index + 1 }}节</div>
						<img style="width: 204rpx;height: 256rpx;"
							src="https://ndata.zzxcx.net/ctjk/mp-wx/reality/video_cover2.png" />
					</view>
					<view @click="playVideo(item, index)" class="right">
						<view class="line1" style="font-size: 34rpx">
							{{ item.chapterTitle }}
						</view>
						<view class="line2">先听课后练习<text style="color: red;">→通过率极高</text>
							<image style="width:40rpx;padding-left: 10rpx;" mode="widthFix"
								src="data:image/png;base64,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" />
						</view>
						<view class="line3">
							<view style="font-size: 34rpx;color: red;"> <text
									style="font-size: 34rpx;color: red;padding-left: 15rpx;">开启轻松学之旅</text> </view>
							<view
								style="width: 175rpx;height: 100%;background-color: #498EF5;border-radius: 34rpx;display: flex;justify-content: center;align-items: center;"
								class="">
								<image style="width: 20rpx;" mode="widthFix" src="/static/icon/play@2x.png" />
								<text style="font-size: 24rpx;color: #fff;padding-left: 5rpx;">点击播放</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="query.questionDb !== '0'" class="part2">
			<view class="head2">
				<text>视频同款题库</text>
			</view>
			<view id="buyVip500" class="bank2">
				<image mode="widthFix" style="width: 100%;"
					src="https://ndata.zzxcx.net/ctjk/mp-wx/reality/vipSubjects_bg@2x.png"></image>


				<!-- 已购买时候的真按钮 -->
				<view class="bank2-btn">
					<navigator hover-stop-propagation
						:url="'/otherPages/exerciseReality/index?questionDb=' + query.questionDb"
						style="border-radius: 20rpx;width: 292rpx;height: 58rpx;line-height: 58rpx;background-color: #0050FD;">
						点击查看竖屏题库
					</navigator>
					<navigator hover-stop-propagation
						:url="'/otherPages/realExercise500/test?questionDb=' + query.questionDb"
						style="border-radius: 20rpx;width: 292rpx;height: 58rpx;line-height: 58rpx;background-color: #0050FD;">
						点击查看横屏题库
					</navigator>
				</view>
			</view>
			<!-- <view @click="buyVip500" v-if="!vipInfo.fiveInt" class="btns2">
	                <view style="width: 50%;position: relative;">
	                    <view
	                        style="position: absolute;font-size: 54rpx;color: #FFF08A;width: 375rpx;text-align: center;height:162rpx;padding-top: 35rpx;"
	                        class="">￥9.9</view>
	                    <image style="width: 100%;" mode="widthFix"
	                        src="https://ndata.zzxcx.net/ctjk/mp-wx/reality/btn_bg@2x.png"></image>
	                </view>
	                <view style="width: 50%;position: relative;">
	                    <view
	                        style="position: absolute;font-size: 54rpx;color: #FFF08A;width: 375rpx;text-align: center;height:162rpx;padding-top: 35rpx;"
	                        class="">限时优惠</view>
	                    <image style="width: 100%;" mode="widthFix"
	                        src="https://ndata.zzxcx.net/ctjk/mp-wx/reality/btn_bg@2x.png"></image>
	                </view>
	
	            </view> -->
		</view>
		<van-dialog title="请选择哪种视频" @cancel="() => {
	            selectCoachTypeVisible = false
	            bindDefaultCoachId()
	        }" @confirm="() => {
	            vipCoachBindVisible = true
	            selectCoachTypeVisible = false
	        }" :show="selectCoachTypeVisible" confirmButtonText="专属教练" cancelButtonText="官方教练"
			confirm-button-color="#8A2BE2" show-cancel-button>

		</van-dialog>
		<van-dialog use-slot title="请输入专属教练ID" :show="vipCoachBindVisible" @confirm="bindCoachId" @close="() => {
	            vipCoachBindVisible = false
	        }">
			<div style="padding: 0 30rpx;">
				<van-field type="number" :value="coachId" placeholder="请输入ID" @change="changeCoachId" />
			</div>

		</van-dialog>
		<view class="wxad">
			<ad ad-type="video" :ad-intervals="100" unit-id="adunit-8eb44bbd7e3147d4"></ad>
		</view>
		<view style="width: 100%;height: 48px;"></view>
	</view>
</template>

<script lang="ts" setup>
	import { reactive, ref } from 'vue';
	const query = {
		questionDb: 0
	}
	const system = uni.getStorageSync('system')
	const vipInfo = reactive({
		five: null,
		fiveInt: null,
		id: null,
		sign: null

	})
	const userInfo = uni.getStorageSync('userInfo')
	const coachId = ref('')
	const buyVipVisible = ref(false)

	const autoplay = ref(true)
	const exclCoachVisible = ref(false)
	const selectCoachTypeVisible = ref(false)
	const vipCoachBindVisible = ref(false)

	const videoList = ref([]),
	const currentVideoUrl = ref('')
	const goBuyVip = () => {
		uni.showModal({
			title: "激活视频",
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: "/otherPages/buyVip/index"
					})
				}
			}
		})
	}
	const changeCoachId = (e) => {
		this.coachId = e.detail
		console.log(e)

	}
	const scrollBottom = () => {
		uni.pageScrollTo({
			selector: "#buyVip500",
			duration: 300
		})

	}
	const videoTimeUpdate = (e) => {

	}
</script>

<style lang="scss">
	.part1 {
		.head1 {
			width: 100%;
			background-color: #fff;
			height: 136rpx;
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: space-between;

			.left-head1 {
				font-size: 38rpx;
				padding-left: 15rpx;

			}

			.right-head1 {
				color: #0A1A33;
				padding-right: 60rpx;
				font-size: 36rpx;
			}

		}

		.list1 {
			padding-left: 30rpx;
			padding-right: 30rpx;
			width: 100%;
			background-color: #fff;


			.item {
				padding-top: 30rpx;
				padding-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: 2rpx solid #E8E8E8;

				.left {
					width: 204rpx;
					height: 256rpx;
					position: relative;
				}

				.right {
					width: 460rpx;
					font-weight: bold;

					.line1 {
						width: 460rpx;
						word-break: break-all;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 这里是超出几行省略 */
						overflow: hidden;


					}

					.line2 {
						width: 100%;
						height: 68rpx;
						line-height: 68rpx;
						background: linear-gradient(270deg, #FFE7B8 0%, #FDC67F 100%);
						border-radius: 10rpx 10rpx 10rpx 10rpx;
						color: #BC700C;
						text-align: center;
						font-size: 28rpx;
						display: flex;
						align-items: center;
						align-content: center;
						justify-content: center;
						margin-top: 12rpx;
					}

					.line3 {
						margin-top: 20rpx;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						align-content: center;
					}


				}
			}
		}

	}

	.part2 {
		width: 100%;
		height: auto;
		background-color: #fff;

		.head2 {
			padding: 0 30rpx;
			background-color: #fff;
			width: 100%;
			height: 112rpx;
			line-height: 112rpx;
		}

		.bank2 {
			padding: 0 30rpx;
			position: relative;
			width: 750rpx;


			.bank2-btn {
				display: flex;
				justify-content: space-between;
				position: absolute;
				bottom: 28rpx;
				padding: 0 24rpx;
				width: 100%;
				color: #fff;
				text-align: center;
				width: 690rpx;

			}
		}

		.btns2 {
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
		}

	}
</style>