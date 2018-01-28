
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