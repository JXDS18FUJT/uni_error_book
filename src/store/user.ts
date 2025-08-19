import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			// all these properties will have their type inferred automatically
			count: 0,
			name: 'Eduardo',
			isAdmin: true,
			items: [],
			hasChanged: true,
			userInfo: {
				appOpenid: null,
				balancePrice: 0,
				coachId: null,
				createTime: "2024-07-26 17:28:17",
				expTime: "2025-08-20 15:15:41",
				gzhOpenid: "otag_5lRMJl7o6lDh0mH32xvkbcE",
				headImage: "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLIf6UgDN2F8pSbKSdcVicpOYnMJgNIleltriaz2AN0VMzbuYiaQ35QvWxOfDptDmmErHEguRTInxk2w/132",
				id: 882,
				isBm: 1,
				isVip: 2,
				nickName: "默认用户",
				phone: "12345678910",
				platformType: null,
				puserId: 887,
				realName: "",
				salUserId: null,
				sessionKey: null,
				shopId: 2,
				status: 0,
				tgLevel: 1,
				unionId: "osN_q6M9lpf4ZnujMYdZUVudIzA8",
				updateTime: "2025-07-30 15:26:40",
				webOpenid: "owKJ26fWJZYzpEgfXxrBbx4_w7IA",
				wechar: null,
				xcxOpenid: "owfrB6yGPmSOcLv15Q7iB_mi90CM"
			}
		}
	},
	getters:{
		isVip:(state) => state.userInfo.isVip,
		
	},
	actions: {
		changeName(name : string) {
			this.name = name
		}

	}
})