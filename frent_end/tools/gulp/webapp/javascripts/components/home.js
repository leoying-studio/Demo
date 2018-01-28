
var Header = require("./header");
var HomeNav = require("./homeNav");
var HomeMain = require("./homeMain");
var homeAction = require("../actions/home");
var homeStore = require("../stores/home");
var storeAction = require("../actions/store");
var storeStore = require("../stores/store");

var Home = React.createClass({
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
            <div className="body">
                <Header vins={this.state.vins}></Header>
                <HomeNav homeSearch={this.homeSearch} showAddressBook={this.showAddressBook}></HomeNav>
                <HomeMain outPlan={this.state.outPlan} poi={this.state.poi} searchPOI={this.searchPOI} historyPois={this.state.historyPois}></HomeMain>
            </div>
        );
    }
});
// module.exports = Home;

React.render(<Home></Home>, document.body);
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

