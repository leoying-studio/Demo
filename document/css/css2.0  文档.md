# 1.行内元素转换成块级元素的方法.
	* 设置display:block;
	* 设置float
	* 设置 position 都可以转换成inline-block;  可设置宽度
	* 一个块级元素设置定位之后，此时如果不去设置宽度容器是没法保持百分百的,此时已经脱离文档流.

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

# div 垂直居中
## 1.相对于浏览器
```
	width: 150px;
    height: 100px;
    background: orange;
    position: absolute;
    top: 50%;
    margin: -50px 0 0 0;
```
## 2.相对于父容器
```
	html代码：
		<div id="box">
			<div id="child">我是测试DIV</div>
		</div>

		#box {
			width: 300px;
			height: 300px;
			background: #ddd;
			position: relative;
		}
		#child {
			width: 150px;
			height: 100px;
			background: orange;
			position: absolute;
			top: 50%;
			margin: -50px 0 0 0;
			line-height: 100px;
		}
```
这个方法兼容性不错，但是有一个小缺点：必须提前知道被居中块级元素的尺寸，否则无法准确实现垂直居中。

## 3.相对于父容器不需要设置高度
```
	<div id="child">
		我是一串很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本
	</div>
	#box {
		width: 300px;
		height: 300px;
		background: #ddd;
		position: relative;
	}
	#child {
		background: #93BC49;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
	}
```
这种方法有一个非常明显的好处就是不必提前知道被居中元素的尺寸了，因为transform中translate偏移的百分比就是相对于元素自身的尺寸而言的。

## 4.第四种，适合图片类型或者固定宽高的
```
	<div id="box">
		<div id="child">呆呆今天退役了(。﹏。)</div>
	</div>
	#box {
		width: 300px;
		height: 300px;
		background: #ddd;
		position: relative;
	}
	#child {
		width: 200px;
		height: 100px;
		background: #A1CCFE;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
		line-height: 100px;
	}

```
这种实现方式的两个核心是：把要垂直居中的元素相对于父元素绝对定位，top和bottom设为相等的值，我这里设成了0，当然你也可以设为99999px或者-99999px无论什么，只要两者相等就行，这一步做完之后再将要居中元素的margin设为auto，这样便可以实现垂直居中了。
　　被居中元素的宽高也可以不设置，但不设置的话就必须是图片这种自身就包含尺寸的元素，否则无法实现。
