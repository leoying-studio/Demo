
# 类型转换
> Number 转换机制:
```
  1. Number(true);  // 1;
  2. Number(false)  // 0;
  3. Number(undefined) //NaN;
  4.如果字符串中只包含数字，则将其转换为十进制数值，级“1”会变成1，“123”会变成123，而“011”会变成11（前面的0被忽略了）
  5.如果字符串中只包含有效的浮点格式，如“1.1”，则将其转换为对应浮点数值（同样，也会忽略前导零）
```

# apply bind call之间的用法和区别

```
	obj.bind(this, 123, 456)();  //  不会立即执行，返回一个闭包的函数。
	obj.call(thisObj, arg1, arg2, ...);
	obj.apply(thisObj, [arg1, arg2, ...]);
	两者作用一致，都是把obj(即this)绑定到thisObj，这时候thisObj具备了obj的属性和方法。或者说thisObj『继承』了obj的属性和方法。唯一区别是apply接受的是数组参数，call接受的是连续参数
	
```

# && 运算的秒用.

```
	return 1 && 2; // 返回2;
	return 0 && 1; // 返回0;
	return false && test(); // test方法不会执行。

```
总结： && 除了逻辑判断，还可以和语句共同使用。 如果 && 之前的语句为转换为true && 后面的才会执行。