<script>
	export default {
		globalData: {

		},
		methods: {

		},

		onLaunch: function() {
			const systemInfo = uni.getSystemInfoSync()
			if (systemInfo.platform === 'android') {
				console.log('当前是安卓设备')
				uni.setStorageSync('platform', 'android')
			} else if (systemInfo.platform === 'ios') {
				console.log('当前是苹果设备')
				uni.setStorageSync('platform', 'ios')
			} else {
				console.log('当前是苹果设备')
				uni.setStorageSync('platform', 'ios')
			}
			uni.setStorageSync('model',systemInfo.model)
			uni.setStorageSync('system',systemInfo.system)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	
	.iPhoneX {
	  padding-bottom: constant(safe-area-inset-bottom);
	  padding-bottom: env(safe-area-inset-bottom);
	}
</style>