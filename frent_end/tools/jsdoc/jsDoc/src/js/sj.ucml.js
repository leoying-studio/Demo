/** @description  [invoke 函数调用]
 * @param  {string} bpoName     [UCMLBPO名称]
 * @param  {number} params      [参数个数]
 * @param  {string} useGet      [请求方式GET Or Post]
 * @param  {boolean} async      [是否异步  true or  false]
 * @param  {callback} onSuccess [成功状态返回回调函数]
 * @param  {callback} onFailure [失败状态返回回调函数]
 * @param  {string} userContext [请求上下文]
 * @return {string} obj.text    [返回文本内容]
 * sj.ucml.invoke
 */
    invoke=function(bpoName, methodName, params, useGet, async, onSuccess, onFailure, userContext) {
	
	var _parameters = "";
	var parametCount = 0;
	var _paraNames = "";
	for (var n in params) {
		if (parametCount > 0) {
			_parameters += ",";
			_paraNames += ",";
		}
		_parameters += params[n];
		_paraNames += n;
		parametCount++;
	}


	var _pUrl = "";
	var sURL = window.document.URL.toString();
	while (true) {
		if (sURL.lastIndexOf("#") == (sURL.length - 1))
			sURL = sURL.substring(0, sURL.length - 1);
		else
			break;
	}

	if (sURL.indexOf("?") > 0) {
		var arrParams = sURL.split("?");
		_pUrl = arrParams[1];
	}

	params = {
		_bpoName: bpoName + "Service",
		_methodName: methodName,
		_parameters: params,
		_paraNames: _paraNames,
		s: 0,
		_pUrl: _pUrl
	};

    /**
     * @description  [ws4jspath  UCMLWebServiceEntryForJs.aspx所在的相对路径]
     */
	var ws4jspath=UCMLLocalResourcePath || "./";
	var path =ws4jspath + 'UCMLWebServiceEntryForJs.aspx';
	var meName = "";
	var dataType = "text";

	async = async == undefined ? true : async;
	var type = "post";
	if (useGet) {
		type = 'GET';
	}

	var opt = this;
	var soect = userContext || this;
	if (async) {
		$.ajax({
			type: type,
			dataType: dataType,
			url: path + '/' + meName,
			data: params,
			success: function(o) {
				var text = o;
				var obj = eval(o);
				if (obj && obj.status == 0) {
					onFailure.call(soect, o, obj.text, methodName);
				} else {
					onSuccess.call(soect, o, obj.text, methodName);
				}
			},
			error: function(o) {
				onFailure.call(soect, o, o.responseText, methodName);
			}
		});
	} else {
		var obj = $.ajax({
			type: type,
			url: path + '/' + meName,
			data: params,
			dataType: dataType,
			async: false
		});
		var text = obj.responseText;
		var obj = eval(text);
		if (obj && obj.status == 0 && onFailure) {
			onFailure.call(soect, text, obj.text, methodName);
		} else if (onSuccess) {
			onSuccess.call(soect, text, obj.text, methodName);
		}
		return obj.text;
	}
}

/**
 * @description [query_list     调用invoke,同上文传递参数]
 * @param  {string} bpoName     [UCML BPO名称]
 * @param  {string} bcName      [UCML BC名称]
 * @param  {number} nStartPos   [UCML 查询的开始行默认为0,即为从第一行开始]
 * @param  {string} nRecords    [需要查询的记录数，默认-1，即所有记录，可配置]
 * @param  {string} SQLCondi    [自定义sql语句]
 * @param  {string} useGet      [请求方式 Get or Post]
 * @param  {boolean} async      [是否异步 true or false]
 * @param  {callback} onSuccess [成功状态函数]
 * @param  {callback} onFailure [失败状态函数]
 * @param  {string} userContext [请求上下文]
 * @return {function}           [请求函数]
 */
    query_list=function(bpoName, bcName, nStartPos, nRecords, SQLCondi, useGet, async,onSuccess, onFailure, userContext) {
	nStartPos = nStartPos || 0;
	nRecords = nRecords || -1;
	SQLCondi = SQLCondi || '';
	var params = {
		BCName: bcName,
		nStartPos: nStartPos,
		nRecords: nRecords,
		fieldList: '',
		valueList: '',
		condiIndentList: '',
		SQLCondi: SQLCondi,
		SQLCondiType: 0,
		SQLFix: ''
	};
	var str = invoke(bpoName, "getCondiActorDataBCString", params, useGet, async,onSuccess, onFailure, userContext);
	return str;
}

/**
 * 同上参数，自动产生编号
 */
sj.ucml.get_no=function(_bponame,_tablename, _fieldname, isAsync, successCallback, failedCallback) {
	var params = {
		tablename: _tablename,
		fieldName: _fieldname
	},
	revalue;
	
	var async = isAsync || false;
	if (async == false) {
		//同步调用
		revalue = invoke(_bponame, "GetNo", params, undefined, async);
		return revalue;
	}
	else {
		invoke(_bponame, "GetNo", params, undefined, async, successCallback, failedCallback);
	}
}