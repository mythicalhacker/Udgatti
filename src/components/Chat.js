// import React from 'react';
//
// import { GiftedChat } from 'react-native-gifted-chat';
// import Backend from './Backend';
//
// export default class SecondPage extends React.Component {
//   state = {
//     messages: [],
//   };
//   componentWillMount() {
//
//   }
//   render() {
//     var self = this;
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={(message) => {
//           Backend.sendMessage(message, self.props.userId, self.props.name);
//         }}
//         user={{
//           _id: self.props.userId,
//           name: this.props.name
//         }}
//       />
//     );
//   }
//   componentDidMount() {
//     console.log("emailIdCombo", this.props.emailIdCombo);
//     Backend.loadMessages(this.props.emailIdCombo, (message) => {
//       this.setState((previousState) => {
//         return {
//           messages: GiftedChat.append(previousState.messages, message),
//         };
//       });
//     });
//   }
//   componentWillUnmount() {
//     Backend.closeChat();
//   }
// }
//
// SecondPage.defaultProps = {
//   name: 'John Smith',
// };
//
// SecondPage.propTypes = {
//   name: React.PropTypes.string,
//};


import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from './Backend';
export default class Chat extends React.Component {
  state = {
    messages: [],
  };
  componentWillMount() {

  }
  render() {
    var self = this;
    console.log("props", this.props);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
        Backend.sendMessage(message);
        }}
        user={{
          _id: self.props.userId,
          name: self.props.name
        }}
      />
    );
  }
  componentDidMount() {
    console.log("emailIdCombo", this.props.emailIdCombo);
    Backend.loadMessages(this.props.emailIdCombo,(message) => {
      this.setState((previousState) => {
        return {

          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}
