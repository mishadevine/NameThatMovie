import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

  import Home from './app/Home';
  import Game from './app/Game';
  import Profile from './app/Profile';
  import Recommendations from './app/Recommendations';
  import FavMovies from './app/FavMovies';

  class NameThatMovie extends Component {
    render() {
      return (
        <Navigator style={styles.navigator}
          initialRoute={{ id: "Home"}}
          renderScene= { this.renderScene }
        />
      );
    }

    renderScene(route, navigator) {
     if (route.id == "Home") {
       return <Home navigator={navigator} passProps={route.passProps} />
     }
     if (route.id == "Profile") {
       return <Profile navigator={navigator} passProps={route.passProps} />
     }
     if (route.id == "Game") {
       return <Game navigator={navigator} passProps={route.passProps} />
     }
     if (route.id == "Recommendations") {
       return <Recommendations navigator={navigator} passProps={route.passProps} />
     }
     if (route.id == "FavMovies") {
       return <FavMovies navigator={navigator} passProps={route.passProps} />
     }
   }

  }



  const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
  });

AppRegistry.registerComponent('NameThatMovie', () => NameThatMovie);
