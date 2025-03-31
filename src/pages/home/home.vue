<template>
	<view class="bg-yellow text-blue">首页1好</view>
	<navigator url="/pages/user/user" open-type="switchTab">前往用户界面</navigator>

</template>
<script>
	import api from '@/api'
	export default {
		data() {
			return {

				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 1,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {

		}

	}
</script>

<style>
</style>