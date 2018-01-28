
var homeMain = React.createClass({
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
                <div className="address-item">
                    <div className="address-item-icon">{String.fromCharCode(65+i)}</div>
                    <div className="address-item-content"><div>{item.name}</div><div>{item.address}</div></div>
                </div>
                )
        });

        var historydom = historyPois.map(function(item,i) {
            return (
                <div className="address-item">
                    <div className="address-item-content"><div>{item.address}</div><div>{item.content}</div></div>
                </div>
                )
        });
        return (
            <main>
                <section className="map">
                    <div className="main-wrap">
                        <div id="map"></div>
                        <div className="history">
                            <ul><li className={outPlan?"selected out":"out"} onClick={this.outPlan}><div>出行规划</div></li><li  className={outPlan?"address":"selected address"} onClick={this.historyAddress}><div>地址薄</div></li></ul>
                            <div style={outPlan?{display:"block"}:{display:"none"}}>
                                <div className="address-search"><input type="text" onKeyPress={this.search} /><i></i></div>
                                {poidom}
                            </div>
                            <div style={outPlan?{display:"none"}:{display:"block"}}>
                                {historydom}
                            </div>
                        </div>
                        <div className="car-status"><span className="car-status-title">车辆状态</span><span className="scan-car">全车扫描</span>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
});
module.exports = homeMain;
