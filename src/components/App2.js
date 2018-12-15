import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {Card , CardSection} from './common';
import Registration from './Registration';
import postAdd from './postAdd';
import AddPost from './AddPost';
import Adds from './Adds';
import Users from './Users';
class App2 extends Component {
  render() {
      return (
        <ScrollableTabView>
          <Adds tabLabel = "Adds" />
          <AddPost tabLabel = "Post" />
          <Users tabLabel = "Chat" />
        </ScrollableTabView>
      );
    }

}

export default App2;
