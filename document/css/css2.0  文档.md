# 1.����Ԫ��ת���ɿ鼶Ԫ�صķ���.
	* ����display:block;
	* ����float
	* ���� position ������ת����inline-block;  �����ÿ��
	* һ���鼶Ԫ�����ö�λ֮�󣬴�ʱ�����ȥ���ÿ��������û�����ְٷְٵ�,��ʱ�Ѿ������ĵ���.

# 2. css�������
## 1.���ͨ��afterα��
```
	.clearfix:after {
    ��������content: '';
   �������� height: 0;
   �������� line-height: 0; /*�� overflow:hidden*/
    ��������display: block;
    ��������visibility: hidden;
    ��������clear: both;
��������}
��������.clearfix {
   �������� zoom: 1;  /*����ie6*/
��������}
```
## 2.ͨ��˫Ԫ��α��
```
����.clearfix:before,
��������.clearfix:after {
�������� content: '';
�������� display: table;
��������}
��������.clearfix:after {
��������  clear: both;
��������}
��������.clearfix {
��������  zoom: 1;
��������}
```
## 3.��������(���Ƽ�)
	1. ���ø������߶ȡ�
	2. ��Ԫ��ĩβ��ӿձ�ǩ������������ʽclear:both;
	3. ��Ԫ�����overflow:hidden.
	
# ͼƬ��ֱ������div
 ## 1.ʹ��tab-cell
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
 ## ͨ����Զ�λ��ʵ��
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
				margin-top: -25px; /* �߶ȵ�һ�� */
				margin-left: -25px; /* ��ȵ�һ�� */
			}
	</style>
```
ͨ��position��λ��ʵ�֡���div���ó���Զ�λrelative����img���óɾ��Զ�λabsolute��left:50%��top:50%����ʱͼƬ�����Ͻ�λ��div�����ģ�
Ҫ��ͼƬ������λ��div�����ģ�����Ҫ��ͼƬ�����ƶ�ͼƬ�߶ȵ�һ�룬�������ƶ�ͼƬ��ȵ�һ�롣

# div ��ֱ����
## 1.����������
```
	width: 150px;
    height: 100px;
    background: orange;
    position: absolute;
    top: 50%;
    margin: -50px 0 0 0;
```
## 2.����ڸ�����
```
	html���룺
		<div id="box">
			<div id="child">���ǲ���DIV</div>
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
������������Բ���������һ��Сȱ�㣺������ǰ֪�������п鼶Ԫ�صĳߴ磬�����޷�׼ȷʵ�ִ�ֱ���С�

## 3.����ڸ���������Ҫ���ø߶�
```
	<div id="child">
		����һ���ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ��ܳ����ı�
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
���ַ�����һ���ǳ����Եĺô����ǲ�����ǰ֪��������Ԫ�صĳߴ��ˣ���Ϊtransform��translateƫ�ƵİٷֱȾ��������Ԫ������ĳߴ���Եġ�

## 4.�����֣��ʺ�ͼƬ���ͻ��߹̶���ߵ�
```
	<div id="box">
		<div id="child">��������������(���n��)</div>
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
����ʵ�ַ�ʽ�����������ǣ���Ҫ��ֱ���е�Ԫ������ڸ�Ԫ�ؾ��Զ�λ��top��bottom��Ϊ��ȵ�ֵ�������������0����Ȼ��Ҳ������Ϊ99999px����-99999px����ʲô��ֻҪ������Ⱦ��У���һ������֮���ٽ�Ҫ����Ԫ�ص�margin��Ϊauto�����������ʵ�ִ�ֱ�����ˡ�
����������Ԫ�صĿ��Ҳ���Բ����ã��������õĻ��ͱ�����ͼƬ��������Ͱ����ߴ��Ԫ�أ������޷�ʵ�֡�
