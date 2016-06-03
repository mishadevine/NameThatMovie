import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class NameThatMovie extends Component {
  import Home from './app/Home';

  class auth extends Component {
    renderScene(route, navigator) {
     if (route.name == "Home") {
       return <Home navigator={navigator} {...route.passProps} />
     }
     if (route.name == "Profile") {
       return <Profile navigator={navigator} {...route.passProps} />
     }
   }

   render() {
     return (
       <Navigator style={styles.navigator}
         initialRoute={{ name: "Home"}}
         renderScene= { this.renderScene }
         navigationBar={
           <Navigator.NavigationBar
             style={ styles.nav }
             routeMapper={NavigationBarRouteMapper} />
         }
       />
     );
   }
  }

  let NavigationBarRouteMapper = {
   LeftButton(route, navigator, index, navState) {
     if(index > 0) {
       return (
         <TouchableHighlight
           underlayColor="transparent"
           onPress={() => { if (index > 0) { navigator.pop() } }}>
           <Text style={ styles.leftNavButtonText }>Back</Text>
         </TouchableHighlight>)
     }
     else { return null }
   },

   RightButton(route, navigator, index, navState) {
     return null
   },

   Title(route, navigator, index, navState) {
     return <Text style={ styles.title }>Auth0 Sample</Text>
   }
  };

  const styles = StyleSheet.create({
   navigator: {
     flex: 1,
   },
   title: {
     marginTop:4,
     fontSize:16
   },
   leftNavButtonText: {
     fontSize: 18,
     marginLeft:13,
     marginTop:2
   },
   rightNavButtonText: {
     fontSize: 18,
     marginRight:13,
     marginTop:2
   },
   nav: {
     height: 60,
     backgroundColor: '#efefef'
   }
  });

AppRegistry.registerComponent('NameThatMovie', () => NameThatMovie);
