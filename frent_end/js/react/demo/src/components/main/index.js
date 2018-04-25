import React, {Component} from 'react';
import "./index.css";
import store from "./../../redux";
import {connect} from 'react-redux';
class MainComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}
	
	componentDidMount() {
		// 仅仅测试订阅事件而已
		const that = this;
		store.subscribe(() => {
			// 订阅事件
			const value = store.getState();
			that.setState({value: value.Counter});
		});
	}

	render() {
		return(
			<div className="main">
				<h1>{this.props.value}</h1>
				<h3>{this.state.value}</h3>
				<div>
						<button onClick={()=> this.addCounter()}>+</button>
						<button onClick={()=>this.minusCounter()}>-</button>
				</div>
			</div>
		);
	}

	addCounter() {
		// 发出
		store.dispatch({type:"ADD_COUNT"});
	}

	minusCounter() {
		this.props.dispatch({type: "MINUS_COUNT"});
	}
}

let mapStateToProps = (state) => {
    return {value: state.Counter}
}


export default connect(mapStateToProps)(MainComponent);


