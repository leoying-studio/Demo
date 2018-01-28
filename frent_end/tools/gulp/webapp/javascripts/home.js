(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var home = Reflux.createActions([
    "addHistoryPoi",
    "getHistoryPois",
    "dropHistoryPoi"
]);

module.exports = home;
},{}],2:[function(require,module,exports){

var store = Reflux.createActions([
    "getAppType",
    "getApps",
    "getAppsByKeyword",
    "getFreeApps",
    "getAppsByType",
    "getUserVin",
    "addBookRecord",
    "addBookOrder",
    "getBookRecords",
    "getAppById"
]);

module.exports = store;
},{}],3:[function(require,module,exports){

var Header = require("./header");
var HomeNav = require("./homeNav");
var HomeMain = require("./homeMain");
var homeAction = require("../actions/home");
var homeStore = require("../stores/home");
var storeAction = require("../actions/store");
var storeStore = require("../stores/store");

var Home = React.createClass({displayName: 'Home',
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
            poi:{poiList:{pois:[]}},
            vins:[],
            historyPois:[],
            outPlan:true
        }
    },

    markers:[],

    componentDidMount: function() {
        this.listenTo(storeStore, this._storeCallBack);
        this.listenTo(homeStore, this._homeCallBack);
    },

    _storeCallBack: function(keyword, data) {
        switch (keyword){
            case "getUserVin":
                this.setState({vins:data.data||[]});
                vin = this.state.vins[0];
                break;
        }
    },

    _homeCallBack: function(keyword, data) {
        switch (keyword){
            case "addHistoryPoi":
                homeAction.getHistoryPois({taobaoId:taobaoId});
                infoWindow.setMap();
                infoWindow.relativeMarker = null;
                break;
            case "getHistoryPois":
                this.setState({historyPois:data.data||[]});
                break;
        }
    },

    searchPOI: function(keyword) {
        var that = this;
        map.plugin(["AMap.PlaceSearch"], function() {
            var MSearch = new AMap.PlaceSearch({pageSize: 5});
            AMap.event.addListener(MSearch, "complete", function(data) {that._searchCallBack(data);});
            MSearch.searchInBounds(keyword, map.getBounds());
        }); 
        this.setState({outPlan:true});
    },

    _searchCallBack: function(data) {
        console.log(data);
        this.setState({poi:data});
        this.addMarker(data);
    },

    addMarker: function(data) {
        var pois = data.poiList.pois;
        var marker;
        for(var i=0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        infoWindow.setMap();
        this.markers = [];
        for(i=0; i < pois.length; i++) {
            marker = new AMap.Marker({
                content:'<div class="poi-marker">'+String.fromCharCode(65+i)+'</div>',
                map:map,
                position:new AMap.LngLat( pois[i].location.getLng(), pois[i].location.getLat())
            });
            marker.refdata = pois[i];
            this.markers.push(marker);
            AMap.event.addListener(marker, "click", this.markerClick);
        }
    },

    markerClick: function(e) {
        var lnglat = e.target.getPosition();
        var data = e.target.refdata;
        if(infoWindow.relativeMarker == e.target){
            infoWindow.setMap();
            infoWindow.relativeMarker = null;
        }
        else{
            infoWindow.setContent('<div class="info-window">\
                                <a class="close"></a>\
                                <div class="title">'+data.name+'</div>\
                                <div class="content">'+data.address+'</div>\
                                <div class="comment"><input type="text" /><i></i></div>\
                            </div>');
            infoWindow.setMap(map);
            infoWindow.relativeMarker = e.target;
            infoWindow.setPosition(lnglat);
        }
    },

    homeSearch: function(keyword) {
        $(this.getDOMNode()).addClass("search");
        this.searchPOI(keyword);
        this.setState({outPlan:true});
    },

    showAddressBook: function() {
        $(this.getDOMNode()).addClass("search");
        this.setState({outPlan:false});
    },

    render: function() {
        return (
            React.createElement("div", {className: "body"}, 
                React.createElement(Header, {vins: this.state.vins}), 
                React.createElement(HomeNav, {homeSearch: this.homeSearch, showAddressBook: this.showAddressBook}), 
                React.createElement(HomeMain, {outPlan: this.state.outPlan, poi: this.state.poi, searchPOI: this.searchPOI, historyPois: this.state.historyPois})
            )
        );
    }
});
// module.exports = Home;

React.render(React.createElement(Home, null), document.body);
storeAction.getUserVin();

var taobaoId = "T003";
homeAction.getHistoryPois({taobaoId:taobaoId});
var vin = {};
var position = new AMap.LngLat(121.43068313598633, 31.20410238002499);
var map = new AMap.Map("map", {
    center: position,
    level: 14
});
var infoWindow = new AMap.Marker({
    content:'',
    offset:new AMap.Pixel(-140, -160)
});

$("body").on("click",".info-window .comment i", function(e){
    var data = infoWindow.relativeMarker.refdata;
    var content = $(e.target).closest(".comment").find("input").val();
    homeAction.addHistoryPoi({taobaoId:taobaoId, vin:vin.vin, address:data.address, x:data.location.getLng(),y:data.location.getLat(),content:content});
})

$("body").on("click",".info-window .close", function(e){
    infoWindow.setMap();
    infoWindow.relativeMarker = null;
})


},{"../actions/home":1,"../actions/store":2,"../stores/home":8,"../stores/store":9,"./header":4,"./homeMain":5,"./homeNav":6}],4:[function(require,module,exports){

var header = React.createClass({displayName: 'header',
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
        }
    },

    componentDidMount: function() {
    },


    render: function() {
        var vins = this.props.vins;
        var vindom = vins.map(function(item, i) {
            return (
                React.createElement("div", {className: "equipment-item"}, React.createElement("span", {className: "equipment-icon"}), React.createElement("span", {className: "equipment-name"}, item.brand + " " + item.exhaustVolume + " " +item.memo + " " +item.model + " " +item.transmission), React.createElement("span", {className: "equipment-status"}, "休眠")
                            )
                )
        });
        return (
            React.createElement("header", {className: "raw-cols"}, 
                React.createElement("div", {className: "bg"}), 
                React.createElement("div", {className: "user raw-2-5 raw-sm-2-5 raw-md-1-5 raw-lg-3-24"}, 
                    React.createElement("span", {className: "user-avator"}, React.createElement("img", {src: "images/avator.jpg"})), React.createElement("span", {className: "user-name"}, "Elena")
                ), 
                React.createElement("div", {className: "equipment raw-2-5 raw-sm-2-5 raw-md-3-5 raw-lg-18-24"}, 
                    React.createElement("div", {className: "equipment-list"}, 
                        React.createElement("div", {className: "left"}, React.createElement("i", null), React.createElement("div", null, "设备管理器")), 
                        React.createElement("div", {className: "right"}, 
                            vindom
                        )
                    )
                ), 
                React.createElement("div", {className: "loginlogout raw-1-5 raw-sm-1-5 raw-md-1-5 raw-lg-3-24"}, 
                    React.createElement("div", {className: "logout"}, React.createElement("a", null, "退出")
                    )
                )
            )
        );
    }
});
module.exports = header;

},{}],5:[function(require,module,exports){

var homeMain = React.createClass({displayName: 'homeMain',
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
            outPlan:true
        }
    },

    componentDidMount: function() {
    },

    componentWillReceiveProps :function(props) {
        this.setState({outPlan:props.outPlan});
    },

    search: function(e) {
        if(e.which===13 || e.keyCode === 13)
            this.props.searchPOI($(e.target).val());
    },

    outPlan: function() {
        this.setState({outPlan:true});
    },

    historyAddress: function() {
        this.setState({outPlan:false});
    },


    render: function() {
        var poi = this.props.poi;
        var historyPois = this.props.historyPois;
        var outPlan = this.state.outPlan;
        var poidom = poi.poiList.pois.map(function(item,i) {
            return (
                React.createElement("div", {className: "address-item"}, 
                    React.createElement("div", {className: "address-item-icon"}, String.fromCharCode(65+i)), 
                    React.createElement("div", {className: "address-item-content"}, React.createElement("div", null, item.name), React.createElement("div", null, item.address))
                )
                )
        });

        var historydom = historyPois.map(function(item,i) {
            return (
                React.createElement("div", {className: "address-item"}, 
                    React.createElement("div", {className: "address-item-content"}, React.createElement("div", null, item.address), React.createElement("div", null, item.content))
                )
                )
        });
        return (
            React.createElement("main", null, 
                React.createElement("section", {className: "map"}, 
                    React.createElement("div", {className: "main-wrap"}, 
                        React.createElement("div", {id: "map"}), 
                        React.createElement("div", {className: "history"}, 
                            React.createElement("ul", null, React.createElement("li", {className: outPlan?"selected out":"out", onClick: this.outPlan}, React.createElement("div", null, "出行规划")), React.createElement("li", {className: outPlan?"address":"selected address", onClick: this.historyAddress}, React.createElement("div", null, "地址薄"))), 
                            React.createElement("div", {style: outPlan?{display:"block"}:{display:"none"}}, 
                                React.createElement("div", {className: "address-search"}, React.createElement("input", {type: "text", onKeyPress: this.search}), React.createElement("i", null)), 
                                poidom
                            ), 
                            React.createElement("div", {style: outPlan?{display:"none"}:{display:"block"}}, 
                                historydom
                            )
                        ), 
                        React.createElement("div", {className: "car-status"}, React.createElement("span", {className: "car-status-title"}, "车辆状态"), React.createElement("span", {className: "scan-car"}, "全车扫描")
                        )
                    )
                )
            )
        );
    }
});
module.exports = homeMain;

},{}],6:[function(require,module,exports){

var homeNav = React.createClass({displayName: 'homeNav',
    mixins: [Reflux.ListenerMixin],

    getInitialState: function() {
        return {
        }
    },

    componentDidMount: function() {
    },

    search: function(e) {
        console.log(e);
        var keyword = $(e.target).closest("span").find("input").val();
        if(e.type=="keypress"&&e.which===13 || e.keyCode === 13)
            this.props.homeSearch(keyword);
        else if(e.type=="click")
            this.props.homeSearch(keyword);
    },

    showAddressBook: function(){
        this.props.showAddressBook();
    },


    render: function() {
        return (
            React.createElement("nav", {className: "raw-cols"}, 
                React.createElement("div", {className: "main raw-1-5 raw-sm-1-5 raw-md-6-24"}, 
                    React.createElement("div", {className: "main-wrap"}, 
                        React.createElement("div", {className: "more-icon"}), 
                        React.createElement("dl", null, 
                            React.createElement("dd", {className: "car selected"}, React.createElement("a", {href: "home.html"}, "我的爱车")), 
                            React.createElement("dd", {className: "shop"}, React.createElement("a", {href: "store.html"}, "服务商店")), 
                            React.createElement("dd", {className: "orders"}, "订购记录")
                        )
                    )
                ), 
                React.createElement("div", {className: "sub"}, 
                    React.createElement("div", {className: "sub-wrap raw-cols", style: {textAlign:"center"}}, 
                        React.createElement("span", {className: "out-notes"}, "出行规划"), React.createElement("span", {className: "address-search"}, React.createElement("input", {type: "text", onKeyPress: this.search}), React.createElement("i", {onClick: this.search})), React.createElement("span", {className: "address-book", onClick: this.showAddressBook})
                    )
                )
            )
        );
    }
});
module.exports = homeNav;

},{}],7:[function(require,module,exports){


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
},{}],8:[function(require,module,exports){

var d = require("../data");
var homeAction = require("../actions/home");


var home = Reflux.createStore({
    init: function() {
        this.listenTo(homeAction.addHistoryPoi, this.addHistoryPoi);
        this.listenTo(homeAction.getHistoryPois, this.getHistoryPois);
        this.listenTo(homeAction.dropHistoryPoi, this.dropHistoryPoi);
    },

    addHistoryPoi: function(poi) {
        var that = this;
        d.addHistoryPoi(poi).then(function(data) {
            that.trigger("addHistoryPoi", data);
        });
    },

    getHistoryPois: function(vinortaobaoid) {
        var that = this;
        d.getHistoryPois(vinortaobaoid).then(function(data) {
            that.trigger("getHistoryPois", data);
        });
    },

    dropHistoryPoi: function(hisid) {
        var that = this;
        d.dropHistoryPoi(hisid).then(function(data) {
            that.trigger("dropHistoryPoi", data);
        });
    }


});

module.exports = home;
},{"../actions/home":1,"../data":7}],9:[function(require,module,exports){

var d = require("../data");
var storeAction = require("../actions/store");


var store = Reflux.createStore({
    init: function() {
        this.listenTo(storeAction.getAppType, this.getAppType);
        this.listenTo(storeAction.getApps, this.getApps);
        this.listenTo(storeAction.getAppsByKeyword, this.getAppsByKeyword);
        this.listenTo(storeAction.getFreeApps, this.getFreeApps);
        this.listenTo(storeAction.getAppsByType, this.getAppsByType);
        this.listenTo(storeAction.getUserVin, this.getUserVin);
        this.listenTo(storeAction.getBookRecords, this.getBookRecords);
        this.listenTo(storeAction.addBookRecord, this.addBookRecord);
        this.listenTo(storeAction.addBookOrder, this.addBookOrder);
        this.listenTo(storeAction.getAppById, this.getAppById);
    },

    getAppType: function() {
        var that = this;
        d.getAppType().then(function(data) {
            that.trigger("getAppType", data);
        });
    },

    getApps: function() {
        var that = this;
        d.getApps().then(function(data) {
            that.trigger("getApps", data);
        });
    },

    getAppsByKeyword: function(keyword) {
        var that = this;
        d.getAppsByKeyword(keyword).then(function(data) {
            that.trigger("getAppsByKeyword", data);
        });
    },

    getFreeApps: function() {
        var that = this;
        d.getApps({isFree:1}).then(function(data) {
            that.trigger("getFreeApps", data);
        });
    },

    getAppsByType: function(appType) {
        var that = this;
        d.getApps({appType:appType}).then(function(data) {
            that.trigger("getAppsByType", data, appType);
        });
    },

    getUserVin: function(taobaoId) {
        var that = this;
        taobaoId = "T003";
        d.getUserVin({taobaoId:taobaoId,pageNo:1,pageSize:10}).then(function(data) {
            that.trigger("getUserVin", data);
        });
    },

    getBookRecords: function(vin) {
        var that = this;
        d.getBookRecords(vin).then(function(data) {
            that.trigger("getBookRecords", data);
        });
    },

    addBookRecord: function(record) {
        var that = this;
        d.addBookRecord(record).then(function(data) {
            that.trigger("addBookRecord", data);
        });
    },

    addBookOrder: function(order) {
        var that = this;
        d.addBookOrder(order).then(function(data) {
            that.trigger("addBookOrder", data);
        });
    },

    getAppById: function(id) {
        var that = this;
        d.getAppById(id).then(function(data) {
            that.trigger("getAppById", data);
        });
    },


});

module.exports = store;
},{"../actions/store":2,"../data":7}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImQ6XFx3b3Jrc3BhY2VzXFxjb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYlxcbWN3X3dlYlxcc3JjXFxtYWluXFx3ZWJhcHBcXG5vZGVfbW9kdWxlc1xcZ3VscC1icm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsImQ6L3dvcmtzcGFjZXMvY29tLWF1dG9uYXZpLXRzcC1teWNlbnRlci13ZWIvbWN3X3dlYi9zcmMvbWFpbi93ZWJhcHAvamF2YXNjcmlwdHMvYWN0aW9ucy9ob21lLmpzIiwiZDovd29ya3NwYWNlcy9jb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYi9tY3dfd2ViL3NyYy9tYWluL3dlYmFwcC9qYXZhc2NyaXB0cy9hY3Rpb25zL3N0b3JlLmpzIiwiZDovd29ya3NwYWNlcy9jb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYi9tY3dfd2ViL3NyYy9tYWluL3dlYmFwcC9qYXZhc2NyaXB0cy9jb21wb25lbnRzL2Zha2VfYTJjOGUwYmUuanMiLCJkOi93b3Jrc3BhY2VzL2NvbS1hdXRvbmF2aS10c3AtbXljZW50ZXItd2ViL21jd193ZWIvc3JjL21haW4vd2ViYXBwL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwiZDovd29ya3NwYWNlcy9jb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYi9tY3dfd2ViL3NyYy9tYWluL3dlYmFwcC9qYXZhc2NyaXB0cy9jb21wb25lbnRzL2hvbWVNYWluLmpzIiwiZDovd29ya3NwYWNlcy9jb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYi9tY3dfd2ViL3NyYy9tYWluL3dlYmFwcC9qYXZhc2NyaXB0cy9jb21wb25lbnRzL2hvbWVOYXYuanMiLCJkOi93b3Jrc3BhY2VzL2NvbS1hdXRvbmF2aS10c3AtbXljZW50ZXItd2ViL21jd193ZWIvc3JjL21haW4vd2ViYXBwL2phdmFzY3JpcHRzL2RhdGEuanMiLCJkOi93b3Jrc3BhY2VzL2NvbS1hdXRvbmF2aS10c3AtbXljZW50ZXItd2ViL21jd193ZWIvc3JjL21haW4vd2ViYXBwL2phdmFzY3JpcHRzL3N0b3Jlcy9ob21lLmpzIiwiZDovd29ya3NwYWNlcy9jb20tYXV0b25hdmktdHNwLW15Y2VudGVyLXdlYi9tY3dfd2ViL3NyYy9tYWluL3dlYmFwcC9qYXZhc2NyaXB0cy9zdG9yZXMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGhvbWUgPSBSZWZsdXguY3JlYXRlQWN0aW9ucyhbXHJcbiAgICBcImFkZEhpc3RvcnlQb2lcIixcclxuICAgIFwiZ2V0SGlzdG9yeVBvaXNcIixcclxuICAgIFwiZHJvcEhpc3RvcnlQb2lcIlxyXG5dKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaG9tZTsiLCJcclxudmFyIHN0b3JlID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoW1xyXG4gICAgXCJnZXRBcHBUeXBlXCIsXHJcbiAgICBcImdldEFwcHNcIixcclxuICAgIFwiZ2V0QXBwc0J5S2V5d29yZFwiLFxyXG4gICAgXCJnZXRGcmVlQXBwc1wiLFxyXG4gICAgXCJnZXRBcHBzQnlUeXBlXCIsXHJcbiAgICBcImdldFVzZXJWaW5cIixcclxuICAgIFwiYWRkQm9va1JlY29yZFwiLFxyXG4gICAgXCJhZGRCb29rT3JkZXJcIixcclxuICAgIFwiZ2V0Qm9va1JlY29yZHNcIixcclxuICAgIFwiZ2V0QXBwQnlJZFwiXHJcbl0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTsiLCJcclxudmFyIEhlYWRlciA9IHJlcXVpcmUoXCIuL2hlYWRlclwiKTtcclxudmFyIEhvbWVOYXYgPSByZXF1aXJlKFwiLi9ob21lTmF2XCIpO1xyXG52YXIgSG9tZU1haW4gPSByZXF1aXJlKFwiLi9ob21lTWFpblwiKTtcclxudmFyIGhvbWVBY3Rpb24gPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9ob21lXCIpO1xyXG52YXIgaG9tZVN0b3JlID0gcmVxdWlyZShcIi4uL3N0b3Jlcy9ob21lXCIpO1xyXG52YXIgc3RvcmVBY3Rpb24gPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9zdG9yZVwiKTtcclxudmFyIHN0b3JlU3RvcmUgPSByZXF1aXJlKFwiLi4vc3RvcmVzL3N0b3JlXCIpO1xyXG5cclxudmFyIEhvbWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdIb21lJyxcclxuICAgIG1peGluczogW1JlZmx1eC5MaXN0ZW5lck1peGluXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBvaTp7cG9pTGlzdDp7cG9pczpbXX19LFxyXG4gICAgICAgICAgICB2aW5zOltdLFxyXG4gICAgICAgICAgICBoaXN0b3J5UG9pczpbXSxcclxuICAgICAgICAgICAgb3V0UGxhbjp0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtYXJrZXJzOltdLFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHN0b3JlU3RvcmUsIHRoaXMuX3N0b3JlQ2FsbEJhY2spO1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8oaG9tZVN0b3JlLCB0aGlzLl9ob21lQ2FsbEJhY2spO1xyXG4gICAgfSxcclxuXHJcbiAgICBfc3RvcmVDYWxsQmFjazogZnVuY3Rpb24oa2V5d29yZCwgZGF0YSkge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5d29yZCl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnZXRVc2VyVmluXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2aW5zOmRhdGEuZGF0YXx8W119KTtcclxuICAgICAgICAgICAgICAgIHZpbiA9IHRoaXMuc3RhdGUudmluc1swXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgX2hvbWVDYWxsQmFjazogZnVuY3Rpb24oa2V5d29yZCwgZGF0YSkge1xyXG4gICAgICAgIHN3aXRjaCAoa2V5d29yZCl7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhZGRIaXN0b3J5UG9pXCI6XHJcbiAgICAgICAgICAgICAgICBob21lQWN0aW9uLmdldEhpc3RvcnlQb2lzKHt0YW9iYW9JZDp0YW9iYW9JZH0pO1xyXG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRNYXAoKTtcclxuICAgICAgICAgICAgICAgIGluZm9XaW5kb3cucmVsYXRpdmVNYXJrZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnZXRIaXN0b3J5UG9pc1wiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGlzdG9yeVBvaXM6ZGF0YS5kYXRhfHxbXX0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzZWFyY2hQT0k6IGZ1bmN0aW9uKGtleXdvcmQpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbWFwLnBsdWdpbihbXCJBTWFwLlBsYWNlU2VhcmNoXCJdLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIE1TZWFyY2ggPSBuZXcgQU1hcC5QbGFjZVNlYXJjaCh7cGFnZVNpemU6IDV9KTtcclxuICAgICAgICAgICAgQU1hcC5ldmVudC5hZGRMaXN0ZW5lcihNU2VhcmNoLCBcImNvbXBsZXRlXCIsIGZ1bmN0aW9uKGRhdGEpIHt0aGF0Ll9zZWFyY2hDYWxsQmFjayhkYXRhKTt9KTtcclxuICAgICAgICAgICAgTVNlYXJjaC5zZWFyY2hJbkJvdW5kcyhrZXl3b3JkLCBtYXAuZ2V0Qm91bmRzKCkpO1xyXG4gICAgICAgIH0pOyBcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvdXRQbGFuOnRydWV9KTtcclxuICAgIH0sXHJcblxyXG4gICAgX3NlYXJjaENhbGxCYWNrOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cG9pOmRhdGF9KTtcclxuICAgICAgICB0aGlzLmFkZE1hcmtlcihkYXRhKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkTWFya2VyOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIHBvaXMgPSBkYXRhLnBvaUxpc3QucG9pcztcclxuICAgICAgICB2YXIgbWFya2VyO1xyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpIDwgdGhpcy5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGluZm9XaW5kb3cuc2V0TWFwKCk7XHJcbiAgICAgICAgdGhpcy5tYXJrZXJzID0gW107XHJcbiAgICAgICAgZm9yKGk9MDsgaSA8IHBvaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gbmV3IEFNYXAuTWFya2VyKHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6JzxkaXYgY2xhc3M9XCJwb2ktbWFya2VyXCI+JytTdHJpbmcuZnJvbUNoYXJDb2RlKDY1K2kpKyc8L2Rpdj4nLFxyXG4gICAgICAgICAgICAgICAgbWFwOm1hcCxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOm5ldyBBTWFwLkxuZ0xhdCggcG9pc1tpXS5sb2NhdGlvbi5nZXRMbmcoKSwgcG9pc1tpXS5sb2NhdGlvbi5nZXRMYXQoKSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1hcmtlci5yZWZkYXRhID0gcG9pc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKTtcclxuICAgICAgICAgICAgQU1hcC5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIFwiY2xpY2tcIiwgdGhpcy5tYXJrZXJDbGljayk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtYXJrZXJDbGljazogZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBsbmdsYXQgPSBlLnRhcmdldC5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHZhciBkYXRhID0gZS50YXJnZXQucmVmZGF0YTtcclxuICAgICAgICBpZihpbmZvV2luZG93LnJlbGF0aXZlTWFya2VyID09IGUudGFyZ2V0KXtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRNYXAoKTtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5yZWxhdGl2ZU1hcmtlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGluZm9XaW5kb3cuc2V0Q29udGVudCgnPGRpdiBjbGFzcz1cImluZm8td2luZG93XCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNsb3NlXCI+PC9hPlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+JytkYXRhLm5hbWUrJzwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK2RhdGEuYWRkcmVzcysnPC9kaXY+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIC8+PGk+PC9pPjwvZGl2PlxcXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj4nKTtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5zZXRNYXAobWFwKTtcclxuICAgICAgICAgICAgaW5mb1dpbmRvdy5yZWxhdGl2ZU1hcmtlciA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICBpbmZvV2luZG93LnNldFBvc2l0aW9uKGxuZ2xhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBob21lU2VhcmNoOiBmdW5jdGlvbihrZXl3b3JkKSB7XHJcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuYWRkQ2xhc3MoXCJzZWFyY2hcIik7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQT0koa2V5d29yZCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3V0UGxhbjp0cnVlfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIHNob3dBZGRyZXNzQm9vazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzLmdldERPTU5vZGUoKSkuYWRkQ2xhc3MoXCJzZWFyY2hcIik7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3V0UGxhbjpmYWxzZX0pO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJib2R5XCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoSGVhZGVyLCB7dmluczogdGhpcy5zdGF0ZS52aW5zfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIb21lTmF2LCB7aG9tZVNlYXJjaDogdGhpcy5ob21lU2VhcmNoLCBzaG93QWRkcmVzc0Jvb2s6IHRoaXMuc2hvd0FkZHJlc3NCb29rfSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChIb21lTWFpbiwge291dFBsYW46IHRoaXMuc3RhdGUub3V0UGxhbiwgcG9pOiB0aGlzLnN0YXRlLnBvaSwgc2VhcmNoUE9JOiB0aGlzLnNlYXJjaFBPSSwgaGlzdG9yeVBvaXM6IHRoaXMuc3RhdGUuaGlzdG9yeVBvaXN9KVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcbi8vIG1vZHVsZS5leHBvcnRzID0gSG9tZTtcclxuXHJcblJlYWN0LnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KEhvbWUsIG51bGwpLCBkb2N1bWVudC5ib2R5KTtcclxuc3RvcmVBY3Rpb24uZ2V0VXNlclZpbigpO1xyXG5cclxudmFyIHRhb2Jhb0lkID0gXCJUMDAzXCI7XHJcbmhvbWVBY3Rpb24uZ2V0SGlzdG9yeVBvaXMoe3Rhb2Jhb0lkOnRhb2Jhb0lkfSk7XHJcbnZhciB2aW4gPSB7fTtcclxudmFyIHBvc2l0aW9uID0gbmV3IEFNYXAuTG5nTGF0KDEyMS40MzA2ODMxMzU5ODYzMywgMzEuMjA0MTAyMzgwMDI0OTkpO1xyXG52YXIgbWFwID0gbmV3IEFNYXAuTWFwKFwibWFwXCIsIHtcclxuICAgIGNlbnRlcjogcG9zaXRpb24sXHJcbiAgICBsZXZlbDogMTRcclxufSk7XHJcbnZhciBpbmZvV2luZG93ID0gbmV3IEFNYXAuTWFya2VyKHtcclxuICAgIGNvbnRlbnQ6JycsXHJcbiAgICBvZmZzZXQ6bmV3IEFNYXAuUGl4ZWwoLTE0MCwgLTE2MClcclxufSk7XHJcblxyXG4kKFwiYm9keVwiKS5vbihcImNsaWNrXCIsXCIuaW5mby13aW5kb3cgLmNvbW1lbnQgaVwiLCBmdW5jdGlvbihlKXtcclxuICAgIHZhciBkYXRhID0gaW5mb1dpbmRvdy5yZWxhdGl2ZU1hcmtlci5yZWZkYXRhO1xyXG4gICAgdmFyIGNvbnRlbnQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLmNvbW1lbnRcIikuZmluZChcImlucHV0XCIpLnZhbCgpO1xyXG4gICAgaG9tZUFjdGlvbi5hZGRIaXN0b3J5UG9pKHt0YW9iYW9JZDp0YW9iYW9JZCwgdmluOnZpbi52aW4sIGFkZHJlc3M6ZGF0YS5hZGRyZXNzLCB4OmRhdGEubG9jYXRpb24uZ2V0TG5nKCkseTpkYXRhLmxvY2F0aW9uLmdldExhdCgpLGNvbnRlbnQ6Y29udGVudH0pO1xyXG59KVxyXG5cclxuJChcImJvZHlcIikub24oXCJjbGlja1wiLFwiLmluZm8td2luZG93IC5jbG9zZVwiLCBmdW5jdGlvbihlKXtcclxuICAgIGluZm9XaW5kb3cuc2V0TWFwKCk7XHJcbiAgICBpbmZvV2luZG93LnJlbGF0aXZlTWFya2VyID0gbnVsbDtcclxufSlcclxuXHJcbiIsIlxyXG52YXIgaGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnaGVhZGVyJyxcclxuICAgIG1peGluczogW1JlZmx1eC5MaXN0ZW5lck1peGluXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB2aW5zID0gdGhpcy5wcm9wcy52aW5zO1xyXG4gICAgICAgIHZhciB2aW5kb20gPSB2aW5zLm1hcChmdW5jdGlvbihpdGVtLCBpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZXF1aXBtZW50LWl0ZW1cIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwiZXF1aXBtZW50LWljb25cIn0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImVxdWlwbWVudC1uYW1lXCJ9LCBpdGVtLmJyYW5kICsgXCIgXCIgKyBpdGVtLmV4aGF1c3RWb2x1bWUgKyBcIiBcIiAraXRlbS5tZW1vICsgXCIgXCIgK2l0ZW0ubW9kZWwgKyBcIiBcIiAraXRlbS50cmFuc21pc3Npb24pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImVxdWlwbWVudC1zdGF0dXNcIn0sIFwi5LyR55ygXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImhlYWRlclwiLCB7Y2xhc3NOYW1lOiBcInJhdy1jb2xzXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJiZ1wifSksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcInVzZXIgcmF3LTItNSByYXctc20tMi01IHJhdy1tZC0xLTUgcmF3LWxnLTMtMjRcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwidXNlci1hdmF0b3JcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge3NyYzogXCJpbWFnZXMvYXZhdG9yLmpwZ1wifSkpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInVzZXItbmFtZVwifSwgXCJFbGVuYVwiKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiZXF1aXBtZW50IHJhdy0yLTUgcmF3LXNtLTItNSByYXctbWQtMy01IHJhdy1sZy0xOC0yNFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImVxdWlwbWVudC1saXN0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImxlZnRcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpXCIsIG51bGwpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIFwi6K6+5aSH566h55CG5ZmoXCIpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJyaWdodFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aW5kb21cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICksIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImxvZ2lubG9nb3V0IHJhdy0xLTUgcmF3LXNtLTEtNSByYXctbWQtMS01IHJhdy1sZy0zLTI0XCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwibG9nb3V0XCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBcIumAgOWHulwiKVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGhlYWRlcjtcclxuIiwiXHJcbnZhciBob21lTWFpbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2hvbWVNYWluJyxcclxuICAgIG1peGluczogW1JlZmx1eC5MaXN0ZW5lck1peGluXSxcclxuXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG91dFBsYW46dHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgfSxcclxuXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIDpmdW5jdGlvbihwcm9wcykge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe291dFBsYW46cHJvcHMub3V0UGxhbn0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZihlLndoaWNoPT09MTMgfHwgZS5rZXlDb2RlID09PSAxMylcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zZWFyY2hQT0koJChlLnRhcmdldCkudmFsKCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvdXRQbGFuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvdXRQbGFuOnRydWV9KTtcclxuICAgIH0sXHJcblxyXG4gICAgaGlzdG9yeUFkZHJlc3M6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe291dFBsYW46ZmFsc2V9KTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBvaSA9IHRoaXMucHJvcHMucG9pO1xyXG4gICAgICAgIHZhciBoaXN0b3J5UG9pcyA9IHRoaXMucHJvcHMuaGlzdG9yeVBvaXM7XHJcbiAgICAgICAgdmFyIG91dFBsYW4gPSB0aGlzLnN0YXRlLm91dFBsYW47XHJcbiAgICAgICAgdmFyIHBvaWRvbSA9IHBvaS5wb2lMaXN0LnBvaXMubWFwKGZ1bmN0aW9uKGl0ZW0saSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImFkZHJlc3MtaXRlbVwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImFkZHJlc3MtaXRlbS1pY29uXCJ9LCBTdHJpbmcuZnJvbUNoYXJDb2RlKDY1K2kpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImFkZHJlc3MtaXRlbS1jb250ZW50XCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsIGl0ZW0ubmFtZSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgaXRlbS5hZGRyZXNzKSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmFyIGhpc3Rvcnlkb20gPSBoaXN0b3J5UG9pcy5tYXAoZnVuY3Rpb24oaXRlbSxpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiYWRkcmVzcy1pdGVtXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwiYWRkcmVzcy1pdGVtLWNvbnRlbnRcIn0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgaXRlbS5hZGRyZXNzKSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBpdGVtLmNvbnRlbnQpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJtYWluXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIiwge2NsYXNzTmFtZTogXCJtYXBcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtYWluLXdyYXBcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtpZDogXCJtYXBcIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImhpc3RvcnlcIn0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInVsXCIsIG51bGwsIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7Y2xhc3NOYW1lOiBvdXRQbGFuP1wic2VsZWN0ZWQgb3V0XCI6XCJvdXRcIiwgb25DbGljazogdGhpcy5vdXRQbGFufSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIuWHuuihjOinhOWIklwiKSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7Y2xhc3NOYW1lOiBvdXRQbGFuP1wiYWRkcmVzc1wiOlwic2VsZWN0ZWQgYWRkcmVzc1wiLCBvbkNsaWNrOiB0aGlzLmhpc3RvcnlBZGRyZXNzfSwgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLCBcIuWcsOWdgOiWhFwiKSkpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge3N0eWxlOiBvdXRQbGFuP3tkaXNwbGF5OlwiYmxvY2tcIn06e2Rpc3BsYXk6XCJub25lXCJ9fSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImFkZHJlc3Mtc2VhcmNoXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBvbktleVByZXNzOiB0aGlzLnNlYXJjaH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCBudWxsKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaWRvbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtzdHlsZTogb3V0UGxhbj97ZGlzcGxheTpcIm5vbmVcIn06e2Rpc3BsYXk6XCJibG9ja1wifX0sIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpc3Rvcnlkb21cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJjYXItc3RhdHVzXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImNhci1zdGF0dXMtdGl0bGVcIn0sIFwi6L2m6L6G54q25oCBXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcInNjYW4tY2FyXCJ9LCBcIuWFqOi9puaJq+aPj1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcbm1vZHVsZS5leHBvcnRzID0gaG9tZU1haW47XHJcbiIsIlxyXG52YXIgaG9tZU5hdiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2hvbWVOYXYnLFxyXG4gICAgbWl4aW5zOiBbUmVmbHV4Lkxpc3RlbmVyTWl4aW5dLFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIH0sXHJcblxyXG4gICAgc2VhcmNoOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgdmFyIGtleXdvcmQgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KFwic3BhblwiKS5maW5kKFwiaW5wdXRcIikudmFsKCk7XHJcbiAgICAgICAgaWYoZS50eXBlPT1cImtleXByZXNzXCImJmUud2hpY2g9PT0xMyB8fCBlLmtleUNvZGUgPT09IDEzKVxyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhvbWVTZWFyY2goa2V5d29yZCk7XHJcbiAgICAgICAgZWxzZSBpZihlLnR5cGU9PVwiY2xpY2tcIilcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ob21lU2VhcmNoKGtleXdvcmQpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93QWRkcmVzc0Jvb2s6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5zaG93QWRkcmVzc0Jvb2soKTtcclxuICAgIH0sXHJcblxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcIm5hdlwiLCB7Y2xhc3NOYW1lOiBcInJhdy1jb2xzXCJ9LCBcclxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtYWluIHJhdy0xLTUgcmF3LXNtLTEtNSByYXctbWQtNi0yNFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcIm1haW4td3JhcFwifSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge2NsYXNzTmFtZTogXCJtb3JlLWljb25cIn0pLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRsXCIsIG51bGwsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRkXCIsIHtjbGFzc05hbWU6IFwiY2FyIHNlbGVjdGVkXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7aHJlZjogXCJob21lLmh0bWxcIn0sIFwi5oiR55qE54ix6L2mXCIpKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGRcIiwge2NsYXNzTmFtZTogXCJzaG9wXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7aHJlZjogXCJzdG9yZS5odG1sXCJ9LCBcIuacjeWKoeWVhuW6l1wiKSksIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRkXCIsIHtjbGFzc05hbWU6IFwib3JkZXJzXCJ9LCBcIuiuoui0reiusOW9lVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKSwgXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3ViXCJ9LCBcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtjbGFzc05hbWU6IFwic3ViLXdyYXAgcmF3LWNvbHNcIiwgc3R5bGU6IHt0ZXh0QWxpZ246XCJjZW50ZXJcIn19LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwge2NsYXNzTmFtZTogXCJvdXQtbm90ZXNcIn0sIFwi5Ye66KGM6KeE5YiSXCIpLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7Y2xhc3NOYW1lOiBcImFkZHJlc3Mtc2VhcmNoXCJ9LCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBvbktleVByZXNzOiB0aGlzLnNlYXJjaH0pLCBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaVwiLCB7b25DbGljazogdGhpcy5zZWFyY2h9KSksIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHtjbGFzc05hbWU6IFwiYWRkcmVzcy1ib29rXCIsIG9uQ2xpY2s6IHRoaXMuc2hvd0FkZHJlc3NCb29rfSlcclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxubW9kdWxlLmV4cG9ydHMgPSBob21lTmF2O1xyXG4iLCJcclxuXHJcbnZhciBkID0ge307XHJcbnZhciBob3N0ID0gXCJodHRwOi8vMTkyLjE2OC4xLjIxMzo5MDkwL21jd193ZWIvXCI7XHJcblxyXG4kLmFqYXhTZXR1cCh7IGNhY2hlOiBmYWxzZSB9KTtcclxuZC5nZXRKU09OID0gZnVuY3Rpb24ocGFyYW0sIHNpZCwgYXN5bmMpe1xyXG4gICAgaWYoYXN5bmMgPT09IGZhbHNlKVxyXG4gICAgICAgICQuYWpheFNldHVwKHsgYXN5bmM6IGZhbHNlIH0pO1xyXG4gICAgZWxzZVxyXG4gICAgICAgICQuYWpheFNldHVwKHsgYXN5bmM6IHRydWUgfSk7XHJcbiAgICB2YXIgdXJsID0gcGFyYW1TdHJpbmdpZnkocGFyYW0sIHNpZCk7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLmdldEpTT04odXJsKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhICYmIGRhdGEuc3RhdHVzICYmIGRhdGEuc3RhdHVzLmNvZGUgPT0gMClcclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICBlbHNlIGlmKGRhdGEgJiYgZGF0YS5zdGF0dXMgJiYgZGF0YS5zdGF0dXMuY29kZSA9PSAtMTAwMClcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCJsb2dpbi5odG1sXCJcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChkYXRhKTtcclxuICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZGVmZXJyZWQ7XHJcbn07XHJcblxyXG5kLnBvc3RKU09OID0gZnVuY3Rpb24ocGFyYW0sIHNpZCwgYXN5bmMpIHtcclxuICAgIGlmKGFzeW5jID09PSBmYWxzZSlcclxuICAgICAgICAkLmFqYXhTZXR1cCh7IGFzeW5jOiBmYWxzZSB9KTtcclxuICAgIGVsc2VcclxuICAgICAgICAkLmFqYXhTZXR1cCh7IGFzeW5jOiB0cnVlIH0pO1xyXG4gICAgdmFyIHVybCA9IGhvc3QgKyBzaWQ7XHJcbiAgICB2YXIgZGVmZXJyZWQgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAkLnBvc3QodXJsLCBwYXJhbSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgLy8gZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgaWYoZGF0YSAmJiBkYXRhLnN0YXR1cyAmJiBkYXRhLnN0YXR1cy5jb2RlID09IDApXHJcbiAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgZWxzZSBpZihkYXRhICYmIGRhdGEuc3RhdHVzICYmIGRhdGEuc3RhdHVzLmNvZGUgPT0gLTEwMDApXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwibG9naW4uaHRtbFwiXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZGF0YSk7XHJcbiAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICBkZWZlcnJlZC5yZWplY3QoKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZmVycmVkO1xyXG59O1xyXG5cclxudmFyIHBhcmFtU3RyaW5naWZ5ID0gZnVuY3Rpb24ocGFyYW0sIHNpZCl7XHJcbiAgICBzaWQgPSAoc2lkIHx8IFwiXCIpICsgXCI/XCI7XHJcbiAgICB2YXIgYXJyID0gW107XHJcbiAgICBmb3IodmFyIGtleSBpbiBwYXJhbSl7XHJcbiAgICAgICAgaWYocGFyYW0uaGFzT3duUHJvcGVydHkoa2V5KSl7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJKHBhcmFtW2tleV0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhvc3QgKyBzaWQgKyAoYXJyLmxlbmd0aCA/IGFyci5qb2luKFwiJlwiKSA6IFwiXCIpO1xyXG59O1xyXG5cclxuXHJcbmQuZ2V0QXBwcyA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgIGpzb24gPSBqc29uIHx8IHt9O1xyXG4gICAgcmV0dXJuIGQuZ2V0SlNPTihqc29uLCBcInNwcC9saXN0QXBwXCIpO1xyXG59O1xyXG5cclxuXHJcbmQuZ2V0QXBwQnlJZCA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgIGpzb24gPSBqc29uIHx8IHt9O1xyXG4gICAgcmV0dXJuIGQuZ2V0SlNPTihqc29uLCBcInNwcC9nZXRBcHBCeUlkXCIpO1xyXG59O1xyXG5cclxuZC5nZXRBcHBzQnlLZXl3b3JkID0gZnVuY3Rpb24oanNvbikge1xyXG4gICAganNvbiA9IGpzb24gfHwge307XHJcbiAgICByZXR1cm4gZC5nZXRKU09OKGpzb24sIFwic3BwL2tleXdvcmRTZWFyY2hcIik7XHJcbn07XHJcblxyXG5kLmdldEFwcFR5cGUgPSBmdW5jdGlvbihqc29uKSB7XHJcbiAgICBqc29uID0ganNvbiB8fCB7fTtcclxuICAgIHJldHVybiBkLmdldEpTT04oanNvbiwgXCJzcHAvZ2V0QXBwVHlwZVwiKTtcclxufTtcclxuXHJcbmQuZ2V0VXNlclZpbiA9IGZ1bmN0aW9uKGpzb24pIHtcclxuICAgIGpzb24gPSBqc29uIHx8IHt9O1xyXG4gICAgcmV0dXJuIGQuZ2V0SlNPTihqc29uLCBcInZpblVzZXIvcXVlcnlVc2VyVmluXCIpO1xyXG59O1xyXG5cclxuZC5hZGRCb29rUmVjb3JkID0gZnVuY3Rpb24oanNvbikge1xyXG4gICAganNvbiA9IGpzb24gfHwge307XHJcbiAgICByZXR1cm4gZC5nZXRKU09OKGpzb24sIFwidmluU2VydmljZVJlY29yZC9hZGRTZXJ2aWNlUmVjb3JkXCIpO1xyXG59O1xyXG5cclxuXHJcbmQuZ2V0Qm9va1JlY29yZHMgPSBmdW5jdGlvbihqc29uKSB7XHJcbiAgICBqc29uID0ganNvbiB8fCB7fTtcclxuICAgIHJldHVybiBkLmdldEpTT04oanNvbiwgXCJ2aW5TZXJ2aWNlUmVjb3JkL3F1ZXJ5VmluU2VydmljZVJlY29yZFwiKTtcclxufTtcclxuXHJcbmQuYWRkQm9va09yZGVyID0gZnVuY3Rpb24oanNvbikge1xyXG4gICAganNvbiA9IGpzb24gfHwge307XHJcbiAgICByZXR1cm4gZC5nZXRKU09OKGpzb24sIFwidmluT3JkZXIvYWRkU2VydmljZU9yZGVyXCIpO1xyXG59O1xyXG5cclxuZC5hZGRIaXN0b3J5UG9pID0gZnVuY3Rpb24oanNvbikge1xyXG4gICAganNvbiA9IGpzb24gfHwge307XHJcbiAgICByZXR1cm4gZC5nZXRKU09OKGpzb24sIFwiaGlzUG9pL2FkZEhpc1BvaVwiKTtcclxufTtcclxuXHJcbmQuZ2V0SGlzdG9yeVBvaXMgPSBmdW5jdGlvbihqc29uKSB7XHJcbiAgICBqc29uID0ganNvbiB8fCB7fTtcclxuICAgIHJldHVybiBkLmdldEpTT04oanNvbiwgXCJoaXNQb2kvZmluZEhpc1BvaVwiKTtcclxufTtcclxuXHJcbmQuZHJvcEhpc3RvcnlQb2kgPSBmdW5jdGlvbihqc29uKSB7XHJcbiAgICBqc29uID0ganNvbiB8fCB7fTtcclxuICAgIHJldHVybiBkLmdldEpTT04oanNvbiwgXCJoaXNQb2kvZGVsSGlzUG9pXCIpO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkOyIsIlxyXG52YXIgZCA9IHJlcXVpcmUoXCIuLi9kYXRhXCIpO1xyXG52YXIgaG9tZUFjdGlvbiA9IHJlcXVpcmUoXCIuLi9hY3Rpb25zL2hvbWVcIik7XHJcblxyXG5cclxudmFyIGhvbWUgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyhob21lQWN0aW9uLmFkZEhpc3RvcnlQb2ksIHRoaXMuYWRkSGlzdG9yeVBvaSk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5Ubyhob21lQWN0aW9uLmdldEhpc3RvcnlQb2lzLCB0aGlzLmdldEhpc3RvcnlQb2lzKTtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKGhvbWVBY3Rpb24uZHJvcEhpc3RvcnlQb2ksIHRoaXMuZHJvcEhpc3RvcnlQb2kpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRIaXN0b3J5UG9pOiBmdW5jdGlvbihwb2kpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZC5hZGRIaXN0b3J5UG9pKHBvaSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImFkZEhpc3RvcnlQb2lcIiwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEhpc3RvcnlQb2lzOiBmdW5jdGlvbih2aW5vcnRhb2Jhb2lkKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGQuZ2V0SGlzdG9yeVBvaXModmlub3J0YW9iYW9pZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImdldEhpc3RvcnlQb2lzXCIsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBkcm9wSGlzdG9yeVBvaTogZnVuY3Rpb24oaGlzaWQpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZC5kcm9wSGlzdG9yeVBvaShoaXNpZCkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImRyb3BIaXN0b3J5UG9pXCIsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBob21lOyIsIlxyXG52YXIgZCA9IHJlcXVpcmUoXCIuLi9kYXRhXCIpO1xyXG52YXIgc3RvcmVBY3Rpb24gPSByZXF1aXJlKFwiLi4vYWN0aW9ucy9zdG9yZVwiKTtcclxuXHJcblxyXG52YXIgc3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhzdG9yZUFjdGlvbi5nZXRBcHBUeXBlLCB0aGlzLmdldEFwcFR5cGUpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8oc3RvcmVBY3Rpb24uZ2V0QXBwcywgdGhpcy5nZXRBcHBzKTtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHN0b3JlQWN0aW9uLmdldEFwcHNCeUtleXdvcmQsIHRoaXMuZ2V0QXBwc0J5S2V5d29yZCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhzdG9yZUFjdGlvbi5nZXRGcmVlQXBwcywgdGhpcy5nZXRGcmVlQXBwcyk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhzdG9yZUFjdGlvbi5nZXRBcHBzQnlUeXBlLCB0aGlzLmdldEFwcHNCeVR5cGUpO1xyXG4gICAgICAgIHRoaXMubGlzdGVuVG8oc3RvcmVBY3Rpb24uZ2V0VXNlclZpbiwgdGhpcy5nZXRVc2VyVmluKTtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHN0b3JlQWN0aW9uLmdldEJvb2tSZWNvcmRzLCB0aGlzLmdldEJvb2tSZWNvcmRzKTtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHN0b3JlQWN0aW9uLmFkZEJvb2tSZWNvcmQsIHRoaXMuYWRkQm9va1JlY29yZCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5UbyhzdG9yZUFjdGlvbi5hZGRCb29rT3JkZXIsIHRoaXMuYWRkQm9va09yZGVyKTtcclxuICAgICAgICB0aGlzLmxpc3RlblRvKHN0b3JlQWN0aW9uLmdldEFwcEJ5SWQsIHRoaXMuZ2V0QXBwQnlJZCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldEFwcFR5cGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBkLmdldEFwcFR5cGUoKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiZ2V0QXBwVHlwZVwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QXBwczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGQuZ2V0QXBwcygpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJnZXRBcHBzXCIsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRBcHBzQnlLZXl3b3JkOiBmdW5jdGlvbihrZXl3b3JkKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGQuZ2V0QXBwc0J5S2V5d29yZChrZXl3b3JkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiZ2V0QXBwc0J5S2V5d29yZFwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0RnJlZUFwcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBkLmdldEFwcHMoe2lzRnJlZToxfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImdldEZyZWVBcHBzXCIsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRBcHBzQnlUeXBlOiBmdW5jdGlvbihhcHBUeXBlKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGQuZ2V0QXBwcyh7YXBwVHlwZTphcHBUeXBlfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImdldEFwcHNCeVR5cGVcIiwgZGF0YSwgYXBwVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldFVzZXJWaW46IGZ1bmN0aW9uKHRhb2Jhb0lkKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHRhb2Jhb0lkID0gXCJUMDAzXCI7XHJcbiAgICAgICAgZC5nZXRVc2VyVmluKHt0YW9iYW9JZDp0YW9iYW9JZCxwYWdlTm86MSxwYWdlU2l6ZToxMH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoXCJnZXRVc2VyVmluXCIsIGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuXHJcbiAgICBnZXRCb29rUmVjb3JkczogZnVuY3Rpb24odmluKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIGQuZ2V0Qm9va1JlY29yZHModmluKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiZ2V0Qm9va1JlY29yZHNcIiwgZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZEJvb2tSZWNvcmQ6IGZ1bmN0aW9uKHJlY29yZCkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBkLmFkZEJvb2tSZWNvcmQocmVjb3JkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiYWRkQm9va1JlY29yZFwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQm9va09yZGVyOiBmdW5jdGlvbihvcmRlcikge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBkLmFkZEJvb2tPcmRlcihvcmRlcikudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihcImFkZEJvb2tPcmRlclwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgZ2V0QXBwQnlJZDogZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgZC5nZXRBcHBCeUlkKGlkKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFwiZ2V0QXBwQnlJZFwiLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlOyJdfQ==
