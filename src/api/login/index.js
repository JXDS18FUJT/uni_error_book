import request from '../request'
import FormData from '../formData.js'
const login = {

	//微信小程序上传文件接口
	login(data) {
		return request({
			url: "/login",
			method: "POST",
			data
		})
	},
	//微信小程序上传文件接口
	uploadFile(data) {
		const formData = new FormData()
		formData.appendFile("file", data.file)
		const _data = formData.getData()
		console.log('开始上传')
		return new Promise((resolve, reject) => {
			wx.request({
				url: 'http://localhost:9091/api/upload',
				method: 'POST',
				header: {
					'content-type': _data.contentType
				},
				data: _data.buffer,
				success(res) {
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},


}

export default login