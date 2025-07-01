<template>
	<view>
		<button @click="loginByWx">微信登录</button>
	</view>
</template>

<script lang="ts" setup>
	const loginByWx = () => {
		uni.login({
			"provider": "weixin",
			"onlyAuthorize": true, // 微信登录仅请求授权认证
			success: function (event) {
				const { code } = event
				console.log("code:",code)
				//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
				// uni.request({
				// 	url: 'https://www.example.com/loginByWeixin', //仅为示例，并非真实接口地址。
				// 	data: {
				// 		code: code
				// 	},
				// 	success: (res) => {
				// 		//获得token完成登录
				// 		uni.setStorageSync('token', res.token)
				// 	}
				// });
			},
			fail: function (err) {
				console.log(err)
				// 登录授权失败
				// err.code是错误码
			}
		})

	}
</script>

<style>
</style>