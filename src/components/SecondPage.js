import React ,{Component} from 'react';
import {View } from 'react-native';
import {Text,TouchableOpacity} from 'react-native';
import axios from 'axios';
import firebase from './FireBase';
import {Actions} from 'react-native-router-flux'
import {Card, CardSection, Button , Input} from './common';


class FirstPage extends Component {

  state = {loggedIn: null,email: '',user: '',name: '',emailsecondperson:'',mail_Id: ''};

  componentWillMount() {
    var self = this;
    var emails = [];
    state = {
      listofuser: [],
    };
  firebase.database().ref('users/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childData.email != null && typeof childData.email != undefined) {
        emails.push(childData.email);
      }

    });
    self.setState({'emails':emails})
  });
}

changeActivity() {
  var self = this;
  console.log("In change activity");
  var user = firebase.auth().currentUser;
    if(user) {
      console.log("User", user);
      var email = user.email;
      if (email == null || typeof email == undefined) {
        console.error("Email is null for user");
        return;
      }

      var emailsToSort = [email];
      emailsToSort.push(self.state.emailsecondperson);
      emailsToSort.sort();
      console.log("emailsToSort", emailsToSort);
      var emailIdCombo = emailsToSort.join('-').replace(/[^a-z0-9]/gi,'');
      console.log("emailId", emailIdCombo);
      console.log("useremail", user.email);
      Actions.secondpage({
        name: user.email,
        userId: user.uid,
        emailIdCombo: emailIdCombo
      })
    } else {
      console.error("This should never happen! Logged out user should not reach here");
    }

}
startConversation(email) {
  //console.log("Seecond email", this.state.emailsecondperson);
  //var email = this.searchEmail(this.state.emailsecondperson);
  if (email == null) {
    return;
  }
  console.log("actual email", email);
  this.setState({emailsecondperson: email.trim()});


    this.changeActivity();

}


renderEmails() {
  var self = this;
  if (this.state.emails == null || typeof this.state.emails == undefined) {
      return null;
  }
  return this.state.emails.map(function(email, index){
    return(

      <CardSection key={index}>
      <TouchableOpacity
    onPress={() =>{
        self.startConversation(email);
      }}>
      <Text>{email}</Text>
    </TouchableOpacity>
      </CardSection>
    )
  })
}
renderMethod() {
  return (
  <Card>
  {this.renderEmails()}

    <CardSection>
      <Button onPress={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </CardSection>
    </Card>
  );
}

searchEmail(email) {
  console.log("email", email);
  if (this.state.emails == null || typeof this.state.emails == undefined) {
      return null;
  }
  if (typeof email == undefined || email == null) {
      return null;
  }
  email = email.trim();

  var index = this.state.emails.indexOf(email);
  console.log("index", index);
  if (index == -1) {
    return null;
  } else {
    return this.state.emails[index];
  }
}
render() {
  return (
    <View>
    {this.renderMethod()}
    </View>
  );
}
export default FirstPage;
