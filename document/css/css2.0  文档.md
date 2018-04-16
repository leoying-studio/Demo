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
	
# 图片垂直居中于div
 ## 1.使用tab-cell
```
	<body>
		<div>
			<img src="1.jpg" alt="haha">
		</div>
	</body>
	<style type="text/css">
		*{margin: 0;padding: 0;}
		div{
			width:150px;
			height: 100px;
			display: table-cell;
			vertical-align: middle;
			text-align: center;
			border:1px solid #000;
		}
		img {
			width: 50px;
			height: 50px;
		}
	</style>	
```
 ## 通过相对定位来实现
```
	<style type="text/css">
    *{margin: 0;padding:0;}
		div{
			width:150px;
			height: 100px;
			position: relative;
			border:1px solid #000;
		}
		img {
			width: 50px;
			height: 50px;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -25px; /* 高度的一半 */
			margin-left: -25px; /* 宽度的一半 */
		}
	</style>
```
通过position定位来实现。将div设置成相对定位relative，将img设置成绝对定位absolute，left:50%，top:50%，此时图片的左上角位于div的中心，
要是图片的中心位于div的中心，就需要将图片向上移动图片高度的一半，并向左移动图片宽度的一半。