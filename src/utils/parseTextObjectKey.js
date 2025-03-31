function parseTextObjectPath(textObjectPath) {
	var keys = []
	//去除尾部的]
	var _textObjectPath = textObjectPath.replaceAll("]", "")
	//头部的[替换成.
	_textObjectPath = _textObjectPath.replaceAll("[", ".")
	var _textObjectPaths = _textObjectPath.split(".")
	return _textObjectPaths


}
export default parseTextObjectPath