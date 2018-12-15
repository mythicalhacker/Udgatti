import React ,{Component} from 'react';
import {Text,View} from 'react-native';
import firebase from 'firebase';
import {CardSection ,Card, Button , Spinner} from './common';

class Notifications extends Component {



  state = {
    data: [],
    inProgress: true,
  }

  componentWillMount() {


    var self = this;
    var dest = this.props.emailFrom;
    console.log("destination" ,dest);
    console.log("Email from" , this.props.emailFrom , self.props.emailFrom);
    var  destination = dest.replace(/[^a-z0-9]/gi,'');
    var dest = destination;
    console.log("destination after replacement" , destination);
    destination = destination +"/Notifications/Meetings/";
    firebase.database().ref(destination).once('value',function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        var currentTime = new Date();
        currentTime = currentTime.getTime();
        var timediff = currentTime - childKey;
        if(timediff > 180000) {
          var destinationNotification = dest;
          destinationNotification = destinationNotification + "/Notifications/Meetings/";
          destinationNotification = destinationNotification + childKey;
          firebase.database().ref(destinationNotification).remove();
        }
        console.log("childData" , childData);
          console.log("childKey" , childKey);
          self.setState(pre => ({
              data: [...pre.data,childData]
           }));
        console.log("Notifications" , Notifications);
        console.log("state data" ,self.state.data);

      //  console.log("checking" ,self.state.data.Notification);
      })
      self.setState({
        inProgress: false,
      });
    })
  }


  renderMethod() {
    if(this.state.inProgress) {
      return(
        <CardSection>
        <Spinner size ="large" />
        </CardSection>
      )
    }
    return this.state.data.map(function(data,index){
      return(
        <CardSection key={index}>
        <Text> {data.Notification}</Text>
        <Text> {data.requestFrom} </Text>
        <Text> {data.slotbookingfor}</Text>
        </CardSection>

      );
    })
  }
  render() {
    return(
      <View>
      {this.renderMethod()}
      </View>
    );
  }
}


export default Notifications;
