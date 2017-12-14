Math 对象新增属性:
	Integer: 判断数字是否是整数
	**  指数运算    5**2    //  结果为 25
	trunc 去除数字的小数部分  Math.trunc(25.55)
	sign  判断是否是整数 负数 还是零
	isFinite  判断是否是一个有限的数字
	
变量的解构:
	const [a,b,c,d] = "你好呀我的国"   //  你好呀，我的国;   目前为ES6 语法(react-native项目中出现偶尔解析失败的情况)
	
数组的新特性:
1.es6  map  提供了键值对的存取
   用法  var m = new Map();
		存：m.set("key","value");
		取: m.forEach(function(item,key,value){
			 console.log(item)
		});
和普通数组的区别是，不能有重复的，旧的会替换掉新的,是一种更加完善的hash 的组合。

2.es6  set 属性