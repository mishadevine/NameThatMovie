import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  Image,
  Navigator
} from 'react-native';

import Answers from './Answers';

class AnswerList extends Component {

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Answers />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
  },
  wrapper: {
    flex: 1,
    marginTop: -100,
  },
});



module.exports = AnswerList;
