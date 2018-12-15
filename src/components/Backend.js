
import firebase from './Firebase';

class Backend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setUid(user.uid);
    //   } else {
    //     firebase.auth().signInAnonymously().catch((error) => {
    //       alert(error.message);
    //     });
    //   }
    // });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }
  // retrieve the messages from the Backend
  loadMessages(reference,callback) {
    this.messagesRef = firebase.database().ref(reference);
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      console.log("message",message);
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: new Date().getTime(),
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();





// import firebase from 'firebase';
//
// class Backend {
//   uid = '';
//   messagesRef = null;
//   // initialize Firebase Backend
//   constructor() {
//     firebase.initializeApp({
//       apiKey: 'AIzaSyA9VAfk5zbc2-X5HsdnXS5olQ2vx56-yY4',
//       authDomain: 'authentication-4b51c.firebaseapp.com',
//       databaseURL: 'https://authentication-4b51c.firebaseio.com',
//       storageBucket: 'authentication-4b51c.appspot.com',
//       messagingSenderId: '314810529075'
//     });
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setUid(user.uid);
//       } else {
//         firebase.auth().signInAnonymously().catch((error) => {
//           alert(error.message);
//         });
//       }
//     });
//   }
//   setUid(value) {
//     this.uid = value;
//   }
//   getUid() {
//     return this.uid;
//   }
//   // retrieve the messages from the Backend
//   loadMessages(callback) {
//     this.messagesRef = firebase.database().ref('messages');
//     this.messagesRef.off();
//     const onReceive = (data) => {
//       const message = data.val();
//       callback({
//         _id: data.key,
//         text: message.text,
//         createdAt: new Date(message.createdAt),
//         user: {
//           _id: message.user._id,
//           name: message.user.name,
//         },
//       });
//     };
//     this.messagesRef.limitToLast(20).on('child_added', onReceive);
//   }
//   // send the message to the Backend
//   sendMessage(message) {
//     for (let i = 0; i < message.length; i++) {
//       this.messagesRef.push({
//         text: message[i].text,
//         user: message[i].user,
//         createdAt: firebase.database.ServerValue.TIMESTAMP,
//       });
//     }
//   }
//   // close the connection to the Backend
//   closeChat() {
//     if (this.messagesRef) {
//       this.messagesRef.off();
//     }
//   }
// }
//
// export default new Backend();
