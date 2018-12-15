import React from 'react';
import {View} from 'react-native';

const Card = (props) => {
  return (
      <View style = {styles.containerStyle}>
      {props.children}
      </View>
  );
};

const styles = {
  containerStyle: {

      borderColor:'#ddd',

      borderBottomWidth: 0,
      shadowColor:'#000',

      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
  }
};
export {Card};
