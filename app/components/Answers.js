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

  renderRow(game){
    var game = [{
      "questionsANDanswers" : {
        "Question1" : {
          "Question" : "I bet it feels huge in this hand.",
          "Answers" : {
            "A" : "X-Men: Apocalypse",
            "B" : "How to Be Single",
            "C" : "The Do-Over",
            "D" : "Deadpool"
          }
        },
        "Question2" : {
          "Question" : "Alex, destroy Cerebro! Wreak havoc!",
          "Answers" : {
            "A" : "X-Men: First Class",
            "B" : "X-Men: Days of Future Past",
            "C" : "X-Men: Apocalypse",
            "D" : "X-Men"
          }
        },
        "Question3" : {
          "Question" : "Chewie... we're home",
          "Answers" : {
            "A" : "Star Wars: The Force Awakens",
            "B" : "Star Wars: Episode IV - A New Hope ",
            "C" : "Star Wars: Episode VIII",
            "D" : "Star Wars: The Clone Wars"
          }
        }
      }
    }];
    const answers1 = game.map(x => x.questionsANDanswers.Question1.Answers.A);
    const answers2 = game.map(x => x.questionsANDanswers.Question1.Answers.B);
    const answers3 = game.map(x => x.questionsANDanswers.Question1.Answers.C);
    const answers4 = game.map(x => x.questionsANDanswers.Question1.Answers.D);

    return (

        <View style={styles.rowContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.answers}>A: "{answers1}" </Text>
            <Text style={styles.answers}>B: "{answers2}" </Text>
            <Text style={styles.answers}>C: "{answers3}" </Text>
            <Text style={styles.answers}>D: "{answers4}" </Text>
          </View>
        </View>

    )
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {this.renderRow()}
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
    marginTop: -20,
  },
  answers: {
    fontSize: 20,
    marginBottom: 15,
    backgroundColor: '#bbdefb',
    padding: 10,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
  },
});



module.exports = Answers;
