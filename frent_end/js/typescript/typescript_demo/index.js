"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
    function Person(name, age, gender) {
        this._age = age;
        this._name = name;
        this._gender = gender;
    }
    ;
    Person.prototype.eat = function () {
        console.log(this._age);
    };
    return Person;
}());
exports["default"] = Person;
