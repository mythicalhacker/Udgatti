import React ,{Component} from 'react';
import {Text,View} from 'react-native';
import firebase from 'firebase';
import {CardSection , Button} from './common';


class sendRequest extends Component {

sendNotification() {
  var destination;
  destination = "collectionsofslot/";
  var de = this.props.slot;
  destination = destination + de;
  de = "/pending_user/";
  destination = destination +de;
  de = firebase.auth().currentUser.uid;
  destination = destination + de;
  //console.log(destination);
  firebase.database().ref(destination).set({
    createdAt:firebase.database.ServerValue.TIMESTAMP,
    requestTo: this.props.emailTo,
    requestFrom: this.props.emailFrom,
  });
  var requestTo = this.props.emailTo;
  var requestToFinalkey = requestTo.replace(/[^a-z0-9]/gi,'');
  requestToFinalkey = requestToFinalkey + "/Notifications/Meetings/";
  var currentTime = new Date();
  currentTime = currentTime.getTime();

  requestToFinalkey = requestToFinalkey + currentTime;
  firebase.database().ref(requestToFinalkey).set({
    requestFrom: this.props.emailFrom,
    Notification: "Meeting",
    slotbookingfor: this.props.slot,
  })
}


render() {
    return(
      <View>
      <CardSection>
        <Text> {this.props.slot }</Text>

      </CardSection>
      <CardSection>
       <Button onPress = {this.sendNotification.bind(this)}>
        Send
      </Button>
      </CardSection>
      </View>
    );
  }
}



export default sendRequest;
