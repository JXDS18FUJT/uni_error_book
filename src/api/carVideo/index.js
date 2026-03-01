//教学视频
import request from '../request'

const carVideo = {
	//教学视频
	studentVideoTeachingList(params) {
		return request({
			url: "student/video/teaching/list",
			params
		})

	},
	//查询当前用户已购课程列表
	studentJyCoursePurchasedCoursesList(params) {
		return request({
			url: "student/jy/course/purchasedCoursesList",
			params

		})

	}
}
export default carVideo