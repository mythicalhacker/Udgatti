import React ,{Component} from 'react';
import {View } from 'react-native';
import {Text,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {Card, CardSection , Input} from './common';
import Button from './common/Button';
import Just from './common/Just';
import {Actions} from 'react-native-router-flux';
let user;

class Users extends Component {

  state = {loggedIn: null,email: '',user: '',name: '',emailsecondperson:'',mail_Id: '',uid: '',useremail:'',userId:''};

  componentWillMount(props) {
    user = this.props.user;
    var self = this;
    var emails = [];
    state = {
      listofuser: [],
    };
  this.setState({uid: firebase.auth().currentUser.uid});
  firebase.database().ref('users/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childData.email != null && typeof childData.email != undefined) {
        if(childKey == firebase.auth().currentUser.uid) {
          self.setState({
            useremail:childData,
            userId:childKey
          });
        }
        else {
          emails.push(childData.email);
        }
      }

    });
    self.setState({'emails':emails})
  });
}


changeActivity(email_of_other_person) {
  var emailstosort = [];
  emailstosort.push(this.state.useremail.email);
  emailstosort.push(email_of_other_person);
  emailstosort.sort();
  console.log("this.state.useremail", this.state.useremail);
  var emailIdCombo = emailstosort.join('-').replace(/[^a-z0-9]/gi,'');
  console.log("emailIdCombo", emailIdCombo);
  console.log("emailstosort", emailstosort);
  Actions.chat({
    name:this.state.useremail.email,
    userId:this.state.uid,
    emailIdCombo: emailIdCombo,
  });
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
        onPress = {() =>{
          self.changeActivity(email);
        }}>
      <Text>{email}</Text>
      </TouchableOpacity>
      </CardSection>
    );
  });
}
render() {
  return (
    <View>
    {this.renderEmails()}
    <CardSection>
      <Button onPress={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </CardSection>
    </View>
  );
  }
}



export default Users;
