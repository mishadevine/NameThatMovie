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

import api from './utili/api';

var Profile = React.createClass({
  render: function() {
    return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.logo}
          source={require('./img/NameThatMovie_logov5.png')}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight
          style={styles.playNow}
          onPress={this.play}>
            <Text>Play Now</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.recMovies}
          onPress={this.rec}>
            <Text>Recommendations</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.favMovies}
          onPress={this.fav}>
            <Text>Favorite Movies</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.addquestion}
          onPress={this.newQuest}>
            <Text> Add Questions To The Game </Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  },

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

  rec: function() {
    this.props.navigator.push({
      name: 'Recommendations',
    });
  },

  fav: function() {
    api.getMovies()
    .then((res) => {
      res = res || {};
      this.props.navigator.push({
        name: 'FavMovies',
        passProps: {
          movies: res
        }
      })
    });
  },

  newQuest: function() {
    api.getNewQuestions()
    .then((res) => {
      res = res || {};
      this.props.navigator.push({
        name: 'AddQuest',
        passProps: {
          newquestions: res
        }
      })
    });
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
    height: 150,
    width: 150,
    marginTop: 50,
  },
  buttons: {
    flex: 1.5,
  },
  playNow: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  recMovies: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  favMovies: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addquestion: {
    backgroundColor: '#bbdefb',
    padding: 20,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
    alignItems: 'center',
  }
});


module.exports = Profile;
