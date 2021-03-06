﻿		/**
		 * 组件调用示例:
		 * var dictOption={
		 * dict:{id:'A10001',name:'收费项目'},
		 * //filter 为kendo UI过滤条件，通过地址栏获取该条件后实现本地过滤
		 * filter:{field: "code", operator: "lt", value: "3600" },
		 * title:'收费项目',
		 * width:600,
		 * height:500,
		 * serVal:val,
		 * onSelected:function(data)
		 *    {
		 * 			alert(data.name+""+data.code);
		 *    }
		 * }
		 * sj.dict.show (dictOption);

		 * [call_back_sj_dict_show UCML系统框架的回调函数必须是全局的]
		 * @param {string} data [选中行后返回的当前数据]
		 * 在目标页面中使用UCML内置函数调用该方法
		 * call_back_sj_dict_show
		 */
		function call_back_sj_dict_show(data)
		{
			sj.dict.show.option.onSelected(data);
		}

		/**
		 * [show 对象属性]
		 * @param  {Object}  option 传入的字典对象属性
		 * 模块化封装函数
		 * 调用sj.dict.show(option),option为外部定义字典
		 * 定义目标页面URL，并将option对象连接为URL参数
		 * UCML.OpenShowWindow为UCML内部封装为UCML弹窗函数,弹窗时刻传递URL
		 * 目标页面开始接收，并解析URL参数
		 */
		sj.dict.show = function (option)
		{   
			sj.dict.show.option=option;
			var strOp=encodeURI(JSON.stringify(option));
			var url ="./sj_js/sj.dict/sj_dict.htm?callbackFn=call_back_sj_dict_show&param="+strOp;
			//console.log(url);
			var title = option.title || "字典";
			var w = option.width || 800;
			var h = option.height || 600;
			/**
			 * 调用UCML弹窗
			 */
			var win = new UCML.OpenShowWindow(
			{ 
				frameMode: "frame", 
				maximizable: true,
				collapsible: true, 
				URL: url, 
				scroll: "yes", 
				draggable: true,
				resizable: true, 
				height:h,
				width:w,
				title: title
			});
		   win.open();	 
		}