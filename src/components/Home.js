import React,{Component} from 'react'
import {View , TextInput,TouchableOpacity, Text} from 'react-native'
import {Input , CardSection} from './common'
import {Actions} from 'react-native-router-flux'
class Home extends Component {
  state = {name: ''};
  render() {
    return(
      <View>
        <Text style = {styles.title}>
        Enter your Name
        </Text>
        <CardSection>
        <Input
        Label = 'Label'
        value={this.state.name}
        onChangeText={name =>this.setState({name})}
        />
        </CardSection>
          <TouchableOpacity
          onPress={() =>{
            Actions.chat({
              name: this.state.name, 
            })
          }}>
            <Text> Next </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

styles = {
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20
  },
  inpu: {
    padding: 5,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
  }

}

export default Home;
