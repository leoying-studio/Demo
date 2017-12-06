var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @param startTime  开始时间
     * @param endTinme   结束时间
     */
    Utils.countDown = function (startTime, endTime) {
        if (typeof startTime == "string") {
            startTime = new Date(startTime);
        }
        if (typeof endTime == "string") {
            endTime = new Date(endTime);
        }
        var countTime = (endTime - startTime) / 1000;
        var day = Math.floor(countTime / 3600 / 24);
        var hour = Math.floor((countTime / 3600) % 24);
        var minutes = Math.floor((countTime / 60) % 60);
        var second = Math.floor(countTime % 60);
        return {
            day: day,
            hour: hour,
            minutes: minutes,
            second: second
        };
    };
    /**
     *
     * @param date 时间对象
     * @param accuracy  精确度 (日，或者分，秒)
     */
    Utils.timeStr = function (date, accuracy) {
        if (typeof date != "object") {
            console.error("请传入一个时间对象");
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();
        if (accuracy == "day" || accuracy == "d") {
            return year + "-" + month + "-" + day;
        }
        else if (accuracy == "second" || accuracy == "s") {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
        }
        else {
            return year + "-" + month + "-" + day + " " + hour + ":" + minutes;
        }
    };
    /**
     *
     * @param data
     * @param type
     */
    Utils.validate = function (data, type) {
        if (typeof data != "string") {
            console.error("请传入string类型");
        }
        var regPhone = /^1(3|4|5|7|8)\d{9}$/;
        var regCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        var regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (type == "phone" || type == "mobile") {
            if (regPhone.test(data)) {
                return true;
            }
        }
        else if (type == "card" || type == "id") {
            if (regCard.test(data)) {
                return true;
            }
        }
        else {
            if (regEmail.test(data)) {
                return true;
            }
        }
        return false;
    };
    return Utils;
}());
