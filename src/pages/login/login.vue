<template>
	<view>
		<view class="pr-16 pl-16 bg-gray">
			<view class="text-center text-48 pb-8 pt-8">系统</view>
			<van-toast ref="van-toast" id="van-toast" />
			<van-button type="primary" @click="showLongToast">长文字提示</van-button>
			<!-- <van-calendar closeOnClickOverlay :show="showCalendar" :position="'bottom'" type="single" :poppable="false"
				:formatter="formatter" :show-confirm="true" :confirm-text="confirmText"
				:confirm-disabled-text="confirmDisabledText" :first-day-of-week="firstDayOfWeek" @close="()=>{
		    showCalendar= false
		  }" /> -->
		
		<van-tabs :active="active" type="line" tab-class="special-tab">
		    <van-tab
		      v-for="(item, index) in tabs2"
		      :key="index"
		      :title="'标签 ' + item"
			  :name="'标签 ' + item"
		    >
		      <view class="content-2">
		        {{ '内容' + item }}
		      </view>
		    </van-tab>
		  </van-tabs>
		
		<!-- <van-popup :show="showCalendar" round position="bottom"> -->
		 <van-cascader v-if="showCalendar" :value="value" title="选择地区" :options="options"
		    @close="()=>{
				showCalendar=false
			}" />
		<!-- </van-popup> -->
		</view>
	</view>



</template>
<script lang="ts">
	import Toast from '@/uni_modules/van-toast/toast.js'
	import api from '@/api'
	const options = [{
		text: "浙江省",
		value: [],
		children: [{
			text: "杭州市",
			value: "330100",
			children: [{
				text: "上城区",
				value: "330102"
			}, {
				text: "下城区",
				value: "330103"
			}, {
				text: "江干区",
				value: "330104"
			}]
		}, {
			text: "宁波市",
			value: "330200",
			children: [{
				text: "海曙区",
				value: "330203"
			}, {
				text: "江北区",
				value: "330205"
			}, {
				text: "北仑区",
				value: "330206"
			}]
		}, {
			text: "温州市",
			value: "330300",
			children: [{
				text: "鹿城区",
				value: "330302"
			}, {
				text: "龙湾区",
				value: "330303"
			}, {
				text: "瓯海区",
				value: "330304"
			}]
		}]
	}, {
		text: "江苏省",
		value: "320000",
		children: [{
			text: "南京市",
			value: "320100",
			children: [{
				text: "玄武区",
				value: "320102"
			}, {
				text: "秦淮区",
				value: "320104"
			}, {
				text: "建邺区",
				value: "320105"
			}]
		}, {
			text: "无锡市",
			value: "320200",
			children: [{
				text: "锡山区",
				value: "320205"
			}, {
				text: "惠山区",
				value: "320206"
			}, {
				text: "滨湖区",
				value: "320211"
			}]
		}, {
			text: "徐州市",
			value: "320300",
			children: [{
				text: "鼓楼区",
				value: "320302"
			}, {
				text: "云龙区",
				value: "320303"
			}, {
				text: "贾汪区",
				value: "320305"
			}]
		}]
	}]
	export default {
		data() {
			return {
				active:1,
				tabs2: [0, 2],
				options,
				value: '',
				formatter: undefined,
				confirmText: undefined,
				confirmDisabledText: undefined,
				firstDayOfWeek: 0,
				showCalendar: true,
				formData: {
					username: 'vzjtu609',
					password: ''
				},
				position: "bottom",
				round: true
			}
		},
		methods: {
			loadDynamicOptions(e) {
			  const {
			    value
			  } = e;
			  console.log(e)
			  this.value = value
			},
			showLongToast() {
				Toast('这是一条长文字提示，超过一定字数就会换行');
			},
			onClick() {

			},
			submit() {
				// 在 onLoad 生命周期中，formData添加了一个 id 字段 ，此时这个字段是不参数校验的，所以结果中不返回
				// 在 validate(['id']) 方法中，指定第一个参数 ，即可返回id字段
				//@ts-ignore
				this.$refs.form.validate().then((res : {
					'username' : string
					'password' : string
				}) => {
					// 成功返回，res 为表单数据
					// 其他逻辑处理 
					console.log(res)


					// ...

					api.login.login(this.formData).then(res => {
						console.log(JSON.stringify(res))
						uni.setStorageSync('token', res.data.token)
						api.user.userInfo().then(resu => {
							console.log(JSON.stringify(resu))

						})
					})
				}).catch((err) => {
					// 表单校验验失败，err 为具体错误信息
					// 其他逻辑处理
					// ...
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
			},
			loginByWx() {
				uni.login({
					provider: 'weixin',
					"onlyAuthorize": true,
					success(event) {
						const { code } = event
						console.log(event)
					},
					fail: function (err) {
						console.log(err)
						// 登录授权失败
						// err.code是错误码
					}
				})


			}

		}

	}
</script>

<style>
</style>