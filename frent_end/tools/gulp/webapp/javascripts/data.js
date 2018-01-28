

var d = {};
var host = "http://192.168.1.213:9090/mcw_web/";

$.ajaxSetup({ cache: false });
d.getJSON = function(param, sid, async){
    if(async === false)
        $.ajaxSetup({ async: false });
    else
        $.ajaxSetup({ async: true });
    var url = paramStringify(param, sid);
    var deferred = $.Deferred();
    $.getJSON(url).then(function(data) {
        if(data && data.status && data.status.code == 0)
            deferred.resolve(data);
        else if(data && data.status && data.status.code == -1000)
            window.location = "login.html"
        else
            deferred.reject(data);
    }, function() {
        deferred.reject();
    });
    return deferred;
};

d.postJSON = function(param, sid, async) {
    if(async === false)
        $.ajaxSetup({ async: false });
    else
        $.ajaxSetup({ async: true });
    var url = host + sid;
    var deferred = $.Deferred();
    $.post(url, param).then(function(data) {
        // data = JSON.parse(data);
        if(data && data.status && data.status.code == 0)
            deferred.resolve(data);
        else if(data && data.status && data.status.code == -1000)
            window.location = "login.html"
        else
            deferred.reject(data);
    }, function() {
        deferred.reject();
    });
    return deferred;
};

var paramStringify = function(param, sid){
    sid = (sid || "") + "?";
    var arr = [];
    for(var key in param){
        if(param.hasOwnProperty(key)){
            arr.push(key + "=" + encodeURI(param[key]));
        }
    }

    return host + sid + (arr.length ? arr.join("&") : "");
};


d.getApps = function(json) {
    json = json || {};
    return d.getJSON(json, "spp/listApp");
};


d.getAppById = function(json) {
    json = json || {};
    return d.getJSON(json, "spp/getAppById");
};

d.getAppsByKeyword = function(json) {
    json = json || {};
    return d.getJSON(json, "spp/keywordSearch");
};

d.getAppType = function(json) {
    json = json || {};
    return d.getJSON(json, "spp/getAppType");
};

d.getUserVin = function(json) {
    json = json || {};
    return d.getJSON(json, "vinUser/queryUserVin");
};

d.addBookRecord = function(json) {
    json = json || {};
    return d.getJSON(json, "vinServiceRecord/addServiceRecord");
};


d.getBookRecords = function(json) {
    json = json || {};
    return d.getJSON(json, "vinServiceRecord/queryVinServiceRecord");
};

d.addBookOrder = function(json) {
    json = json || {};
    return d.getJSON(json, "vinOrder/addServiceOrder");
};

d.addHistoryPoi = function(json) {
    json = json || {};
    return d.getJSON(json, "hisPoi/addHisPoi");
};

d.getHistoryPois = function(json) {
    json = json || {};
    return d.getJSON(json, "hisPoi/findHisPoi");
};

d.dropHistoryPoi = function(json) {
    json = json || {};
    return d.getJSON(json, "hisPoi/delHisPoi");
};

module.exports = d;