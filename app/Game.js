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





        // this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
        this.state = {
          movie : "",
          error: '',
          // dataSource: this.props.passProps.movies
        }


        // function createHtmlList(game) {
        //   const listElements = game.map(x => `<li>${x}</li>`).join('');
        //   return `<ul>${listElements}</ul>`
        //
        // }
      }

      // (
      //   <View style={styles.rowContainer}>
      //     <Text style={styles.wrapper}> {mapped} </Text>
      //   </View>
      // )


      renderRow(game){
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
        // var game = this.props.passProps.movies
        // const mapped = game.map(x => x.Question1.Answers.A);
        const mapped = game.map(x => x.Question1.Question);

        // console.log(createHtmlList(mapped));
        console.log(mapped);
        return (

            <View style={styles.rowContainer}>
              <View style={styles.wrapper}>

                <Text style={styles.question}> "{mapped}" </Text>


              </View>
            </View>

        )
      }
      render(){
        return (
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('./img/NameThatMovie_logov5.png')}
            />
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
