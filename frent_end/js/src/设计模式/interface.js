

/**
 * 鸭式辨形约定接口
 */
function Interface(name, methods) {
	this.name = name;
	this.methods = [];
	// 这里只是为了检测传入的是不是字符串
	for (var k = 0; k < methods.length; k++) {
		if (typeof methods[k] !== "string") {
			throw new Error("method 需要string类型");
		}
		// 是字符串的就重新添加到当前对象的新的数组中
		this.methods.push(methods[k]);
	}
}
	// 这里只是为了检测当前的需要检测的接口是不是通过new interface得来的
	// 大的方向还是为了判断之前定义的方法名称，检测是否有这个方法名称属性
Interface.checkImplements = function(object) {
	var args = arguments;
	if (args.length < 2) {
		throw new Error("error");
	}
	for (var i = 1 ; i < args.length; i++) {
		var arg = args[i];
		// 主要是这里检测constructor 如果是new Interface 定义的接口示例，肯定是正确的。
		// 我个人认为也大可不去判断, 既然用了接口又不去用这个工具实例化，实在不能理解
		// 主要为了防止  new A('name', ['get', 'set'])； 类似这种
		if (arg.constructor !== Interface) {
			  throw new Error(arg+'不是所需接口实例');  
		}
		// 这一步实际上还是去判断当前的对象中是否存在该属性， 如果没有有该属性就抛出异常
		for(var i = 0;i<arg.methods.length;i++){  
			var methodName = arg.methods[i];  
			if( !object[methodName] || typeof object[methodName] !=='function'){  
				throw new Error(methodName+'不是函数或没有被实现');  
			}  
		}  
	}
}
