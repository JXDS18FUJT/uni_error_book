<template>
	<view class="bg">
		<view :style="{
			'height':statusBarHeight+'px',
			'width':'100%'
		}"></view>
		<userInfoHead>

		</userInfoHead>
		<!-- <text>hello</text> -->
		<view style="width: 100%;" class="">
			<swiper indicator-color="#fff" autoplay circular
				style="height: 200rpx;background-color: #3AC770;padding-top: 16rpx;">
				<swiper-item class="swiperBanner">
					<image class="banner" src="https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/banner.png"></image>
				</swiper-item>

			</swiper>
		</view>

		<view class="carType">
			<view style="position: relative;width: 100%;display: flex;">
				<view :style="'left:' + 172 * carTypeIndex + 'rpx'" class="carType-point">
					<view style="width: 60rpx;margin: 0 auto;background-color: #fff;height: 50%;border-radius: 4rpx;"
						class="">
					</view>
				</view>
				<view v-for="(item, index) in carType" @click="changeVehicle(item)" :key="index">
					<view @click="() => {
		            carTypeIndex = index;
		          }
		          " class="col" :class="{
		            col_selected: carTypeIndex == index,
		          }">
						<image :class="['carType-img' + index]" :src="item.img"></image>
						<view class="h6"></view>
						<text class="carType-title">{{ item.title }}</text>
						<text class="carType-typeName">{{ item.typeName }}</text>
					</view>
				</view>
			</view>

		</view>

		<view class="subject">
			<view class="subject-tab">
				<view class="subject-slider" :style="{
		          left: active * 150 + 'rpx'
		        }"></view>
				<view @click="() => {
		          active = 0;
		          tabQuery.subject = 1;
		          tabQuery.oldSubject = ''
		        }
		        " class="subject-tabs">
					<span v-if="active == 0">科目一</span>
					<span style="color: #89E6A3" v-else>科目一</span>
				</view>
				<view @click="() => {
		          active = 1;
		          tabQuery.subject = 1;
		          tabQuery.oldSubject = ''
		        }
		        " class="subject-tabs">
					<span v-if="active == 1">科二三</span>
					<span style="color: #89E6A3" v-else>科二三</span>
				</view>
				<view @click="() => {
		          active = 2;
		          tabQuery.subject = 4;
		          tabQuery.oldSubject = ''
		        }
		        " class="subject-tabs">
					<span v-if="active == 2">科目四</span>
					<span style="color: #89E6A3" v-else>科目四</span>
				</view>
				<view @click="() => {
		          active = 3;
		          tabQuery.subject = '';
		          tabQuery.oldSubject = 'k12'
		        }
		        " class="subject-tabs">
					<span v-if="active == 3">满分</span>
					<span style="color: #89E6A3" v-else>满分</span>
				</view>
			</view>
		</view>

		<view>
			<scroll-view @scroll="scrollTabs" class="tab" scroll-with-animation
				:scroll-into-view="'tab-container' + active" enhanced style="white-space: nowrap" :scroll-x="true">
				<view id="tab-container0" style="display: inline-block; white-space: nowrap;width: 100%;">
					<view class="tab-container">
						<text style="color: #ffffff;">{{active}}</text>
						<!-- <tab-left :subject="1" :query="tabQuery" :leftList="leftList1"></tab-left>
						<tab-center :subject="1" :query="tabQuery" :centerList="centerList1"></tab-center>
						<tab-right :subject="1" :query="tabQuery" :rightList="rightList1"></tab-right> -->
					</view>

				</view>
				<view id="tab-container1"
					style="padding-top: 16rpx;display: inline-block; white-space: nowrap;width: 100%;">
					<!-- <teacherVideo v-if="active == 1"></teacherVideo>
					<view style="width: 100%;" v-else></view> -->
					<view class="tab-container">
						<text style="color: #ffffff;">{{active}}</text>
					</view>

				</view>
				<view id="tab-container2" style="display: inline-block; white-space: nowrap;width: 100%;">
					<!-- <view class="tab-container">
						<tab-left :query="tabQuery" :subject="4" :leftList="leftList4"></tab-left>
						<tab-center :query="tabQuery" :subject="4" :centerList="centerList4"></tab-center>
						<tab-right :query="tabQuery" :subject="4" :rightList="rightList4"></tab-right>
					</view> -->
					<view class="tab-container">
						<text style="color: #ffffff;">{{active}}</text>
					</view>
				</view>
				<view id="tab-container3" style="display: inline-block; white-space: nowrap;width: 100%;">
					<!-- 	<view class="tab-container">
						<tab-left :query="tabQuery" :subject="12" :leftList="leftList12"></tab-left>
						<tab-center :query="tabQuery" :subject="12" :centerList="centerList12"></tab-center>
						<tab-right :query="tabQuery" :subject="12" :rightList="rightList12"></tab-right>
					</view> -->
					<view class="tab-container">
						<text style="color: #ffffff;">{{active}}</text>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>

</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue';
	import topbar from '../../components/topbar/topbar.vue';
	import userInfoHead from './components/userInfoHead/userInfoHead.vue';
	const msg = ref('hello world')
	const systemInfo = uni.getSystemInfoSync()



	const statusBarHeight = ref(systemInfo.statusBarHeight)
	const carTypeIndex = ref(0)
	const active = ref(0)
	const resetTab = ref(true)
	const carType = [
		{
			img: "https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/xc.png",
			typeName: "小车",
			title: "C1/C2/C3",
		},
		{
			img: "https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/kc.png",
			typeName: "客车",
			title: "A1/A3/B1",
		},
		{
			img: "https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/hc.png",
			typeName: "货车",
			title: "A2/B2",
		},
		{
			img: "https://ndata.zzxcx.net/qcxj/mp-wx/carVideo/mtc.png",
			typeName: "摩托车",
			title: "D/E/F",
		},
	]
	const tabQuery = reactive({
		gs: "xc",
		name: "科目一",
		model: "cart",
		cert: "C1/C2/C3",
		vehicle: "小车",
		subject: 1,
		title: "顺序练习",
		sort: 3,
		oldSubject: undefined,
	})


	let tabRects = ref<UniApp.NodeInfo[]>([])

	// 计算每个tab的位置（宽度 + offsetLeft）
	const calcTabs = () => {
		uni.createSelectorQuery()
			.in(this)
			.selectAll('.tab-container')
			.boundingClientRect(rects => {
				console.log(rects)
				tabRects.value = rects as UniApp.NodeInfo[]
			})
			.exec()
	}
	const changeVehicle = (item : any) => {
		tabQuery.vehicle = item.typeName;
		tabQuery.cert = item.title;
		switch (item.typeName) {
			case "小车":
				tabQuery.gs = "xc";
				tabQuery.model = "cart";
				break;
			case "货车":
				tabQuery.gs = "hc";
				tabQuery.model = "truck";
				break;
			case "客车":
				tabQuery.gs = "kc";
				tabQuery.model = "bus";
				break;
			case "摩托车":
				tabQuery.gs = "mtc";
				tabQuery.model = "mtc";
				break;
			default:
				break;
		}
	}

	// 滚动事件
	const scrollTabs = (e) => {
		const scrollLeft = e.detail.scrollLeft


		for (let i = 0; i < tabRects.value.length; i++) {
			const tab = tabRects.value[i];
			const next = tabRects.value[i + 1]
			if (!next || scrollLeft < next.left - tab.width / 2) {
				switch (i) {
					case 0:

						tabQuery.subject = 1;
						break;
					case 1:

						tabQuery.subject = 1;
						break;
					case 2:

						tabQuery.subject = 4;
						break;
					case 3:

						tabQuery.subject = undefined;
						tabQuery.oldSubject = 'k12';
						break;
					default:
						break




				}
				active.value = i
				break


			}
		}
	}

	// const scrollTabs = (e) => {

	// 	console.log(e);
	// 	//求百位数相同即可
	// 	if (Math.floor(e.detail.scrollLeft / 100) * 100 == 0) {
	// 		active.value = 0;
	// 		tabQuery.subject = 1;

	// 	}
	// 	else if (Math.floor(e.detail.scrollLeft / 100) * 100 > 0 && Math.floor(e.detail.scrollLeft / 100) * 100 < Math.floor(e.detail.scrollWidth / 4 * 1 / 100) * 100) {
	// 		active.value = 1;
	// 		tabQuery.subject = 1;
	// 	}
	// 	else if (Math.floor(e.detail.scrollLeft / 100) * 100 > Math.floor(e.detail.scrollWidth / 4 * 1 / 100) * 100 && Math.floor(e.detail.scrollLeft / 100) * 100 < Math.floor(e.detail.scrollWidth / 4 * 2 / 100) * 100) {
	// 		active.value = 2;
	// 		tabQuery.subject = 4;
	// 	}
	// 	else if (Math.floor(e.detail.scrollLeft / 100) * 100 > Math.floor(e.detail.scrollWidth / 4 * 2 / 100) * 100 && Math.floor(e.detail.scrollLeft / 100) * 100 < Math.floor(e.detail.scrollWidth / 4 * 3 / 100) * 100) {
	// 		active.value = 3;
	// 		tabQuery.subject = undefined;
	// 		tabQuery.oldSubject = 'k12';
	// 	}

	// }

	onMounted(() => {
		calcTabs()
	})
</script>

<style lang="scss">
	.bg {
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		overflow-x: hidden;

		.msg {
			font-size: 36rpx;
		}

		.carType {
			width: 750rpx;
			height: 152rpx;
			background: #3AC770;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			padding-top: 16rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 16rpx;
			position: relative;

			.carType-point {
				width: 172rpx;
				height: 12rpx;
				position: absolute;
				bottom: -15rpx;
			}

			.col_selected {
				opacity: 1 !important;
			}

			.col {
				width: 172rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				align-content: center;
				justify-content: center;
				opacity: 0.75;

				.carType-img0 {
					width: 72rpx;
					height: 72rpx;
				}

				.carType-img1 {
					width: 72rpx;
					height: 72rpx;
				}

				.carType-img2 {
					width: 72rpx;
					height: 72rpx;
				}

				.carType-img3 {
					width: 72rpx;
					height: 72rpx;
				}

				.carType-typeName {
					color: #fff;
					font-size: 26rpx;
				}

				.carType-title {
					color: #fff;
					font-size: 26rpx;
				}
			}
		}

		.subject {
			width: 100%;
			display: flex;
			justify-content: center;
			margin-top: 20rpx;

			.subject-tab {
				width: 600rpx;
				height: 80rpx;
				background: #E0F2E5;
				border-radius: 46rpx;
				position: relative;
				display: flex;

				.subject-tabs {
					width: 150rpx;
					height: 100%;
					line-height: 80rpx;
					color: #fff;
					text-align: center;
					font-size: 34rpx;
					z-index: 11;
				}

				.subject-slider {
					border-radius: 46rpx;
					background: #3AC770;
					width: 150rpx;
					height: 100%;
					position: absolute;

					z-index: 10;
				}
			}
		}

		.swiperBanner {
			width: 690rpx;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;

			.banner-ad {
				padding: 30rpx;
			}
		}

		.banner {
			width: 690rpx;
			height: 200rpx;
		}

		.tab {
			width: 750rpx;
			margin: 0 auto;
			display: inline-block;
			font-size: 36rpx;
			white-space: nowrap;

			#tabs {
				height: 800rpx;
			}

			.custom-tabs {
				::v-deep .van-tabs__line {
					background: #498ef5;
				}
			}

			.tab-container {
				// width: 750rpx;


				display: flex;
				justify-content: space-between;
				align-content: flex-start;
				align-items: flex-start;
				padding: 0 30rpx;
				min-height: 30rpx;
				background-color: #3AC770;
				flex: 0;
			}
		}
	}
</style>