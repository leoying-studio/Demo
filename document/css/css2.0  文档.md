# 1.����Ԫ��ת���ɿ鼶Ԫ�صķ���.
	* ����display:block;
	* ����float
	* ���� position ������ת���ɿ鼶Ԫ��

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