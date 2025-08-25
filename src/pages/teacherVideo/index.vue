<template>
	<view class="teacherVideo iPhoneX">
		<view :style="{
			'height':statusBarHeight+'px',
			'width':'100%'
		}"></view>
		<view class="road">
			<view class="nav">
				<view class="left">科目三真实考场</view>
				<navigator url="/otherPages/myExamRoadVideo/index">
					<view class="right">
						<text>查找我的考场</text>
						<!-- <van-icon color="#3AC770" name="arrow" /> -->
					</view>
				</navigator>
			</view>
			<!-- <view class="mark">
        <navigator url="/otherPages/examRoadVideo/index">
          <view class="button1">社会化驾驶人考场</view>
        </navigator>
        <image mode="widthFix" class="play" :src="bottom_arrrow"></image>
      </view> -->
			<view class="nav2">
				<image mode="widthFix" class="left" src="https://ndata.zzxcx.net/ctjk/mp-wx/teacherVideo/kemu3.png">
				</image>
				<view class="right">
					<view>熟记考场</view>
					<view>考试不用慌</view>
					<navigator url="/otherPages/examRoadVideo/index">
						<view class="look">去看考场</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="subject">
			<view v-for="(item, index) in kemu" :key="index" class="list">
				<view @click="goPath('/otherPages/videoSubjectList/index?subject=' + (index + 1))">
					<image mode="widthFix" class="subject-bg" :src="
              'https://ndata.zzxcx.net/qcxj/mp-wx/teacherVideo/kemubg' +
              (index + 1) +
              '.png'
            "></image>

					<!-- <view class="text1"> 科目{{ item }} </view>
          <view class="text2"> 《视频讲解》 </view> -->
				</view>
			</view>
		</view>
		<!-- <view class="care" :style="careVisible ? '' : 'display:none'">
			<view class="dialog">
				<view class="title">请先关注公众号</view>
				<official-account></official-account>
				<view @click="
            () => {
              careVisible = false;
            }
          " class="confirm">
					关闭</view>
			</view>
		</view> -->
		<!-- <view @click="goVideoAccount()" class="accout">
  <image style="width: 105rpx;height:60rpx;" :src="accountCarIcon"></image>
  <view>
    <span>更多交规汽车知识</span>
    <van-icon name="arrow" />
  </view>

</view> -->
		<!-- <view class="adContainer">
			<ad-custom unit-id="adunit-422e5f4aa411340c"></ad-custom>
		</view> -->
		<view style="width: 100%; height: 48px"></view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const careVisible = ref(false)
	const kemu = ref(["一", "二", "三", "四"])
	const accountCarIcon = "data:image/png;base64,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"
	const systemInfo = uni.getSystemInfoSync()
	const statusBarHeight = ref(systemInfo.statusBarHeight)
	const goPath = (url : string) => {
		uni.navigateTo({
			url,
		});
	}
</script>

<style lang="scss" scoped>
	.adContainer {
		width: 100%;
		margin-top: 16rpx;
	}

	.care {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.35);
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;

		.dialog {
			width: 300px;
			height: calc(84px + 144rpx);
			background: #fff;
			border-radius: 16rpx;
			overflow: hidden;

			.title {
				width: 100%;
				height: 72rpx;
				text-align: center;
				font-size: 32rpx;
				line-height: 72rpx;
				color: #333;
				background: #fff;

				font-weight: bold;
			}

			.confirm {
				width: 100%;
				height: 72rpx;
				text-align: center;
				font-size: 40rpx;
				line-height: 72rpx;
				color: #ee0a24;
				background: #fff;
				letter-spacing: 15px;
			}
		}
	}

	.road {
		width: 690rpx;
		margin: 0 auto;
		height: 390rpx;
		background: #E0F2E5;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		opacity: 1;
		box-sizing: border-box;

		.nav {
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-content: center;
			align-items: center;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-top: 36rpx;

			.left {
				font-size: 36rpx;
				font-weight: bold;
			}

			.right {
				color: #3AC770;
			}
		}

		.mark {
			position: relative;
			padding-left: 30rpx;
			padding-right: 30rpx;
			margin-top: 22rpx;
			width: 328rpx;
			text-align: center;
			font-size: 0;

			.button1 {
				width: 268rpx;
				line-height: 64rpx;
				background: #3AC770;
				border-radius: 20rpx 20rpx 20rpx 20rpx;
				opacity: 1;
				color: #fff;
				font-size: 26rpx;
				text-align: center;
			}

			.play {
				width: 36rpx;
				margin-top: 4rpx;
			}
		}

		.nav2 {
			display: flex;
			width: 100%;
			padding-left: 30rpx;
			padding-right: 30rpx;
			justify-content: space-between;
			margin-top: 20rpx;

			.left {
				width: 408rpx;
			}

			.right {
				width: 200rpx;
				color: #3AC770;
				font-size: 30rpx;
				text-align: center;
				line-height: 1.5;

				.look {
					width: 200rpx;
					line-height: 92rpx;
					background: #3AC770;
					border-radius: 50rpx 50rpx 50rpx 50rpx;
					opacity: 1;
					font-size: 34rpx;
					color: #fff;
					margin-top: 10rpx;
				}
			}
		}
	}

	.subject {
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 40rpx;

		.list {
			position: relative;
			margin-bottom: 15rpx;

			.subject-bg {
				width: 334rpx;
			}

			.text1 {
				font-size: 42rpx;
				color: #fff;
				position: absolute;
				top: 30rpx;
				left: 60rpx;
			}

			.text2 {
				font-size: 42rpx;
				color: #fff;
				position: absolute;
				top: 88rpx;
				left: 40rpx;
			}
		}
	}

	.accout {
		background: linear-gradient(228deg, #00cae0 0%, #0faebf 100%);
		height: 100rpx;
		width: 690rpx;
		margin: 30rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		color: #fff;
		padding: 0 30rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		margin-top: 10rpx;
	}

	.wxad {
		border: none;
		padding: 0 30rpx;
	}
</style>