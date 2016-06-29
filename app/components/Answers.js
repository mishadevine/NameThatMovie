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

import Questions from './Questions';

class Answers extends Component {

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text>The Answers</Text>
          <Text>{this.renderRow()}</Text>
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
});



module.exports = Answers;
