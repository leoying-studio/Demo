
var header = React.createClass({
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
                <div className="equipment-item"><span className="equipment-icon"></span><span className="equipment-name">{item.brand + " " + item.exhaustVolume + " " +item.memo + " " +item.model + " " +item.transmission}</span><span className="equipment-status">休眠</span>
                            </div>
                )
        });
        return (
            <header className="raw-cols">
                <div className="bg"></div>
                <div className="user raw-2-5 raw-sm-2-5 raw-md-1-5 raw-lg-3-24">
                    <span className="user-avator"><img src="images/avator.jpg" /></span><span className="user-name">Elena</span>
                </div>
                <div className="equipment raw-2-5 raw-sm-2-5 raw-md-3-5 raw-lg-18-24">
                    <div className="equipment-list">
                        <div className="left"><i></i><div>设备管理器</div></div>
                        <div className="right">
                            {vindom}
                        </div>
                    </div>
                </div>
                <div className="loginlogout raw-1-5 raw-sm-1-5 raw-md-1-5 raw-lg-3-24">
                    <div className="logout"><a>退出</a>
                    </div>
                </div>
            </header>
        );
    }
});
module.exports = header;
