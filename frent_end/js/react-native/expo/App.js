import React from 'react';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation'; 
import {Dimensions, StyleSheet} from 'react-native'; 
import ScrollView from './views/ScrollView';
import ViewPager from './views/ViewPager';
import ScrollViewPage from './views/ViewPager';
const width = Dimensions.get('window').width;
export default class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          
      }
  }

  render() {
      return (
          <Navigator />
      );
  }

}

const Tabs = TabNavigator({
    ScrollView: {
        screen: ScrollView,
        navigationOptions: {
            label: 'ScrollView'
        }
    },
    ViewPager: {
        screen: ViewPager,
        navigationOptions: {
            label: 'ViewPager',
        }
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
});

const navigationOptions = {

};

const Navigator = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
});

const styles = StyleSheet.create({
     
});
