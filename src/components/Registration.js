import React ,{Component} from 'react';
import {Text,View,ScrollView} from 'react-native';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import { Card, CardSection, Button,Input,Spinner } from './common';


class Registration extends Component {


  state = {
    name: '',
    email: '',
    password: '',
    lastname: '',
    city: '',
  }
  render() {
    return(
      <ScrollView>
      <Card>
            <CardSection>
              <Input
                placeholder ='Name'
                Label='Name'
                value={this.state.name}
                onChangeText={name =>this.setState({name})}
                />
            </CardSection>


            <CardSection>
              <Input
                placeholder ='Last Name'
                Label='Last Name'
                value={this.state.lastname}
                onChangeText={lastname =>this.setState({lastname})}
                />
            </CardSection>

            <CardSection>
              <Input
                placeholder ='Email'
                Label='Email'
                value={this.state.text}
                onChangeText={email =>this.setState({email})}
                />
            </CardSection>


            <CardSection>
              <Input
                placeholder ='Password'
                Label='Password'
                value={this.state.password}
                onChangeText={password =>this.setState({password})}
                />
            </CardSection>

            <CardSection>
              <Input
                placeholder ='City'
                Label='City'
                value={this.state.city}
                onChangeText={city =>this.setState({city})}
                />
            </CardSection>


      </Card>
      </ScrollView>
    );
  }
}

export default Registration;
