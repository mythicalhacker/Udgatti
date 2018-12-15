import React from 'react';
import {Text,View} from 'react-native';

const Header =  (props) => {
    const {textStyle ,viewStyle} = styles;
  return (
    <View style = {viewStyle}>
    <Text style = {textStyle} > {props.headerText} </Text>
    </View>
  );
};
const styles = {
  viewStyle: {
    backgroundColor:'#c4302b',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop:15,
    shadowColor: '#000',
    //shadowOffsetset : {width:0 ,height:2},
  //  shadowCapacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize:30,
    color: '#FFFFFF'
  }
};
export  { Header };
