import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDtY7HtZyrEry1JePQaqeEy9UsxjNYtc6U',
  authDomain: 'check-183b9.firebaseapp.com',
  databaseURL: 'https://check-183b9.firebaseio.com',
  storageBucket: 'check-183b9.appspot.com',
  messagingSenderId: '1059255463109'
};

var Firebase = firebase.initializeApp(config);
export default Firebase;
