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
        this.state = {
          movie : "",
          error: '',
          getQuestions(){
            var url = ``;
            return fetch(url).then((res) => res.json());
          },
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
