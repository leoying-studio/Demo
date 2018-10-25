"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var index_1 = require("./index");
// 枚举
var sex;
(function (sex) {
    sex["man"] = "\u7537";
    sex["woman"] = "\u5973";
})(sex || (sex = {}));
var People = /** @class */ (function (_super) {
    __extends(People, _super);
    function People(name, age, gender, id, address) {
        var _this = _super.call(this, name, age, gender) || this;
        _this._address = address;
        _this._id = id;
        return _this;
    }
    People.prototype.drink = function () {
        return 'string';
    };
    People.prototype.run = function () {
        return 'run';
    };
    People.prototype.sort = function (o) {
        o.map(function (a, b) {
            return {
                name: a.name,
                age: a.age
            };
        });
    };
    People.prototype.getData = function (type) {
        return type;
    };
    //  简单泛型
    People.prototype.getArrayData = function (value) {
        var arr = [];
        for (var i = 0; i < 100; i++) {
            arr.push(value);
        }
        return arr;
    };
    // 简单泛型
    People.prototype.getCoustomData = function (type) {
        var len = type.length;
        return type;
    };
    // 复杂泛型
    People.prototype.setArr = function (name, age) {
        return [name, age];
    };
    return People;
}(index_1["default"]));
var p = new People('张三', 24, sex.man, '421302', '湖北');
p.sort([{ name: "zhang", age: 18 }]);
p.setArr('张三丰', 18);
var say = p.getData("sayHello");
console.log(say);
