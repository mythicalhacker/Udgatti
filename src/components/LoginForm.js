import React, {Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { Card, CardSection,Input,Spinner } from './common';
import Button from './common/Button';
class  LoginForm extends Component {

  state = {email: '',password: '',error: '',loading: false,user:''};

  onButtonPress() {
      this.setState ({error :'',loading: true});
      firebase.auth().signInWithEmailAndPassword(this.state.email ,this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() =>{
         firebase.auth().createUserWithEmailAndPassword(this.state.email ,this.state.password)
         .then(this.onLoginSuccess.bind(this))
         .catch(this.onLoginFail.bind(this));
      });
    }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false,
    });
  }
  onLoginSuccess() {
    this.setState({user: firebase.auth().currentUser.uid});

    firebase.database().ref('users/' + this.state.user).set({
    email: this.state.email,
    //key: this.state.user
  });

    this.setState({
      email: '',
      password: '',
      loading: false
    });

  }

  renderButton() {
    if(this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
    <Button onPress={this.onButtonPress.bind(this)}>
     Login
   </Button>
 );

  }




  render() {
  return(
    <View style ={{flex:1}}>
      <View>
    <Image
    style = {styles.ImageStyle}
    source={require('./Images/udgatti.jpg')} />
  </View>
  <View>
    <Card>
          <CardSection>
            <Input
              placeholder ='Email'
              Label='Email'
              value={this.state.email}
              onChangeText={email =>this.setState({email})}
              />
          </CardSection>

          <CardSection>
               <Input
               secureTextEntry
               placeholder="password"
               Label="Password"
               value={this.state.password}
               onChangeText={password => this.setState({password})}

               />
          </CardSection>

          <Text style ={styles.textStyle}>
             {this.state.error}
             </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>

    </Card>
    </View>
    </View>

  );
 }
}

styles =  {
  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  ImageStyle: {
    height: 380,

    width: 350,
  }
}

export default LoginForm;
