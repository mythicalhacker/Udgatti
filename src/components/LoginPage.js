import React, {Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';


 class LoginPage extends Component{

   render() {
     return(
       <View>
       <TouchableOpacity
       onPress={() =>{
         Actions.thirdPage({

         })
       }}>
       <Text>SecondPage</Text>
       </TouchableOpacity>
       </View>
     );
   }
}

export default LoginPage;
