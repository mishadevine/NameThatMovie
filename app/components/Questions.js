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

class Questions extends Component {

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
    // var game = this.props.passProps.movies
    const question1 = game.map(x => x.questionsANDanswers.Question1.Question);
    const answers1 = game.map(x => x.questionsANDanswers.Question1.Answers.A);
    const answers2 = game.map(x => x.questionsANDanswers.Question1.Answers.B);
    const answers3 = game.map(x => x.questionsANDanswers.Question1.Answers.C);
    const answers4 = game.map(x => x.questionsANDanswers.Question1.Answers.D);

    console.log(question1);
    return (

        <View style={styles.rowContainer}>
          <View style={styles.wrapper}>
            <Text style={styles.firstQues}>Question 1:</Text>
            <Text style={styles.question}> "{question1}" </Text>
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
          <Text>Questions</Text>
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



module.exports = Questions;
