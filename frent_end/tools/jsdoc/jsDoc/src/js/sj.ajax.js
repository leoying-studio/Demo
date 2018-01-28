    /**
     * Get方式获取json数据
     * @param {String} url  请求地址
     * @param {Object} option
     * @param {Boolean} _async  是否异步
     * @param {Function} truecall
     * @param {Function} failedcall
     */
	sj.ajax = function(url, option,_async,truecall,failedcall) {
    var param = {};
    var result; 
    /**
     * 设置参数
     */
    param.type = "GET";
    var str = JSON.stringify(option);
    if (option === "") str = "";
    param.url = url + str;
    param.data = option;
    param.datatype = "json";
    _async = _async || false;
    param.async = _async;
    if (_async == true) param.success = truecall;
    else {
    	/**
    	 * @param {Object} data 请求成功后返回的数据
    	 */
        param.success = function (data) {
            if (data != null) {
                /**
                 * c:0,//消息编码0成功 1－29服务端错误  30-39权限错误  50-80客户端错误
                 * t:'',//消息文本  d:{}
                 * 返回的数据
                 */
                var data_json = {};
                try {
                    data_json = JSON.parse(data);
                } catch (e) {
                    data_json.c = 1;
                    data_json.t = data;
                }
                if (data_json.c == 0) {	
                	/**
                	 * 成功时返回序列化的json
                	 */
                    result = data_json;
                }
                else {
                    alert(data_json.t);
                }
            }
        };
    }
    if (_async == true) param.error = failedcall;
    else {
        param.error = function (data) {
            alert("错误消息:" + data);
        };
    }
	/**
	 * 设置参数完成
	 */
    $.ajax(param);
    if (_async == false) return result;
}
  