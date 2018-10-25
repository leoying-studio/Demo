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
var SuperClass = /** @class */ (function () {
    function SuperClass() {
        this._versions = 1.0;
    }
    SuperClass.prototype.getVersions = function () {
        return this._versions;
    };
    SuperClass.prototype.exchangeSort = function (collections, orderBy) {
        if (orderBy === void 0) { orderBy = true; }
        for (var i = 0; i < collections.length; i++) {
            for (var j = 0; j < i; j++) {
                var ascend = orderBy ? collections[j] > collections[i] : collections[j] < collections[i];
                if (ascend) {
                    var el = collections[i];
                    collections[i] = collections[j];
                    collections[j] = el;
                }
            }
        }
    };
    return SuperClass;
}());
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Utils.prototype.removeByIndexs = function (collections, indexs) {
        this.exchangeSort(indexs);
        indexs.reverse();
        for (var i = 0; i < indexs.length; i++) {
            for (var j = 0; j < collections.length; j++) {
                if (j === indexs[i]) {
                    collections.splice(j, 1);
                    j--;
                    break;
                }
            }
        }
        return collections.slice();
    };
    Utils.prototype.removeByValues = function (collections, values, key) {
        var list = collections.slice();
        for (var i = 0; i < values.length; i++) {
            var value = typeof key !== 'undefined' ? values[i][key] : values[i];
            for (var j = 0; j < list.length; j++) {
                var item = typeof key !== 'undefined' ? list[i][key] : list[i];
                if (value === item) {
                    list.splice(j, 1);
                    j--;
                }
            }
        }
        return list;
    };
    Utils.prototype.findIndexByAttr = function (collections, key, item) {
        for (var i = 0; i < collections.length; i++) {
            var object = collections[i];
            if (object[key] === item[key]) {
                return i;
            }
        }
    };
    return Utils;
}(SuperClass));
var util = new Utils();
var remaining = util.removeByIndexs([1, 2, 3], [2]);
util.findIndexByAttr([{ name: 'zhangsan', age: 18 }, { name: 'zhangsan', age: 18 }], "", { name: 'ss', age: 18 });
var values = util.removeByValues(['1', '2', '3'], ['1', '2']);
console.log(values);
