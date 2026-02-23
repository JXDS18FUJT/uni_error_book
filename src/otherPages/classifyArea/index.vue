<template>
	<div class="cell-box">
		<van-cell  title-class="custom-title-font" class="cell" value-class="custom-right-cell"
			:title="item.title" center v-for="(item, index) in classData" :key="index" :border="false">
			<div class="select">
				<div class="select-item0 uni-app-fontsize-paragraph" @click="() => {
          goExercise({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        ">
					<image style="width: 22rpx; height: 26rpx; padding-right: 6rpx"
						src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/yuyin.png"></image>
					语音讲解
				</div>
				<div @click="() => {
          goExerciseExam({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        " class="select-item1 uni-app-fontsize-paragraph">
					<image style="width: 26rpx; height: 26rpx; padding-right: 6rpx"
						src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/danxiang.png"></image>
					单项测试
				</div>
			</div>
			<template #icon>
				<div class="icon">{{ index + 1 }}</div>
			</template>
		</van-cell>
		<div style="height: 40rpx; width: 750rpx"></div>
		<m-classify-tip :content="classifyTip"></m-classify-tip>
		<view class="wxad">
			<ad :ad-intervals="100" ad-type="video" unit-id="adunit-8eb44bbd7e3147d4"></ad>
		</view>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive,
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'

	// import api from '@/api' // 如需要
	// import utils from '@/utils' // 按你的实际路径引入

	// 1️⃣ 数据
	const classData = ref([{
		"columnId": 800,
		"createTime": "2025-06-16 14:39:50",
		"id": 89,
		"model": "cart,bus,truck,mtc",
		"sort": 801,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "上海市专题",
		"updateTime": null
	},
	{
		"columnId": 801,
		"createTime": "2025-06-16 14:39:50",
		"id": 90,
		"model": "cart,bus,truck",
		"sort": 802,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "四川省专题",
		"updateTime": null
	},
	{
		"columnId": 802,
		"createTime": "2025-06-16 14:39:50",
		"id": 91,
		"model": "cart,bus,truck",
		"sort": 803,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "福州市专题",
		"updateTime": null
	},
	{
		"columnId": 803,
		"createTime": "2025-06-16 14:39:50",
		"id": 92,
		"model": "cart,bus,truck,mtc",
		"sort": 804,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "济南市专题",
		"updateTime": null
	},
	{
		"columnId": 804,
		"createTime": "2025-06-16 14:39:50",
		"id": 93,
		"model": "cart,bus,truck,mtc",
		"sort": 805,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "重庆市专题",
		"updateTime": null
	},
	{
		"columnId": 805,
		"createTime": "2025-06-16 14:39:50",
		"id": 94,
		"model": "cart,bus,truck",
		"sort": 806,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "浙江省专题",
		"updateTime": null
	},
	{
		"columnId": 806,
		"createTime": "2025-06-16 14:39:50",
		"id": 95,
		"model": "cart,bus,truck",
		"sort": 807,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "江西省专题",
		"updateTime": null
	},
	{
		"columnId": 807,
		"createTime": "2025-06-16 14:39:51",
		"id": 96,
		"model": "cart,bus,truck,mtc",
		"sort": 808,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "天津地方题",
		"updateTime": null
	},
	{
		"columnId": 808,
		"createTime": "2025-06-16 14:39:51",
		"id": 97,
		"model": "cart,bus,truck",
		"sort": 809,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "佳木斯地方题",
		"updateTime": null
	},
	{
		"columnId": 809,
		"createTime": "2025-06-16 14:39:51",
		"id": 98,
		"model": "cart,bus,truck",
		"sort": 810,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "湖南省专题",
		"updateTime": null
	},
	{
		"columnId": 810,
		"createTime": "2025-06-16 14:39:51",
		"id": 99,
		"model": "cart,bus,truck,mtc",
		"sort": 810,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "河南省专题",
		"updateTime": null
	},
	{
		"columnId": 812,
		"createTime": "2025-06-16 14:39:51",
		"id": 100,
		"model": "cart,bus,truck",
		"sort": 810,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "山东省地方题",
		"updateTime": null
	},
	{
		"columnId": 813,
		"createTime": "2025-06-16 14:39:51",
		"id": 101,
		"model": "cart,bus,truck",
		"sort": 810,
		"subject": "k1_4,k1_2_4,k1_3_4",
		"title": "内蒙古地方题",
		"updateTime": null
	}])
	const getClassData = () => {
		console.log('获取数据中')

	}

	const classifyTip = ref(['软件题库已同步更新至车管所最新'])

	const query = reactive({
		title: '',
		vehicle: ''
	})
	//const mapToUrlQuery = utils.mapToUrlQuery


	const mapToUrlQuery = function (map : { [x : string] : string }) {
		let str = ""
		if (typeof map !== 'object') {
			return ''
		}
		for (const key in map) {
			if (Object.hasOwnProperty.call(map, key)) {
				if (map[key]) {
					str += (key + "=" + map[key]) + "&"
				}



			}
		}
		// console.log(str)
		return str

	}

	// 2️⃣ 方法
	function goExercise(extraQuery : object) {
		let finalQuery = {
			...query
		}

		if (extraQuery) {
			finalQuery = {
				...finalQuery,
				...extraQuery
			}
		}

		uni.navigateTo({
			url: `/otherPages/exercise/index?${mapToUrlQuery(finalQuery)}`
		})
	}

	function goExerciseExam(extraQuery : object) {
		let finalQuery = {
			...query
		}

		if (extraQuery) {
			finalQuery = {
				...finalQuery,
				...extraQuery
			}
		}

		uni.navigateTo({
			url: `/otherPages/exerciseExam/index?${mapToUrlQuery(finalQuery)}`
		})
	}

	// 3️⃣ 生命周期（uni-app）
	onLoad((op) => {
		getClassData()
		Object.assign(query, op)
	})

	// 4️⃣ mounted（如后续需要）
	// onMounted(() => {
	//   api.exam.studentQuestion2InfoGetQuestionColumn({
	//     subject: `${query.oldSubject || 'k' + query.subject}`,
	//     model: query.model
	//   }).then(res => {
	//     classData.value = res.data
	//   })
	// })
</script>
<style>
	.custom-right-cell {
		flex: 1.8 !important;
	}
	.custom-title-font{
		font-size:30rpx;
	}
</style>
<style lang="scss" scoped>
	.cell-box {
		display: flex;

		flex-wrap: wrap;
		justify-content: space-between;

		.select {
			display: flex;
			flex-direction: row;
			color: white;

			.select-item0 {
				padding: 0 18rpx;
				background: #d6e9fc;
				margin-right: 20rpx;
				border-radius: 8rpx;
				white-space: nowrap;
				font-size: 32rpx;
				color: #498ef5;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 50rpx;
			}

			.select-item1 {
				padding: 0 18rpx;
				background: #d1f5eb;
				white-space: nowrap;
				border-radius: 8rpx;
				font-size: 32rpx;
				color: #01c18d;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 50rpx;
			}
		}

		.cell {
			width: 100%;
			border-bottom: 2rpx solid #e8e8e8;
			font-size: 36rpx;
		}

		.icon {
			width: 40rpx;
			height: 40rpx;
			background: #3AC770;
			border-radius: 50%;
			font-weight: 500;
			font-family: PingFang SC;
			font-size: 26rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			margin-right: 10rpx;
		}
	}
</style>