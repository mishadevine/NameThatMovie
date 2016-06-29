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
  import Questions from './components/Questions';
  import AnswerList from './components/AnswerList';

  class Game extends Component {
    constructor(props){
      super(props);
      // this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
      this.state = {
        movie : "",
        error: '',
        // dataSource: this.props.passProps.movies
      }
    }


    render(){
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./img/NameThatMovie_logov5.png')}
          />
          <View style={styles.wrapper}>
            <Questions />
            <AnswerList />
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
  firstQues: {
    fontSize: 30,
    marginBottom: 15,
  },
  question: {
    fontSize: 20,
    marginBottom: 15,
  },
  answer: {
    fontSize: 20,
    marginBottom: 15,
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
  addquestion: {
    backgroundColor: 'red',
  }
});



module.exports = Game;
