
/**第一种方式
 * [UrlParam 函数名]
 * 解析地址栏URL地址，并将对应的键和值解析到对象，方便调用
 * @param {string} url [目标页获取URL地址]
 * @example
 * var url = document.window.document.url;
 * var Back = UrlParam(url);
 * key为键，通过对象的键名来获取值
 */
	function UrlParam(url)
	{
		if(!url)
			url = window.document.url;
		var strR='';
		url =  decodeURI(url);
		var urls =url.split(/[?]/);
		if(urls.length>0)
		{
			var params = urls[1].split(/[&]/);
			var keyVal ="";
			for(var i = 0;i<params.length;i++)
			{
				var p =params[i].split(/[=]/);
				var p1=p[0];
				var p2=p[1];
				strR +='"'+p1+'"'+":"+'"'+p2+'"'+",";
			}
		}
		if(strR)
		{
			var subStr = strR.substring(0,strR.length-1);
			strR='{'+subStr+'}';
		}
		alert(strR);
		var obj= JSON.parse(strR);
		return obj;
	}


/**第二种方式
 * [UrlParam2 函数名]
 * 解析地栏URL地址，并将对应的键和值解析到对象，方便调用
 * @param {string} url [目标页获取URL地址]
 * @example
 * var url = document.window.document.url;
 * var Back = UrlParam(url);
 * Back.key
 * *********************************<br />
 * key为键，通过对象的键名来获取值
 */
	function UrlParam2(url)
			{
				//var url = decodeURI(window.document.URL);
				var urlArr = url.split(/[?]/);
				var objStr = urlArr[1].split(/[&=]/);
				console.log(objStr);
				var key =[];
				var val =[];
				for (var i = 0; i < objStr.length; i++) 
				{
					if (i%2==0) 
					{
					    key.push(objStr[i]);
					}
					else
					{
						val.push(objStr[i]);
					}	    
				}
				var arr="";
				for (var j = 0; j < key.length; j++) {
					arr+='"'+key[j]+'"'+":"+'"'+val[j]+'"'+",";
				}
				var numLen = arr.length-1;
				var subChar = arr.substring(0,numLen);
				var r ="{"+subChar+"}";
				var jsonfiy = JSON.parse(r);
				return jsonfiy;
			}
