var fs = require("fs");
var files = ["js","css"];

module.exports = function mkdir(path, dir) {
	var dirAll = fs.readdirSync(path);
	dirAll.forEach(function(filename) {
			// 如果是文件夹
			var stat = fs.statSync(path + "/" + filename);
			if (stat && fs.readdirSync(path + "/" + filename).length>0) {
					files.forEach(function(file) {
						fs.mkdirSync(path+"/"+file);
					});
			}else {
				mkdir(path + "/" + filename);
			}
	});
}


