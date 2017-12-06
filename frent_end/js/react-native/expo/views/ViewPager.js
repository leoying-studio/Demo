import React from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions, ViewPagerAndroid } from 'react-native';
const width = Dimensions.get('window').width;
export default class ScrollViewPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pagers: [1, 2],
			currentPager: 0
		}
	}

	componentWillUpdate(nextProps, nextState) {
		return true;
	}

	render() {
		return (
			<ViewPagerAndroid initialPage={this.state.currentPager}
				onPageSelected={this.onPageSelected.bind(this)}
				style={styles.container}>
				{this.state.pagers.map(this.renderPage)}
			</ViewPagerAndroid>
		);
	}

	renderPage(item, index) {
		return (
			<View key={index} style={styles.item}>
				<Text style={styles.text}>{item}</Text>
			</View>
		);
	}

	onPageSelected(e) {
		let { pagers } = this.state;
		const currentPager = e.nativeEvent.position;
		lastPager = pagers.length - 1;
		if (currentPager < lastPager ) {
			return;
		}
		pagers = [...pagers,  pagers.length + 1]
		// 即使setState 也无法更新视图,大家可以用数组尝试
		this.setState({
			pagers,
			currentPager
		});
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		backgroundColor: 'red',
		justifyContent: 'center',
		flex: 1,
		alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#fff'
	},
	text: {
		color: '#fff',
		fontSize: 24,
		fontWeight: '800'
	}
});
