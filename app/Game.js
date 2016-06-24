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

import api from './utili/api';

    class Game extends Component {
      constructor(props){
        super(props);
        var game = [{
            "Question1" : {
              "Question" : "I bet it feels huge in this hand.",
              "Answers" : {
                "A" : "X-Men: Apocalypse",
                "B" : "How to Be Single",
                "C" : "The Do-Over",
                "Demand" : "Deadpool"
              }
            },
            "Question2" : {
              "Question" : "Alex, destroy Cerebro! Wreak havoc!",
              "Answers" : {
                "A" : "X-Men: First Class",
                "B" : "X-Men: Days of Future Past",
                "C" : "X-Men: Apocalypse",
                "Demand" : "X-Men"
              }
            },
            "Question3" : {
              "Question" : "Chewie... we're home",
              "Answers" : {
                "A" : "Star Wars: The Force Awakens",
                "B" : "Star Wars: Episode IV - A New Hope ",
                "C" : "Star Wars: Episode VIII",
                "Demand" : "Star Wars: The Clone Wars"
              }
            },
        }];




        // this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
        this.state = {
          movie : "",
          error: '',
          // dataSource: this.props.passProps.movies
        }
        // var game = this.state.dataSource
        // var searchTerm = "I bet it feels huge in this hand."
        // var filtered = game
        //     .filter(x => x.Question = searchTerm)
        //     .map(x => ` <li>${x.Question}</li>`)
        // console.log(`<ul>${filtered}</ul>`);
        // const game = this.props.passProps.movies
        const mapped = game.map(x => x.Question1.Answers.A);

        console.log(createHtmlList(mapped));
        console.log(createHtmlList(['cat', 'dog']));

        function createHtmlList(game) {
          const listElements = game.map(x => `<li>${x}</li>`).join('');
          return `<ul>${listElements}</ul>`
        }
      }



      // renderRow(rowData){
      //   return (
      //
      //       <View style={styles.rowContainer}>
      //         <View style={styles.wrapper}>
      //
      //           <Text style={styles.question}> {this.QuestionOne} </Text>
      //
      //           <TouchableHighlight
      //             style={styles.answers}>
      //               <Text> {rowData.Answers.A1} </Text>
      //           </TouchableHighlight>
      //
      //           <TouchableHighlight
      //             style={styles.answers}>
      //               <Text> {rowData.Answers.B1} </Text>
      //           </TouchableHighlight>
      //
      //           <TouchableHighlight
      //             style={styles.answers}>
      //               <Text> {rowData.Answers.C1} </Text>
      //           </TouchableHighlight>
      //
      //           <TouchableHighlight
      //             style={styles.answers}>
      //               <Text> {rowData.Answers.D1} </Text>
      //           </TouchableHighlight>
      //         </View>
      //       </View>
      //
      //   )
      // }
      render(rowData){
        return (
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('./img/NameThatMovie_logov5.png')}
            />
            <View style={styles.wrapper}>

              <Text style={styles.question}> {this.QuestionOne} </Text>


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
    marginTop: 50,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: -170,
  },
  question: {
    fontSize: 20,
    marginBottom: 15,
  },
  answers: {
    marginBottom: 10,
    backgroundColor: '#bbdefb',
    padding: 10,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 5,
    overflow: 'hidden',
  },
  addquestion: {
    backgroundColor: 'red',
  }
});



module.exports = Game;
