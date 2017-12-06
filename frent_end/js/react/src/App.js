import React, { Component } from 'react';
import HeadComponent from './components/head';
import MainComponent from './components/main';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as Todoactions from './redux/actions';
class App extends Component {
  
  constructor(props) {
      super(props);
      this.state = {
      
      };
  }

  componentWillMount() {

  }

  componentDidMount() {
   
  }

  render() {
    return (    
        <div>
            <HeadComponent />
            <MainComponent value={this.props.value}/>
        </div>
    )
  }
}


let mapStateToProps = (state) => {
    // 2. 通过dispatch后出发该方法注入 state, 下一步将会触发reducer
    return {value: state.Counter}
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators( Todoactions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
