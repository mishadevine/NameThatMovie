import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView,
  Image
} from 'react-native';

var Recommendations = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.logo}
          source={require('./img/NameThatMovie_logov4.png')}
        />
      </View>
    </View>
    );
  },

  play: function() {
    this.props.navigator.push({
      name: 'Game',
    });
  },


});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e040fb',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: -170,
  },
  playNow: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
  },
});


module.exports = Recommendations;
