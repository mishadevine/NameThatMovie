import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import Auth0Lock from 'react-native-lock';

var credentials = require('./auth0-credentials');

var lock = new Auth0Lock(credentials);

var Home = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./img/NameThatMovie_logov4.png')}
      />
      <TouchableHighlight
        style={styles.playNow}
        onPress={this.play}>
          <Text>Play Now</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={this.login}>
          <Text>Login With Facebook</Text>
      </TouchableHighlight>

    </View>
    );
  },

  play: function() {
    this.props.navigator.push({
      name: 'Game',
    });
  },

  login: function() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.props.navigator.push({
        name: 'Profile',
        passProps: {
          profile: profile,
          token: token,
        }
      });
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
    alignSelf: 'center',
    height: 169,
    width: 151,
    marginTop: -50,
    marginBottom: 70,
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


module.exports = Home;
