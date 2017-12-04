/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/9/30 下午2:05
 */

import { AppRegistry,View,Text ,} from 'react-native';
import React, { Component } from 'react';

import './common/Global';
import App from './MyApp';
import SplashScreen from 'react-native-splash-screen';
import *as wechat from 'react-native-wechat'

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}


export default class Root extends Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        wechat.registerApp('wxfa7e09756642baa0');
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();//关闭启动屏幕
    }

    render() {
        return (
            <App />
        );
    }
};


console.ignoredYellowBox = ['Warning: BackAndroid is deprecated.  Please use BackHandler instead.',
    'source.uri should not be an empty string'
];
// global.BASEURL = 'hahaha';
// 关闭全部的警告
//console.disableYellowBox = true;
// 关闭指定的警告
//console.warn('YellowBox is disabled.');
AppRegistry.registerComponent('HomeRange', () => Root);