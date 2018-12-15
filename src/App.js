import React ,{Component} from 'react';
import {View,Text } from 'react-native';
import  {Header,Card,CardSection,Spinner}  from './components/common';
import Button from './components/common/Button';
import LoginForm from './components/LoginForm';
import Registration from './components/Registration';
import AddPost from './components/AddPost';
import Adds from './components/Adds';
import postAdd from './components/postAdd';
import App2 from './components/App2';
import Users from './components/Users';
import FirstPage from './components/FirstPage';
import firebase from './components/Firebase';

class App extends Component {
  state = {loggedIn: null,user: null};

  componentWillMount() {
  firebase.auth().onAuthStateChanged((user) =>{
      if(user) {

        this.setState({loggedIn: true,user: user});
      } else {
        this.setState({loggedIn: false});
      }
  })
}


renderoption(){
  switch (this.state.option){
    case 1:
    return(
      <Adds />
    );
    break;
    case 2:
    return(
      <AddPost />
    );
    break;

    }
}
renderContent() {

  switch (this.state.loggedIn) {
    case true:
      return  (this.mainview());

    case false:
      return <LoginForm />;
    default:
      return (
          <Card>
            <CardSection>
            <Spinner size ="large" />
            </CardSection>
          </Card>
      )


  }
}
renderMethod() {

    switch (this.state.loggedIn) {
      case true:
        return <App2 />;
      case false:
        return <LoginForm />;
      default:
        return (
            <Card>
              <CardSection>
              <Spinner size ="large" />
              </CardSection>
            </Card>
        )
    }
}
  render() {
    return (
        this.renderMethod()


    );
  }
}


export default App;

//
// import React ,{Component} from 'react';
// import {Text ,View } from 'react-native';
// import {Card,CardSection,Button} from './components/common';
// import Home from './components/Home';
// import Chat from './components/Chat';
// import {Router,Scene} from 'react-native-router-flux';
//
//
//
// class App extends Component {
//   render() {
//     return(
//       <Router>
//         <Scene key='root' style ={{paddingTop:60}}>
//           <Scene key ='home' component={Home} title='Home' />
//           <Scene key ='chat' component={Chat} title='Chat' />
//         </Scene>
//       </Router>
//     );
//   }
// }
// export default App;
