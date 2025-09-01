<template>
	<view class="bg-white">
		<div class="cell-box">
			<view v-for="(item, index) in classData" :key="index">
				<van-cell title-class="uni-app-fontsize-paragraph" value-class="custom-right-cell" class="cell" :title="item.title
        " center :border="false">
					<div class="select">
						<div class="select-item0 uni-app-fontsize-paragraph" @click="() => {
          goExercise({
            columnAll: item.columnId,
            chapter: item.title
          });
        }
        ">
							<image style="width: 22rpx; height: 26rpx;padding-right:6rpx;"
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
							<image style="width: 26rpx; height: 26rpx;padding-right:6rpx;"
								src="https://ndata.zzxcx.net/ctjk/mp-wx/classifyOrder/danxiang.png"></image>
							单项测试
						</div>
					</div>
					<template #icon>
						<div class="icon">{{ index + 1 }}</div>
					</template>
				</van-cell>
			</view>
		</div>
		<!-- <div style="height: 40rpx; width: 750rpx"></div>
    <div style="padding:0rpx 15rpx">
         <m-classify-tip :content="classifyTip"></m-classify-tip>
    </div> -->
	</view>
</template>

<script>
	import api from "@/api/index";
	import utils from "@/utils/index";
	export default {
		data() {
			return {
				classData: [{
						"columnId": 1,
						"createTime": "2025-06-16 14:39:42",
						"id": 1,
						"model": "cart,bus,truck",
						"sort": 1,
						"subject": "k1,k12",
						"title": "练习一",
						"updateTime": null
					},
					{
						"columnId": 2,
						"createTime": "2025-06-16 14:39:42",
						"id": 2,
						"model": "cart,bus,truck",
						"sort": 2,
						"subject": "k1,k12",
						"title": "练习二",
						"updateTime": null
					},
					{
						"columnId": 3,
						"createTime": "2025-06-16 14:39:42",
						"id": 3,
						"model": "cart,bus,truck",
						"sort": 3,
						"subject": "k1,k12",
						"title": "练习三",
						"updateTime": null
					},
					{
						"columnId": 4,
						"createTime": "2025-06-16 14:39:42",
						"id": 4,
						"model": "cart,bus,truck",
						"sort": 4,
						"subject": "k1,k12",
						"title": "练习四",
						"updateTime": null
					},
					{
						"columnId": 5,
						"createTime": "2025-06-16 14:39:42",
						"id": 5,
						"model": "cart,bus,truck",
						"sort": 5,
						"subject": "k1,k12",
						"title": "练习五",
						"updateTime": null
					},
					{
						"columnId": 6,
						"createTime": "2025-06-16 14:39:42",
						"id": 6,
						"model": "cart,bus,truck",
						"sort": 6,
						"subject": "k1,k12",
						"title": "练习六",
						"updateTime": null
					},
					{
						"columnId": 7,
						"createTime": "2025-06-16 14:39:42",
						"id": 7,
						"model": "cart,bus,truck",
						"sort": 7,
						"subject": "k1,k12",
						"title": "练习七",
						"updateTime": null
					},
					{
						"columnId": 8,
						"createTime": "2025-06-16 14:39:42",
						"id": 8,
						"model": "cart,bus,truck",
						"sort": 8,
						"subject": "k1,k12",
						"title": "练习八",
						"updateTime": null
					},
					{
						"columnId": 9,
						"createTime": "2025-06-16 14:39:42",
						"id": 9,
						"model": "cart,bus,truck",
						"sort": 9,
						"subject": "k1,k12",
						"title": "练习九",
						"updateTime": null
					},
					{
						"columnId": 10,
						"createTime": "2025-06-16 14:39:42",
						"id": 10,
						"model": "cart,bus,truck",
						"sort": 10,
						"subject": "k1,k12",
						"title": "练习十",
						"updateTime": null
					},
					{
						"columnId": 11,
						"createTime": "2025-06-16 14:39:43",
						"id": 11,
						"model": "cart,bus,truck",
						"sort": 11,
						"subject": "k1,k12",
						"title": "练习十一",
						"updateTime": null
					},
					{
						"columnId": 12,
						"createTime": "2025-06-16 14:39:43",
						"id": 12,
						"model": "cart,bus,truck",
						"sort": 12,
						"subject": "k1,k12",
						"title": "练习十二",
						"updateTime": null
					},
					{
						"columnId": 13,
						"createTime": "2025-06-16 14:39:43",
						"id": 13,
						"model": "cart,bus,truck",
						"sort": 13,
						"subject": "k1,k12",
						"title": "交警信号",
						"updateTime": null
					},
					{
						"columnId": 14,
						"createTime": "2025-06-16 14:39:43",
						"id": 14,
						"model": "cart,bus,truck",
						"sort": 14,
						"subject": "k1,k12",
						"title": "交通标线",
						"updateTime": null
					},
					{
						"columnId": 15,
						"createTime": "2025-06-16 14:39:43",
						"id": 15,
						"model": "cart,bus,truck",
						"sort": 15,
						"subject": "k1,k12",
						"title": "机械仪表",
						"updateTime": null
					},
					{
						"columnId": 16,
						"createTime": "2025-06-16 14:39:43",
						"id": 16,
						"model": "cart,bus,truck",
						"sort": 16,
						"subject": "k1,k12",
						"title": "扣分题一",
						"updateTime": null
					},
					{
						"columnId": 17,
						"createTime": "2025-06-16 14:39:43",
						"id": 17,
						"model": "cart,bus,truck",
						"sort": 17,
						"subject": "k1,k12",
						"title": "扣分题二",
						"updateTime": null
					},
					{
						"columnId": 18,
						"createTime": "2025-06-16 14:39:43",
						"id": 18,
						"model": "cart,bus,truck",
						"sort": 18,
						"subject": "k1,k12",
						"title": "罚款题目",
						"updateTime": null
					},
					{
						"columnId": 19,
						"createTime": "2025-06-16 14:39:43",
						"id": 19,
						"model": "cart,bus,truck",
						"sort": 19,
						"subject": "k1,k12",
						"title": "禁令标志",
						"updateTime": null
					},
					{
						"columnId": 20,
						"createTime": "2025-06-16 14:39:43",
						"id": 20,
						"model": "cart,bus,truck",
						"sort": 20,
						"subject": "k1,k12",
						"title": "警告标志",
						"updateTime": null
					},
					{
						"columnId": 21,
						"createTime": "2025-06-16 14:39:44",
						"id": 21,
						"model": "cart,bus,truck",
						"sort": 21,
						"subject": "k1,k12",
						"title": "指示标志",
						"updateTime": null
					},
					{
						"columnId": 22,
						"createTime": "2025-06-16 14:39:44",
						"id": 22,
						"model": "cart,bus,truck",
						"sort": 22,
						"subject": "k1,k12",
						"title": "指路标志",
						"updateTime": null
					},
					{
						"columnId": 23,
						"createTime": "2025-06-16 14:39:44",
						"id": 23,
						"model": "cart,bus,truck",
						"sort": 23,
						"subject": "k1,k12",
						"title": "灯光使用",
						"updateTime": null
					},
					{
						"columnId": 24,
						"createTime": "2025-06-16 14:39:44",
						"id": 24,
						"model": "cart,bus,truck",
						"sort": 24,
						"subject": "k1,k12",
						"title": "救援毒品",
						"updateTime": null
					},
					{
						"columnId": 25,
						"createTime": "2025-06-16 14:39:44",
						"id": 25,
						"model": "cart,bus,truck",
						"sort": 30,
						"subject": "k1,k12",
						"title": "新能源题",
						"updateTime": null
					},
					{
						"columnId": 35,
						"createTime": "2025-06-16 14:39:44",
						"id": 26,
						"model": "cart",
						"sort": 30,
						"subject": "k1,k12",
						"title": "新增题目",
						"updateTime": null
					}
				],
				classifyTip: ["软件题库已同步更新至车管所最新"],
				query: {
					title: "",
					vehicle: "",
				},
			};
		},
		methods: {
			goExercise(extraQuery) {

				let query = Object.assign({}, this.query);
				if (extraQuery) {
					query = {
						...query,
						...extraQuery,
					};
				} else {}

				uni.navigateTo({
					url: "/otherPages/exercise/index?" + utils.mapToUrlQuery(query),
				});
			},
			goExerciseExam(extraQuery) {
				let query = Object.assign({}, this.query);
				if (extraQuery) {
					query = {
						...query,
						...extraQuery,
					};
				} else {}

				uni.navigateTo({
					url: "/otherPages/exerciseExam/index?" + utils.mapToUrlQuery(query),
				});
			},
		},
		onLoad(op) {
			this.query = op;
		},
		mounted() {
			// api.exam.studentQuestion2InfoGetQuestionColumn({
			//   subject: `${(this.query.oldSubject||'k'+this.query.subject)}`,
			//   model: this.query.model
			// }).then(res => {
			//   this.classData = res.data;
			// })
		},
	};
</script>
<style>
	.custom-right-cell {
		flex: 1.8 !important;
	}
</style>

<style lang="scss" scoped>
	.bg-white {
		background: #ffffff;
	}

	.cell-box {
		display: flex;
		padding: 10rpx 0rpx;
		flex-wrap: wrap;
		justify-content: space-between;

		>view {
			width: 100%;
			border-bottom: 1px solid #ddd;
		}

		.cell {
			width: 100%;

			line-height: 56rpx;

			// box-shadow: 0px 0px 10px rgba(124, 129, 136, 0.2);
		}

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