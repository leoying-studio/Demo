# 1.����Ԫ��ת���ɿ鼶Ԫ�صķ���.
	* ����display:block;
	* ����float
	* ���� position ������ת���ɿ鼶Ԫ��

# 2. css�������
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