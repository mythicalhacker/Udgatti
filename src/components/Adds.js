import React,{Component} from 'react';
import {Text , View , TouchableOpacity,Image}  from 'react-native';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {CardSection  , Card} from './common';
import Button from './common/Button';
class Adds extends Component {


  state = {
    data: [],
  };
  componentWillMount() {
    var self = this;
    firebase.database().ref('/Notifications/').once('value',function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var key = firebase.auth().currentUser.uid;
        console.log("var key is " ,key);
        console.log("childKey is ",childKey);
        if(childKey == key ){

        }
        else {
          self.setState(pre => ({
              data: [...pre.data,childData]
           }));
        }
      });
    });
  }


  renderMethod() {
    return this.state.data.map(function(data,index) {
      return(
        <CardSection key = {index}>
          <TouchableOpacity
          onPress={() =>{
            Actions.AddDetails({
              Product: data.Product,
              Deal: data.Deal,
              Willingtopay: data.Willingtopay,
              Quantity: data.Quantity,
              email: data.EmailFrom,
            })
      }}>
          <Text style = {styles.textstyle}> {data.Product} </Text>
          </TouchableOpacity>
      </CardSection>
      );
    })
  }



  render() {
    return(

      <View>
        <View>
          {this.renderMethod()}

        </View>
        <View>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>

        </View>
      </View>


    );
  }
}

const styles = {
  textstyle: {
    fontSize:24,

  }
};
export default Adds;
