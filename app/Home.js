import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import Auth0Lock from 'react-native-lock';
import api from './utili/api';

var credentials = require('./auth0-credentials');

var lock = new Auth0Lock(credentials);

var Home = React.createClass({

  play: function() {
    api.getQuestions()
    .then((res) => {
      res = res || {};
      this.props.navigator.push({
        name: 'Game',
        passProps: {
          questions: res
        }
      })
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

  render: function() {
    return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./img/NameThatMovie_logov5.png')}
      />
      
      <TouchableHighlight
        style={styles.playNow}
        onPress={this.play}>
          <Text style={styles.play}>Play Now</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.loginButton}
        onPress={this.login}>
          <Text style={styles.login}>Login With Facebook</Text>
      </TouchableHighlight>

    </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1976d2',
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
  play: {
    fontFamily: "Papyrus",
    fontSize: 15,
  },
  login: {
    fontFamily: "Papyrus",
    fontSize: 15,
  },
  todo: {
    fontFamily: "Papyrus",
    fontSize: 15,
  },
  todoList: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 5,
    marginBottom: 10,
  },
});


module.exports = Home;
