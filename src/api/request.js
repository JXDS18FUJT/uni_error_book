import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter

const baseUrl = "http://192.168.2.110:9091/"
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	// baseURL: process.env.VUE_APP_BASE_API,
	baseURL: baseUrl,
	// 超时
	timeout: 10000
})


// request拦截器
service.interceptors.request.use(
	async config => {
			// 是否需要设置 token
			let token = uni.getStorageSync("token");
			// 是否需要设置 token
			if (config.headers.isLogin == "1") {
				return config;
			}
			if (uni.getStorageSync("token")) {
				config.headers["Authorization"] = uni.getStorageSync("token"); // 让每个请求携带自定义token 请根据实际情况自行修改
				return config
			}
			return config

		},
		error => {
			Promise.reject(error)
		}
)

// 响应拦截器
service.interceptors.response.use(
	res => {
		// 未设置状态码则默认成功状态
		//本项目 0是成功的
		const code = res.data.code || 0;
		const msg = res.data.msg || ""
		// 获取错误信息
		if (code == 200) {
			return res.data
		} else {
			console.log('code' + code + ':' + msg)
			uni.showToast({
				title: msg,
				icon: 'error'
			})
			return res.data
		}


		return res.data
	},
	error => {
		let {
			message
		} = error;
		if (message == "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		} else if (message.includes("Request failed with status code")) {
			message = "系统接口" + message.substr(message.length - 3) + "异常";
		}
		uni.showToast({
			title: message,
			icon: 'none'
		})
		return Promise.reject(error)
	}
)

export default service