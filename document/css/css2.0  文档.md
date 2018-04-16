# 1.行内元素转换成块级元素的方法.
	* 设置display:block;
	* 设置float
	* 设置 position 都可以转换成块级元素

# 2. css清除浮动
## 1.清除通过after伪类
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
## 2.通过双元素伪类
```
　　.clearfix:before,
　　　　.clearfix:after {
　　　　 content: '';
　　　　 display: table;
　　　　}
　　　　.clearfix:after {
　　　　  clear: both;
　　　　}
　　　　.clearfix {
　　　　  zoom: 1;
　　　　}
```
## 3.其他方法(不推荐)
	1. 设置父容器高度。
	2. 子元素末尾添加空标签，并且设置样式clear:both;
	3. 父元素添加overflow:hidden.