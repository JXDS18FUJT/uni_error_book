<template>
	<view>
		<uni-forms ref="form" :modelValue="formData">
			<uni-forms-item name="username" label="用户名">
				<uni-easyinput v-model="formData.username" type="text" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item name="password" label="密码">
				<uni-easyinput v-model="formData.password" type="text" placeholder="请输入密码" />
			</uni-forms-item>
			<button class="button" @click="submit">登录</button>
		<navigator url="/pages/login/login">前往登录</navigator>
		</uni-forms>
	</view>

</template>
<script>
	import api from '@/api'

	export default {
		data() {
			return {
				formData: {
					username: 'admin',
					password: '123456'
				},
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
			submit() {
				// 在 onLoad 生命周期中，formData添加了一个 id 字段 ，此时这个字段是不参数校验的，所以结果中不返回
				// 在 validate(['id']) 方法中，指定第一个参数 ，即可返回id字段
				api.login.login(this.formData).then(res => {
					console.log(JSON.stringify(res))
					uni.setStorageSync('token', res.data.token)
					api.user.userInfo().then(resu => {
						console.log(JSON.stringify(resu))

					})
				})

				// uni.request({
				// 	url: 'http://192.168.8.36:9091/login',
				// 	method: 'POST',
				// 	data: this.formData,
				// 	dataType:'json',
				// 	success(res) {
				// 		console.log(res)
				// 		// uni.setStorageSync('token', res.data.data.token)
				// 		uni.request({
				// 			url: 'http://192.168.8.36:9091/api/userInfo',
				// 			method:'get',
				// 			dataType:'json',
				// 			header:{
				// 				'Authorization':res.data.data.token
								
				// 			},
				// 			success(resu) {
				// 				console.log(resu)

				// 			}
				// 		})

				// 	},
				// 	fail(err) {
				// 		console.log(err)

				// 	}
				// })
			}

		}

	}
</script>

<style>
</style>