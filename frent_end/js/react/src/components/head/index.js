import React, {Component} from 'react';
import './index.css';
import { connect } from 'react-redux'


export default class HeadComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		const that = this;
	}

	render() {
		return(
			<div className="header">
				<span>我一个计数器</span>
			</div>
		);
	}
}
