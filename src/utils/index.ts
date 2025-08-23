let utils = {
	mapToUrlQuery(map : { [x : string] : string }) {
		let str = ""
		if (typeof map !== 'object') {
			return false
		}
		for (const key in map) {
			if (Object.hasOwnProperty.call(map, key)) {
				if (map[key]) {
					str += (key + "=" + map[key]) + "&"
				}



			}
		}
		// console.log(str)
		return str

	},

}



export default utils