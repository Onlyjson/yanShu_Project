import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { TabNavigator, StackNavigator } from "react-navigation";


import Index from "./index";
import IndexDetail from "./indexDetail";
import BillList from "./billList";
import BillDetaiil from "./billDetaiil";
import Mine from "./mine";
import MineDetail from "./mineDetail";


const Tabs = TabNavigator({
    Index:{screen:Index},
    BillList:{screen:BillList},
    Mine:{screen:Mine}
});



const App = StackNavigator({
    Main: { screen: Tabs,navigationOptions:{
        headerStyle:{height:0},
        headerBackTitle:"返回",
    }},
    IndexDetail: { screen: IndexDetail},
    BillDetaiil: { screen: BillDetaiil},
    MineDetail: { screen: MineDetail }
});




AppRegistry.registerComponent('workspace', () => App);