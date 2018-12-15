import React ,{Component} from 'react';
import App from './App';

import LoginPage from './components/LoginPage';

import AddPost from './components/AddPost';
import Adds from './components/Adds';
import AddDetails from './components/AddDetails';
import  Notifications from './components/Notifications';
import Registration from './components/Registration';
import {Router,Scene} from 'react-native-router-flux';
import Chat from './components/Chat';
import Just from './components/common/Just';





class New extends Component {
    render() {
      return(
        <Router>
        <Scene key='root' style ={{paddingTop:60}}>
        <Scene key ='app' component={App} title='Home'  />
        <Scene key = 'just' component = {Just} title = 'testing' />
        <Scene key ='chat' component={Chat} title='Chat' />
        <Scene key ='Adds' component={Adds} title='Adds'/>
        <Scene key ='AddDetails' component={AddDetails} title='AddDetails'/>
        <Scene key ='Registration' component={Registration} title='Registration'/>
        <Scene key ='Notifications' component={Notifications} title='Notifications'/>
        </Scene>
        </Router>
      );
    }
  }
export default New;
