
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


const circleImage = require("../../img/circle.png");

export default class BenderScreen extends Component {

  static navigationOptions = {
      tittle:"我的",
      tabBarLabel: '我的',
      tabBarIcon:()=>(
          <Image
              source={circleImage}
              style={{width: 30, height: 30}}
          />
      ),
  };

  onMore() {
    this.props.navigation.navigate('MineDetail');
  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
