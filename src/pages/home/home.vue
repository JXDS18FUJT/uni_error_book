<template>
	<view>
		<uni-forms ref="form" :modelValue="formData">
			<uni-forms-item name="age" label="年龄">
				<uni-easyinput v-model="formData.age" type="text" placeholder="请输入年龄" />
			</uni-forms-item>

			<button class="button" @click="submit">校验表单</button>
		</uni-forms>
	</view>

</template>
<script>
	import api from '@/api'
	
	export default {
		data() {
			return {
				formData: {
					age: ''
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
				this.$refs.form.validate(['id'], (err, formData) => {
					if (!err) {
						console.log('success', formData)
					}
				})
			}

		}

	}
</script>

<style>
</style>