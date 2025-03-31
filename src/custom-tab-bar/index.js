Component({
	data: {
		//默认是2
		active: -1,
		selectedColor: "#498EF5FF",
		userInfo: {

		},
		//教练
		list1: [{
				"pagePath": "/pages/appointCoach2/appointCoach2",
				"iconPath": "/static/image/plan.png",
				"openType": "switchTab",
				"selectedIconPath": "/static/image/plan_active.png",
				"text": "我的计划"
			},
			{
				"pagePath": "/pages/postCoachPlan/postCoachPlan",
				"openType": "switchTab",
				"iconPath": "/static/image/post.png",
				"selectedIconPath": "/static/image/post_active.png",
				"text": "发布计划"
			},
			{
				"pagePath": "/pages/myAppointment/myAppointment",
				"iconPath": "/static/image/home.png",
				"selectedIconPath": "/static/image/home_active.png",
				"openType": "switchTab",
				"text": "我的预约"
			},

		],
		//学员
		list: [{
				"pagePath": "/pages/coachList/coachList",
				"iconPath": "/static/image/home.png",
				"selectedIconPath": "/static/image/home_active.png",
				"openType": "switchTab",
				"text": "教练列表"
			}, {
				"pagePath": "/pages/myAppointment/myAppointment",
				"iconPath": "/static/image/appointment.png",
				"openType": "switchTab",
				"selectedIconPath": "/static/image/appointment_acitve.png",
				"text": "我的预约"
			},
			{
				"pagePath": "/pages/askList/askList",
				"iconPath": "/static/image/ask.png",
				"openType": "navigateTo",
				"selectedIconPath": "/static/image/ask_acitve.png",
				"text": "咨询和投诉"
			}
		]
	},
	attached() {
		let that = this
		let app = getApp()
		if (app.globalData.userInfo.type == 2) {
			this.setData({
				list: Object.assign([], this.data.list1)
			})

		}

		this.setData({
			userInfo: app.globalData.userInfo
		})
		console.log(app.globalData.userInfo)

	},

	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			const url = data.path
			const openType = data.openType
			if (openType == 'switchTab') {
				wx.switchTab({
					url
				})
				return

			} else {
				wx.navigateTo({
					url
				})
			}

			// this.setData({
			// 	active: data.index
			// })

		},
		onChange(event) {

		},

		init() {
			const page = getCurrentPages().pop();
			const app = getApp()
			let active = -1
			if (app.globalData.userInfo.type == 2) {
				console.log(this.data.list1)
				active = this.data.list1.findIndex(item => item.pagePath === `/${page.route}`)
			} else if (app.globalData.userInfo.type == 1) {
				console.log(this.data.list)
				active = this.data.list.findIndex(item => item.pagePath === `/${page.route}`)
			}
			console.log(active, page.route)
			this.setData({
				active: active
			});
		}
	}
});