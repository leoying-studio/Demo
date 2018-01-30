/**
 * [htmltemple HTMLDOM模板]
 */
var htmltemple = "\n\t\t<div id=\"box\">\n\t\n\t\t\t<ul>\n\t\t\t\t<li>\n\t\t\t\t<h5>\u63A7\u4EF6\u7C7B\u578B:</h5>\n\t\t\t\t<div id=\"typeBox\">\n\t\t\t\t\t\t<span><input type=\"radio\" class=\"type\" name=\"type\" id=\"simple\"/>\u7B80\u5355</span>\n\t\t\t\t\t\t<span><input type=\"radio\" class=\"type\" name=\"type\" id=\"autoComplete\"/>\u81EA\u52A8\u5B8C\u6210</span>\n\t\t\t\t\t\t<span><input type=\"radio\" class=\"type\" name=\"type\" id=\"dropdownList\"/>\u4E0B\u62C9\u5217\u8868</span>\n\t\t\t\t</div>\n\t\t\t<li>\n\t\t\t<li>\n\t\t\t\t<h5>\u6570\u636E\u7C7B\u578B:</h5>\n\t\t\t\t<ul id=\"typeList\">\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u6587\u672C</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u6574\u6570</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u5C0F\u6570</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u590D\u9009\u6846</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u65E5\u671F</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u65F6\u95F4</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u65E5\u671F\u65F6\u95F4</li>\n\t\t\t\t\t\t\t<li><input type=\"radio\" class=\"typeWidget\" name=\"typeWidget\">\u540D\u79F0\u503C\u5BF9</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li id=\"multi_selectBox\">\n\t\t\t\t\t<h5>\u662F\u5426\u591A\u9009:</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li class=\"rad\"><input type =\"radio\" id=\"more\" name=\"radio\"/>\u662F</li>\n\t\t\t\t\t\t<li class=\"rad\" style=\"float:none;\"><input type=\"radio\" id=\"only\" name=\"radio\"/>\u5426</li>\n\t\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\n\t\t\t<li>\n\t\t\t\t\t<h5>\u63D0\u793A\u4FE1\u606F</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\u63D0\u793A:<input type=\"text\" id=\"hintText\" value=\"\"/></li>\n\t\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li id=\"symbolBox\">\n\t\t\t\t\t<h5>\u5206\u5272\u7B26\u53F7</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\u7B26\u53F7:<input type=\"text\" id=\"separator\" value=\",\"/></li>\n\t\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t\t<h5>\u5360\u4F4D\u7B26\u53F7</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\u5360\u4F4D:<input type=\"text\" id=\"place\"  placeholder=\"\u8BF7\u8F93\u5165\u5185\u5BB9\" value=\"\u8BF7\u8F93\u5165\u5185\u5BB9\"/></li>\n\t\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t\t<h5>\u9ED8\u8BA4\u53D6\u503C</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li>\u9ED8\u8BA4:<input type=\"text\" id=\"default_value\" value=\"\"></li>\n\t\t\t\t\t</ul>\n\t\t\t</li>\n\t\t\t<li id=\"dataSource\">\n\t\t\t\t\t<h5>\u914D\u7F6E\u6570\u636E\u6E90</h5>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<table id=\"table\">\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td>\u540D\u79F0</td>\n\t\t\t\t\t\t\t\t\t\t\t<td>\u503C</td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"name\" value=\"\u5434\u5B5F\u8FBE\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"value\" value=\"1\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><a href=\"#\" class=\"delete\" onClick=\"del(this);return false;\">\u5220\u9664</a></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"name\" value=\"\u90DD\u90B5\u6587\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"value\" value=\"2\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><a href=\"#\" class=\"delete\" onClick=\"del(this);return false;\">\u5220\u9664</a></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"name\" value=\"\u91CA\u5C0F\u9F99\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"value\" value=\"3\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><a href=\"#\" class=\"delete\" onClick=\"del(this);return false;\">\u5220\u9664</a></td>\n\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"name\" value=\"\u5F20\u536B\u5065\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><input type=\"text\" class=\"value\" value=\"4\"/></td>\n\t\t\t\t\t\t\t\t\t\t\t<td><a href=\"#\" class=\"delete\" onClick=\"del(this);return false;\">\u5220\u9664</a></td>\n\t\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type=\"button\" value=\"\u6DFB\u52A0\" id=\"addDataSource\" class=\"btn\"/>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\n\t\t\t\t\t</ul>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t    <div><input type =\"button\" value=\"\u521B\u5EFA\" id=\"create_Btn\" class=\"btn btn-large btn-info\"></div>\n    </div>\n\t<div id=\"TestBox\" style=\"display:none;\">\n\t\t<!--<input type=\"button\" value=\"\u6D4B\u8BD5\" id=\"Test_btn\" disabled=\"true\"/>-->\n\t\t<!--<ul>\n\t\t\t<li><h5>\u4E8B\u4EF6\u7C7B\u578B</h5></li>\n\t\t\t<ul>\n\t\t\t\t<li><input type=\"radio\" name=\"event\" id=\"onchange\">\u6539\u53D8\u9009\u9879</li>\n\t\t\t\t<li><input type=\"radio\" name=\"event\" id=\"onseleted\">\u9009\u4E2D\u9009\u9879</li>\n\t\t\t</ul>\n\t\t</ul>-->\n\t\t<div id=\"returnListBox\" style=\"padding:15px;\">\n\t\t\t<ul id=\"return_ul\">\n\t\t\t\t<li><h5>\u8FD4\u56DE\u7C7B\u578B</h5></li>\n\t\t\t\t<ul>\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getValue\"/>getValue:string[]|string|name_value|name_value[]</li>\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getText\"/>getText:string</li>\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getItems\"/>getItems:string[] | name_value[]</li>\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getItemIndex\"/>getItemIndex:number</li>\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getCheckedIndex\"/>getCheckedIndex:number[]</li>\t\n\t\t\t\t\t\t<li><input type=\"button\" class=\"backType btn btn-info\" name=\"backType\" value=\"getIsChecked\"/>getIsChecked:boolean</li>\n\t\t\t\t</ul>\n\t\t\t</ul>\n\t\t</div>\n\t\t\n\t</div>\n\t\n";
//# sourceMappingURL=htmlTemp.js.map