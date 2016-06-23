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

class Recommendations extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      movie : "",
      error: '',
      dataSource: this.ds.cloneWithRows(this.props.passProps.movies)
    }
  }

  handleChange(e){
    this.setState({
      movie: e.nativeEvent.text
    })
  }

  handleSubmit(){
    var movie = this.state.movie;
    this.setState({
      movie: ''
    });
        api.getMovies()
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error})
      });
  }

  renderRow(rowData){
    return (
      <View style={styles.rowContainer}>
          <Text style={styles.movieList}> {rowData} </Text>
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
          <Text style={styles.header}>
            Your Movie Recommendations
          </Text>
        </View>
        <View style={styles.middleContent}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            />
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
  middleContent: {
    flex: 4,
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
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginLeft: -170,
  },
  rowContainer: {
    alignItems: 'center',
  },
  movieList: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "Papyrus",
  },
  searchInput: {
    height: 60,
    width: 220,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#b6b6b6',
    marginLeft: -20,
    fontFamily: "Papyrus",
  },
  footerContainer: {
    marginBottom: 30,
    marginLeft: 20,
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


module.exports = Recommendations;
