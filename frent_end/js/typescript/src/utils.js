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
    return Utils;
}());
