import React ,{Component} from 'react';
import {Router,Scene} from 'react-native-router-flux';

import AddPost from './AddPost';




class postAdd extends Component {
    render() {
      return(
        <Router>
        <Scene key='root' style ={{paddingTop:60}}>
        <Scene key ='AddPost' component={AddPost} title='AddPost'  />
        <Scene key ='AddDetails' component={AddDetails} title='AddDetails'  />
        </Scene>
        </Router>
      );
    }
  }
export default postAdd;
