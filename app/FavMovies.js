import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';

import api from './utili/api';

class FavMovies extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
    this.state = {
      note : "",
      error: '',
      dataSource: this.ds.cloneWithRows(this.props.passProps.notes)
    }
  }

  onButtonPress(){
    this.props.navigator.pop ({
    });
  }

  handleChange(e){
    this.setState({
      note: e.nativeEvent.text
    })
  }

  handleSubmit(){
    var note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(note)
      .then((date) => {
        api.getNotes()
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

  submitBar(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88d4f5"
          >
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  renderRow(rowData){
    return (

        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>

    )
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          />
          {this.submitBar()}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 60,
    backgroundColor: '#48bbec',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10,
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#dddfd4',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

module.exports = FavMovies;
