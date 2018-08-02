# 实现滚动缩放的原生动画

1> 一个数组中通过ref 的索引来取名获取到每个item的对象实例名称。
```
	data.nodeList.map((node, index) => {
		let item = data.templateType === TEMP_DEFAULT ?
			this.renderItem(node, index) :
			(<View key={index} onLayout={e => this.handleLayout(e, index)}>
				<Lively
					ref={ref => this['item' + index] = ref}   // 根据item来取名
					node={node}
					index={index}
					onPress={this.to.bind(this)}
					scrollY={this.scrollY}
					total={data.nodeList.length}
				/>
			</View>)
		return item;
	})
```

2> 通过onlayout 来获取每个元素item的高度位置信息

```
	handleLayout = (e, index) => {
		// 设置当前的layout 高度
		console.log('layout' + index, e.nativeEvent.layout);
		// 通过之前拿到的item实例名称设置值， 子item中需要添加该setLayout方法
		this['item' + index].setLayout(e.nativeEvent.layout);
	}

```


3> 每个item来设置当前项的位置, 触发重新render

```
	setLayout = (layout) => {
		console.log('layout item', layout)
		this.setState({ layout })
	}

		
	// render 方法里面结束传过来的scrollY， 滚动条滑动的时候会执行动画
	render() {
		let { node, index, onPress, scrollY, total } = this.props;
		// 取当前组件设置的layout属性值
		let { y, height } = this.state.layout
		let even = index % 2 === 0;
		let transformScale = null;
		if (height) {
			console.log('item layout', this.state.layout)
			let interpolateScale = scrollY.interpolate({
				inputRange: [y - height, y + commonStyle.SCREEN_HEIGHT - height, y + commonStyle.SCREEN_HEIGHT + height],
				outputRange: [0.7, 1, 0.7],
				extrapolate: 'clamp',
			})
			transformScale = { transform: [{ scale: interpolateScale }] }
		}

		return (
			<Touchable
				onPress={onPress.bind(null, node, index)}
				key={index}
				ref={ref => this._root = ref}
				activeOpacity={node.checkJump === 1 ? 1 : 0.5} >
				<Animated.View
					style={[decorate.contaienr, transformScale
					]
					}>
					<View style={even ? [decorate.offsetItem, decorate.offsetLeft] : [decorate.offsetItem, decorate.offsetRight]}>
						{this.renderCircleGraph(node, even)}
						{this.renderStep(node, even, index)}
					</View >
					{

						node.checkJump === 0 && !even ?
							<Animated.Image source={require('./../assets/pk-press-right.png')}
								style={[decorate.handIcon, decorate.handRight, { transform: [{ translateX: this.state.shake }] }]} />
							: null

					}
					{
						node.checkJump === 0 && even ?
							<Animated.Image
								source={require('./../assets/pk-press-left.png')}
								style={[decorate.handIcon, decorate.handLeft, { transform: [{ translateX: this.state.shake }] }]} />
							: null
					}
				</Animated.View>
				{
					index < total - 1 ?
						this.ItemSeparatorComponent(index)
						: null
				}
			</Touchable >
		);
	}


```