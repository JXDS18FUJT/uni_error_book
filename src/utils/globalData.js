//学员的全局数据 
// 学员
let globalData = {
	token: "",
	openid: "oVPuI7SFV_aIXp6EF3edpr_Oy2w4",
	userInfo: {
		headImg: "http://121.46.4.11/3501/student/202409/17254123576315442.jpg",
		loginCode: "350102196802270463",
		schoolId: "3501030116",
		schoolName: "福州昌明汽车培训有限公司",
		sex: "2",
		star: "5",
		type: 1,
		userId: "350101548833",
		userName: "陈群英"
	}
};
// 教练
let _globalData = {
	token: "",
	openid: "oVPuI7SFV_aIXp6EF3edpr_Oy2w4",
	userInfo: {
		loginCode: "350122199610086812",
		schoolId: "3501030116",
		schoolName: "福州昌明汽车培训有限公司",
		type: 2,
		userId: "3501033734",
		userName: "林锦"
	}
};
uni.setStorageSync("globalData", globalData)

export default globalData