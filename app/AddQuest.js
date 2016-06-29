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

class AddQuest extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      newquestion : "",
      answerA : "",
      answerB: "",
      answerC : "",
      answerD : "",
      correctanswer : "",
      error: '',
      dataSource: this.ds.cloneWithRows(this.props.passProps.newquestions)
    }
  }

  handleChange(e){
    this.setState({
      newquestion: e.nativeEvent.text
    })
  }

  handleSubmit(){
    var newquestion = this.state.movie;
    this.setState({
      newquestion: ''
    });
    api.addNewQuestion(newquestion)
      .then((date) => {
        api.getNewQuestions()
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error})
      });
  }

  submitBar() {
    return (
      <View style={styles.container}>
        <View style={styles.middle}>
          <TextInput
            style={styles.searchInput}
            value={this.state.newquestion}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter A Question" />
          <TextInput
            style={styles.searchInput}
            value={this.state.answerA}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Answer A" />
          <TextInput
            style={styles.searchInput}
            value={this.state.answerB}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Answer B" />
          <TextInput
            style={styles.searchInput}
            value={this.state.answerC}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Answer C" />
          <TextInput
            style={styles.searchInput}
            value={this.state.answerD}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Answer D" />
          <TextInput
            style={styles.searchInput}
            value={this.state.correctanswer}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Correct Answer" />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#88d4f5"
            >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>
            Add Questions
          </Text>
          <TouchableHighlight
            style={styles.backbtn}
            onPress={this.backToProfile.bind(this)}
            underlayColor="#88d4f5"
            >
              <Text style={styles.backProfile}>Back</Text>
          </TouchableHighlight>
          <Text style={styles.expl}> Got a question you want to see in the game?</Text>
          <Text style={styles.expl1}> Submit it below!</Text>
        </View>
          {this.submitBar()}
      </View>
    )
  }

  backToProfile() {
    this.props.navigator.push({
      name: 'Profile',
    })
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
    alignItems: 'center',
  },
  header: {
    marginTop: 50,
    fontFamily: "DK Lemon Yellow Sun",
    fontSize: 30,
    color: '#fff',
    marginBottom: 10,
  },
  expl: {
    alignItems: 'center',
    fontSize: 15,
  },
  expl1: {
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 15,
  },
  middle: {
    marginLeft: 20,
    marginTop: -250,
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: -170,
  },
  searchInput: {
    height: 60,
    width: 220,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#b6b6b6',
    marginLeft: -20,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    fontFamily: "Papyrus",
  },
  button: {
    height: 60,
    width: 220,
    backgroundColor: '#e040fb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
  },
  backProfile: {
    marginTop: -30,
    marginLeft: -150,
    width: 35,
    color: '#bbdefb',
  },
});

module.exports = AddQuest;
