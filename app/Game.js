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
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
        this.state = {
          question : "",
          error: '',
          dataSource: this.ds.cloneWithRows(this.props.passProps.questions)
        }
      }

      // handleChange(e){
      //   this.setState({
      //     note: e.nativeEvent.text
      //   })
      // }

      // handleSubmit(){
      //   var question = this.state.question;
      //   this.setState({
      //     question: ''
      //   });
      //   // api.addQuestion(question)
      //   //   .then((date) => {
      //       api.getQuestions()
      //         .then((data) => {
      //           this.setState({
      //             dataSource: this.ds.cloneWithRows(data)
      //           })
      //         })
      //     // })
      //     .catch((error) => {
      //       console.log('Request failed', error);
      //       this.setState({error})
      //     });
      // }


      renderRow(rowData){
        return (

            <View style={styles.rowContainer}>
              <View style={styles.wrapper}>

                <Text style={styles.question}> {rowData.QuestionOne} </Text>

                <TouchableHighlight
                  style={styles.answers}>
                    <Text> {rowData.Answers.A1} </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.answers}>
                    <Text> {rowData.Answers.B1} </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.answers}>
                    <Text> {rowData.Answers.C1} </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.answers}>
                    <Text> {rowData.Answers.D1} </Text>
                </TouchableHighlight>
              </View>
            </View>

        )
      }
      render(){
        var currentQuestion = 0;
        return (
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('./img/NameThatMovie_logov5.png')}
            />
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              />
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
