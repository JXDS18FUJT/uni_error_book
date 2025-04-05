import request from '../request'

const user = {

	//微信小程序上传文件接口
	userInfo() {
		return request({
			url: "api/userInfo",
			method: "GET",
	
		})
	},



}

export default user