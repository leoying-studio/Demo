import React, {Component} from 'react';
import "./index.css";
import { createStore } from 'redux';
import { reducers } from "./../../redux";
import {connect} from 'react-redux';
const store = createStore(reducers);
class MainComponent extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}
	
	componentDidMount() {
		const that = this;
		store.subscribe(() => {
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
		store.dispatch({type:"ADD_COUNT"});
	}

	minusCounter() {
		debugger;
		this.props.dispatch({type: "MINUS_COUNT"});
	}
}

let mapStateToProps = (state) => {
    debugger;
    return {value: state.Counter}
}



export default connect(mapStateToProps)(MainComponent);


