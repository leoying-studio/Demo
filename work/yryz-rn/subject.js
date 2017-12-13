import React, { Component } from 'react';
import { Image, StyleSheet, Alert, View } from 'react-native';
import { Tab, Tabs, withNavigation,Container, Content, Card, CardItem, Left, Loading,
	Thumbnail, Body, Text, Button, Icon, Right, YIcon, FlowList} from '../../components';
import {transformSize, padder, inlineWrap, centerWrap} from '../../styles';
import Touchable from "./../../components/base/Touchable";
import {http } from '../../services';
@withNavigation
export default class SubjectTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// pageNo: 1,
			// pageSize: 5,
			// items: null
		};
	}

	// async getSubjectList() {
	// 	const state = this.state;
	// 	const res = await http(`/services/app/v1/subject/discover`);
	// 	const data = res.data;
	// 	if (data.code == '200') {
	// 		const items = data.data;
	// 		this.setState({items});	
	// 	} else {
	// 		alert(item.msg);
	// 	}
	// }

	// componentDidMount() {
	// 	this.getSubjectList();
	// }

	renderItemTag(item) {
		let [ dominantHue , arrowsHue ] = item.color.split(",");
		dominantHue = dominantHue || "blue";
		arrowsHue = arrowsHue || "green";
		return (
			<View style = {[styles.tag]}>
				<View style = {[styles.tagContent, {backgroundColor:dominantHue}]}>
					<Text style = {styles.tagTitle} numberOfLines = {1}>{item.headline}</Text>
					<Text style = {styles.tagCaption} numberOfLines = {1}>{item.description}</Text>
				</View>
				<View style = {[styles.tagAction, {backgroundColor: arrowsHue}]}>
					<YIcon name = "arrw-right-slender" style = {{color: "#fff", fontSize: transformSize(92)}}/>
				</View>
			</View>
		);
	}

	renderItem(item) {
		return (
			<Touchable 
				type = "highlight"
				onPress = {
					() => {
						this.props.navigation.navigate("SubjectHome", item);
					}
				}>	
				<View style={styles.itemWrap}>
					<Image source={{uri: item.background}} style = {styles.subjectItem} />
					{this.renderItemTag(item)}
				</View>
			</Touchable>
		);
	}

	render() {
		return (
			<Container>
				<FlowList 
						request = "/services/app/v1/subject/discover"
						disabledPage = {true}
						enableCacheFirstPage={true}
						renderItem = { ({item}) => this.renderItem(item) }
					/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	itemWrap: {
		paddingHorizontal: transformSize(50),
		paddingVertical: transformSize(48),
		backgroundColor: '#fff'
	},
	tag: {
		...inlineWrap,
		height: transformSize(144),
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5 ,
		shadowRadius: transformSize(4),
		marginHorizontal : transformSize(235 / 2),
		marginTop: transformSize(-120),
		backgroundColor: 'transparent'
	},
	tagContent: {
		flex: 1,
		paddingTop: transformSize(22),
		paddingBottom: transformSize(20),
		paddingLeft: transformSize(40),
		borderTopLeftRadius: transformSize(4),
		borderBottomLeftRadius: transformSize(4),
		height: '100%'
	},
	tagTitle: {
		fontSize: transformSize(52),
		lineHeight: transformSize(52),
		marginBottom: transformSize(16),
		fontWeight: 'bold',
		color: "#fff",	
	},
	tagCaption: {
		fontSize: transformSize(36),
		lineHeight: transformSize(36),
		fontWeight: '200',
		color: "#fff"
	},
	tagAction: {
		width: transformSize(160),
		height: '100%',
		...centerWrap,
		backgroundColor: "#7bd673",
		borderTopRightRadius: transformSize(4),
		borderBottomRightRadius: transformSize(4),
	},
	subjectItem: {
		height: transformSize(384),
		flex: 1,
		borderRadius: transformSize(30),
	}
});