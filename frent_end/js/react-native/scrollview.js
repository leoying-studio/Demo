import React from 'react';
import { StyleSheet, Text, View, ScrollView, Animated, Dimensions } from 'react-native';
const width = Dimensions.get('window').width
export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          scrollTo: {},
          
      }
  }

  render() {
    return (
       <ScrollView 
          horizontal
          onScroll={this.onScroll.bind(this)}
          onContentSizeChange={this.contentChange.bind(this)}
          pagingEnabled={true}
       >
           <View style={styles.container}>
              <View style={styles.item}>
                  <Text>
                        第一页
                  </Text>
              </View>
              <View style={[styles.item, styles.green]}>
                   <Text>
                        第二页
                  </Text>
              </View>
              <View style={[styles.item, styles.green]}>
                  <Text> 第三页 </Text> 
              </View>
              <View style={[styles.item, styles.green]}>
                  <Text>第四页</Text>
              </View>
              <View style={[styles.item, styles.green]}>
                  <Text>第五页</Text>    
              </View>
          </View>
       </ScrollView>
    );
  }

  contentChange() {
    
  }

  onScroll(e) {
     let x = e.nativeEvent.contentOffset.x;     
     
  }
 
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  item: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
    width: width,
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#fff'
  },
  green: {
    backgroundColor:'green'
  }
});
