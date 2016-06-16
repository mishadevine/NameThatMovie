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
            value={this.state.question}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter A Movie" />
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

  renderRow(rowData){
    return (

        <View style={styles.rowContainer}>
          <Text> {rowData.Question} </Text>
          <Text> {rowData.Answers.A1} </Text>
          <Text> {rowData.Answers.B1} </Text>
          <Text> {rowData.Answers.C1} </Text>
          <Text> {rowData.Answers.D1} </Text>
          <Text> {rowData.CorrectAnswer} </Text>
        </View>

    )
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Image
            style={styles.logo}
            source={require('./img/NameThatMovie_logov5.png')}
          />
          <Text style={styles.header}>
            Add Questions
          </Text>
          <Text style={styles.expl}> Got a question you want to see in the game? Add it below!</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
          {this.submitBar()}
      </View>
    )
  }

}

    // return (
    //   <View style={styles.container}>
    //     <View style={styles.wrapper}>
    //       <Text style={styles.header}>
    //         Your Favorite Movies
    //       </Text>
    //     </View>
    //     <View style={styles.middle}>
    //       <TextInput
    //         style={styles.searchInput}
    //         placeholder="Enter A Movie" />
    //       <TouchableHighlight
    //         style={styles.button}
    //         underlayColor="#88d4f5"
    //         >
    //         <Text style={styles.buttonText}>Submit</Text>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // );
//   }
//
//
// });




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
  },
  expl: {
    alignItems: 'center',
    marginBottom: 10,
  },
  middle: {
    flex: 4,
    marginLeft: 20,
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
  },
  button: {
    height: 60,
    width: 100,
    marginLeft: 200,
    marginTop: -60,
    backgroundColor: '#e040fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

module.exports = AddQuest;
