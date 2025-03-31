<script>
	import globalData from '@/utils/globalData.js'
	import parseTextObjectPath from "@/utils/parseTextObjectKey.js"
	export default {
		globalData: globalData,
		methods: {
			setGlobalData(objectPath, value) {
				const objectPaths = parseTextObjectPath(objectPath)
				//console.log(objectPaths)
				let data = this.globalData
				objectPaths.forEach((item, index) => {
					if (index < objectPaths.length - 1) {
						data = data[item]
					} else {
						
						data[item] = value
					}
				})
				uni.setStorageSync('globalData',this.globalData)
				// for (var i = 0; i < objectPaths.length; i++) {
				// 	if (i < objectPaths.length - 1) {
				// 		data = data[objectPaths[i]]
				// 	} else {
				// 		data[objectPaths[i]] = value
				// 	}
				// }
			},
			setGlobalDataToStorage() {
				uni.setStorageSync(this.globalData)
			},
		},

		onLaunch: function() {
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
</style>