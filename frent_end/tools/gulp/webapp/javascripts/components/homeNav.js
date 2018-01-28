
var homeNav = React.createClass({
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
            <nav className="raw-cols">
                <div className="main raw-1-5 raw-sm-1-5 raw-md-6-24">
                    <div className="main-wrap">
                        <div className="more-icon"></div>
                        <dl>
                            <dd className="car selected"><a href="home.html">我的爱车</a></dd>
                            <dd className="shop" ><a href="store.html">服务商店</a></dd>
                            <dd className="orders">订购记录</dd>
                        </dl>
                    </div>
                </div>
                <div className="sub">
                    <div className="sub-wrap raw-cols" style={{textAlign:"center"}}>
                        <span className="out-notes">出行规划</span><span className="address-search"><input type="text" onKeyPress={this.search} /><i onClick={this.search}></i></span><span className="address-book" onClick={this.showAddressBook}></span>
                    </div>
                </div>
            </nav>
        );
    }
});
module.exports = homeNav;
