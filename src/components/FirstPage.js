import React ,{Component} from 'react';
import {View } from 'react-native';
import {Text,TouchableOpacity} from 'react-native';
import firebase from './Firebase';
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
      Actions.chat({
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

render() {
  return (
    <View>
    {this.renderMethod()}
    </View>
  );
}
}
export default FirstPage;
