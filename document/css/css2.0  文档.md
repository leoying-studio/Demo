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