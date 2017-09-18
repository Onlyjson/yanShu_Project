import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { TabNavigator, StackNavigator } from "react-navigation";


import Index from "./index/pages/index";
import IndexDetail from "./index/pages/indexDetail";
import BillList from "./bill/pages/billList";
import BillDetaiil from "./bill/pages/billDetaiil";
import Mine from "./mine/pages/mine";
import MineDetail from "./mine/pages/mineDetail";


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