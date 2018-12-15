import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import App from './App';
import App2 from './components/App2'
import AddDetails from './components/AddDetails'
const Routercomp = () => {
  return (
    <Router>
    <Scene key='root' style ={{paddingTop:60}}>
    <Scene key ='home' component={App}  title = 'Udgatti' />
    <Scene key ='AddDetails' component={AddDetails} title='AddDetails'  />
    </Scene>
    </Router>
  );
};

export default Routercomp;
