import React from 'react';
import { TextInput , View , Text} from 'react-native';

const Input = (props) => {
  return (
    <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}>{props.Label}</Text>
     <TextInput
      secureTextEntry={props.secureTextEntry}
      placeholder = {props.placeholder}
      autocorrect ={false}
      style = {styles.inputStyle}
      value = {props.value}
      onChangeText = {props.onChangeText}

       />
    </View>
  );
};

const styles = {
  inputStyle:{
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 20,
    flex: 2,
  
  },
  labelStyle:{
    fontSize: 14,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle:{
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:5,
    paddingRight:35
  }

};

export { Input } ;
