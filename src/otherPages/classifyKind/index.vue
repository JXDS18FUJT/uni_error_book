<template>
	<div class="cell-box">
		<van-cell center  title-class="uni-app-fontsize-paragraph" class="cell" :title="item.title
        " is-link @click="goExercise({

        columnAll: item.columnId,
        chapter: item.title
      })"  v-for="(item, index) in classData" :key="index" :border="false">
			<template #icon>
				<div class="icon">{{ index + 1 }}</div>
			</template>
		</van-cell>
		<div style="height:40rpx;width: 750rpx;"></div>
		<m-classify-tip :content="classifyTip"></m-classify-tip>
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
		"columnId": 153,
		"createTime": "2025-06-16 14:39:45",
		"id": 33,
		"model": "cart,bus,truck",
		"sort": 49,
		"subject": "k1_3,k12_3",
		"title": "新能源题",
		"updateTime": null
	},
	{
		"columnId": 100,
		"createTime": "2025-06-16 14:39:45",
		"id": 34,
		"model": "cart,bus,truck",
		"sort": 50,
		"subject": "k1_3,k12_3",
		"title": "驾照申领/要求",
		"updateTime": null
	},
	{
		"columnId": 101,
		"createTime": "2025-06-16 14:39:45",
		"id": 35,
		"model": "cart,bus,truck",
		"sort": 51,
		"subject": "k1_3,k12_3",
		"title": "考试内容/要求",
		"updateTime": null
	},
	{
		"columnId": 102,
		"createTime": "2025-06-16 14:39:45",
		"id": 36,
		"model": "cart,bus,truck",
		"sort": 52,
		"subject": "k1_3,k12_3",
		"title": "准驾车型",
		"updateTime": null
	},
	{
		"columnId": 103,
		"createTime": "2025-06-16 14:39:45",
		"id": 37,
		"model": "cart,bus,truck",
		"sort": 53,
		"subject": "k1_3,k12_3",
		"title": "基本常识",
		"updateTime": null
	},
	{
		"columnId": 104,
		"createTime": "2025-06-16 14:39:45",
		"id": 38,
		"model": "cart,bus,truck",
		"sort": 54,
		"subject": "k1_3,k12_3",
		"title": "安全常识",
		"updateTime": null
	},
	{
		"columnId": 105,
		"createTime": "2025-06-16 14:39:45",
		"id": 39,
		"model": "cart,bus,truck",
		"sort": 55,
		"subject": "k1_3,k12_3",
		"title": "电动/新能源",
		"updateTime": null
	},
	{
		"columnId": 106,
		"createTime": "2025-06-16 14:39:45",
		"id": 40,
		"model": "cart,bus,truck",
		"sort": 56,
		"subject": "k1_3,k12_3",
		"title": "交通信号灯",
		"updateTime": null
	},
	{
		"columnId": 107,
		"createTime": "2025-06-16 14:39:45",
		"id": 41,
		"model": "cart,bus,truck",
		"sort": 57,
		"subject": "k1_3,k12_3",
		"title": "交警手势",
		"updateTime": null
	},
	{
		"columnId": 108,
		"createTime": "2025-06-16 14:39:45",
		"id": 42,
		"model": "cart,bus,truck",
		"sort": 58,
		"subject": "k1_3,k12_3",
		"title": "禁令标志",
		"updateTime": null
	},
	{
		"columnId": 109,
		"createTime": "2025-06-16 14:39:46",
		"id": 43,
		"model": "cart,bus,truck",
		"sort": 59,
		"subject": "k1_3,k12_3",
		"title": "警告标志",
		"updateTime": null
	},
	{
		"columnId": 110,
		"createTime": "2025-06-16 14:39:46",
		"id": 44,
		"model": "cart,bus,truck",
		"sort": 60,
		"subject": "k1_3,k12_3",
		"title": "指示标志",
		"updateTime": null
	},
	{
		"columnId": 111,
		"createTime": "2025-06-16 14:39:46",
		"id": 45,
		"model": "cart,bus,truck",
		"sort": 61,
		"subject": "k1_3,k12_3",
		"title": "指路标志",
		"updateTime": null
	},
	{
		"columnId": 112,
		"createTime": "2025-06-16 14:39:46",
		"id": 46,
		"model": "cart,bus,truck",
		"sort": 62,
		"subject": "k1_3,k12_3",
		"title": "交通标线",
		"updateTime": null
	},
	{
		"columnId": 113,
		"createTime": "2025-06-16 14:39:46",
		"id": 47,
		"model": "cart,bus,truck",
		"sort": 63,
		"subject": "k1_3,k12_3",
		"title": "ABS题",
		"updateTime": null
	},
	{
		"columnId": 114,
		"createTime": "2025-06-16 14:39:46",
		"id": 48,
		"model": "cart,bus,truck",
		"sort": 64,
		"subject": "k1_3,k12_3",
		"title": "车内开关/装置",
		"updateTime": null
	},
	{
		"columnId": 115,
		"createTime": "2025-06-16 14:39:46",
		"id": 49,
		"model": "cart,bus,truck",
		"sort": 65,
		"subject": "k1_3,k12_3",
		"title": "仪表/指示灯",
		"updateTime": null
	},
	{
		"columnId": 116,
		"createTime": "2025-06-16 14:39:46",
		"id": 50,
		"model": "cart,bus,truck",
		"sort": 66,
		"subject": "k1_3,k12_3",
		"title": "灯光/喇叭",
		"updateTime": null
	},
	{
		"columnId": 117,
		"createTime": "2025-06-16 14:39:46",
		"id": 51,
		"model": "cart,bus,truck",
		"sort": 67,
		"subject": "k1_3,k12_3",
		"title": "违法行为认定",
		"updateTime": null
	},
	{
		"columnId": 118,
		"createTime": "2025-06-16 14:39:46",
		"id": 52,
		"model": "cart,bus,truck",
		"sort": 68,
		"subject": "k1_3,k12_3",
		"title": "刑罚题",
		"updateTime": null
	},
	{
		"columnId": 119,
		"createTime": "2025-06-16 14:39:47",
		"id": 53,
		"model": "cart,bus,truck",
		"sort": 69,
		"subject": "k1_3,k12_3",
		"title": "罚款题",
		"updateTime": null
	},
	{
		"columnId": 120,
		"createTime": "2025-06-16 14:39:47",
		"id": 54,
		"model": "cart,bus,truck",
		"sort": 70,
		"subject": "k1_3,k12_3",
		"title": "扣分题",
		"updateTime": null
	},
	{
		"columnId": 121,
		"createTime": "2025-06-16 14:39:47",
		"id": 55,
		"model": "cart,bus,truck",
		"sort": 71,
		"subject": "k1_3,k12_3",
		"title": "扣分题：超速/超载",
		"updateTime": null
	},
	{
		"columnId": 122,
		"createTime": "2025-06-16 14:39:47",
		"id": 56,
		"model": "cart,bus,truck",
		"sort": 72,
		"subject": "k1_3,k12_3",
		"title": "饮酒、醉酒",
		"updateTime": null
	},
	{
		"columnId": 123,
		"createTime": "2025-06-16 14:39:47",
		"id": 57,
		"model": "cart,bus,truck",
		"sort": 73,
		"subject": "k1_3,k12_3",
		"title": "学法减分",
		"updateTime": null
	},
	{
		"columnId": 124,
		"createTime": "2025-06-16 14:39:47",
		"id": 58,
		"model": "cart,bus,truck",
		"sort": 74,
		"subject": "k1_3,k12_3",
		"title": "机动车登记",
		"updateTime": null
	},
	{
		"columnId": 125,
		"createTime": "2025-06-16 14:39:47",
		"id": 59,
		"model": "cart,bus,truck",
		"sort": 75,
		"subject": "k1_3,k12_3",
		"title": "报废车/拼装车",
		"updateTime": null
	},
	{
		"columnId": 126,
		"createTime": "2025-06-16 14:39:47",
		"id": 60,
		"model": "cart,bus,truck",
		"sort": 76,
		"subject": "k1_3,k12_3",
		"title": "补领/换证/审验",
		"updateTime": null
	},
	{
		"columnId": 127,
		"createTime": "2025-06-16 14:39:47",
		"id": 61,
		"model": "cart,bus,truck",
		"sort": 77,
		"subject": "k1_3,k12_3",
		"title": "扣留/注销/吊销",
		"updateTime": null
	},
	{
		"columnId": 128,
		"createTime": "2025-06-16 14:39:47",
		"id": 62,
		"model": "cart,bus,truck",
		"sort": 78,
		"subject": "k1_3,k12_3",
		"title": "记分周期/满分",
		"updateTime": null
	},
	{
		"columnId": 129,
		"createTime": "2025-06-16 14:39:47",
		"id": 63,
		"model": "cart,bus,truck",
		"sort": 79,
		"subject": "k1_3,k12_3",
		"title": "扣留车辆",
		"updateTime": null
	},
	{
		"columnId": 130,
		"createTime": "2025-06-16 14:39:48",
		"id": 64,
		"model": "cart,bus,truck",
		"sort": 80,
		"subject": "k1_3,k12_3",
		"title": "速度/高速路",
		"updateTime": null
	},
	{
		"columnId": 131,
		"createTime": "2025-06-16 14:39:48",
		"id": 65,
		"model": "cart,bus,truck",
		"sort": 81,
		"subject": "k1_3,k12_3",
		"title": "速度/普通道路",
		"updateTime": null
	},
	{
		"columnId": 132,
		"createTime": "2025-06-16 14:39:48",
		"id": 66,
		"model": "cart,bus,truck",
		"sort": 82,
		"subject": "k1_3,k12_3",
		"title": "能见度/高速路",
		"updateTime": null
	},
	{
		"columnId": 133,
		"createTime": "2025-06-16 14:39:48",
		"id": 67,
		"model": "cart,bus,truck",
		"sort": 83,
		"subject": "k1_3,k12_3",
		"title": "米数题",
		"updateTime": null
	},
	{
		"columnId": 134,
		"createTime": "2025-06-16 14:39:48",
		"id": 68,
		"model": "cart,bus,truck",
		"sort": 84,
		"subject": "k1_3,k12_3",
		"title": "年份/日期题",
		"updateTime": null
	},
	{
		"columnId": 135,
		"createTime": "2025-06-16 14:39:48",
		"id": 69,
		"model": "cart,bus,truck",
		"sort": 85,
		"subject": "k1_3,k12_3",
		"title": "实习期规定",
		"updateTime": null
	},
	{
		"columnId": 136,
		"createTime": "2025-06-16 14:39:48",
		"id": 70,
		"model": "cart,bus,truck",
		"sort": 86,
		"subject": "k1_3,k12_3",
		"title": "高速公路",
		"updateTime": null
	},
	{
		"columnId": 137,
		"createTime": "2025-06-16 14:39:48",
		"id": 71,
		"model": "cart,bus,truck",
		"sort": 87,
		"subject": "k1_3,k12_3",
		"title": "故障处理",
		"updateTime": null
	},
	{
		"columnId": 138,
		"createTime": "2025-06-16 14:39:48",
		"id": 72,
		"model": "cart,bus,truck",
		"sort": 88,
		"subject": "k1_3,k12_3",
		"title": "事故及争议处理",
		"updateTime": null
	},
	{
		"columnId": 139,
		"createTime": "2025-06-16 14:39:48",
		"id": 73,
		"model": "cart,bus,truck",
		"sort": 89,
		"subject": "k1_3,k12_3",
		"title": "事故伤员救助",
		"updateTime": null
	},
	{
		"columnId": 140,
		"createTime": "2025-06-16 14:39:48",
		"id": 74,
		"model": "cart,bus,truck",
		"sort": 90,
		"subject": "k1_3,k12_3",
		"title": "事故责任认定",
		"updateTime": null
	},
	{
		"columnId": 141,
		"createTime": "2025-06-16 14:39:49",
		"id": 75,
		"model": "cart,bus,truck",
		"sort": 91,
		"subject": "k1_3,k12_3",
		"title": "意外情况处理",
		"updateTime": null
	},
	{
		"columnId": 142,
		"createTime": "2025-06-16 14:39:49",
		"id": 76,
		"model": "cart,bus,truck",
		"sort": 92,
		"subject": "k1_3,k12_3",
		"title": "特殊天气",
		"updateTime": null
	},
	{
		"columnId": 143,
		"createTime": "2025-06-16 14:39:49",
		"id": 77,
		"model": "cart,bus,truck",
		"sort": 93,
		"subject": "k1_3,k12_3",
		"title": "特殊路段/路况",
		"updateTime": null
	},
	{
		"columnId": 144,
		"createTime": "2025-06-16 14:39:49",
		"id": 78,
		"model": "cart,bus,truck",
		"sort": 94,
		"subject": "k1_3,k12_3",
		"title": "铁路道口",
		"updateTime": null
	},
	{
		"columnId": 145,
		"createTime": "2025-06-16 14:39:49",
		"id": 79,
		"model": "cart,bus,truck",
		"sort": 95,
		"subject": "k1_3,k12_3",
		"title": "变更车道",
		"updateTime": null
	},
	{
		"columnId": 146,
		"createTime": "2025-06-16 14:39:49",
		"id": 80,
		"model": "cart,bus,truck",
		"sort": 96,
		"subject": "k1_3,k12_3",
		"title": "超车题",
		"updateTime": null
	},
	{
		"columnId": 147,
		"createTime": "2025-06-16 14:39:49",
		"id": 81,
		"model": "cart,bus,truck",
		"sort": 97,
		"subject": "k1_3,k12_3",
		"title": "跟车/会车/转弯",
		"updateTime": null
	},
	{
		"columnId": 148,
		"createTime": "2025-06-16 14:39:49",
		"id": 82,
		"model": "cart,bus,truck",
		"sort": 98,
		"subject": "k1_3,k12_3",
		"title": "路口/人行道",
		"updateTime": null
	},
	{
		"columnId": 149,
		"createTime": "2025-06-16 14:39:49",
		"id": 83,
		"model": "cart,bus,truck",
		"sort": 99,
		"subject": "k1_3,k12_3",
		"title": "无中心线道路",
		"updateTime": null
	},
	{
		"columnId": 150,
		"createTime": "2025-06-16 14:39:49",
		"id": 84,
		"model": "cart,bus,truck",
		"sort": 100,
		"subject": "k1_3,k12_3",
		"title": "拥堵路况",
		"updateTime": null
	},
	{
		"columnId": 151,
		"createTime": "2025-06-16 14:39:49",
		"id": 85,
		"model": "cart,bus,truck",
		"sort": 101,
		"subject": "k1_3,k12_3",
		"title": "优先通行/礼让",
		"updateTime": null
	},
	{
		"columnId": 152,
		"createTime": "2025-06-16 14:39:50",
		"id": 86,
		"model": "cart,bus,truck",
		"sort": 102,
		"subject": "k1_3,k12_3",
		"title": "英文字母题",
		"updateTime": null
	},
	{
		"columnId": 168,
		"createTime": "2025-06-16 14:39:50",
		"id": 87,
		"model": "cart",
		"sort": 301,
		"subject": "k1_3,k12_3",
		"title": "新增题目 ",
		"updateTime": null
	},
	{
		"columnId": 169,
		"createTime": "2025-06-16 14:39:50",
		"id": 88,
		"model": "cart,bus,truck",
		"sort": 301,
		"subject": "k1_3,k12_3",
		"title": "新交规题",
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

<style lang="scss" scoped>
	.cell-box {
		display: flex;
		padding: 30rpx 30rpx;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #fff;

		.cell {
			width: 690rpx;
			border-bottom: 2rpx solid #E8E8E8;
			// box-shadow: 0rpx 0rpx 20rpx rgba(124, 129, 136, 0.2);
			background: #fff;
			font-size: 32rpx;

		}

		//地区
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
			color: #ffffff;
			margin-right: 10rpx;
			color: #fff;
		}
	}
</style>