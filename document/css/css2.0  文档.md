# 1.行内元素转换成块级元素的方法.
	* 设置display:block;
	* 设置float
	* 设置 position 都可以转换成块级元素

# 2. css清除浮动
```
	.clearfix:after {
    　　　　content: '';
   　　　　 height: 0;
   　　　　 line-height: 0; /*或 overflow:hidden*/
    　　　　display: block;
    　　　　visibility: hidden;
    　　　　clear: both;
　　　　}
　　　　.clearfix {
   　　　　 zoom: 1;  /*兼容ie6*/
　　　　}
```