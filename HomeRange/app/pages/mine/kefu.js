
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
let dim = Dimensions.get('window');

import { NavigationActions } from 'react-navigation'
export default class Mine extends Component {

    //初始化赋值
    constructor(props){
        super(props);
        this.state={
            phoneNumber:"",
        }
    }
    componentDidMount(){
    }

    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'客服中心',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });


    render() {
        return (
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <StatusBar barStyle={'dark-content'} />
            <View style={{backgroundColor:'#fff',alignItems:'center',marginTop:40}}>
                <Image source={require("../../image/wode/promise.png")}/>
                <Text style={styles.textStyle1}>我们的承诺</Text>
                <Text style={styles.textStyle}>以诚信规范优质的服务赢得客户的信赖</Text>
            </View>
                <View style={{backgroundColor:'#fff',alignItems:'center',marginTop:40}}>
                    <Image source={require("../../image/wode/time.png")}/>
                    <Text style={styles.textStyle1}>服务时间</Text>
                    <Text style={styles.textStyle}>早:8:00-12:00</Text>
                    <Text style={styles.textStyle}>下:14:00-18:00</Text>
                </View>
                <View style={{backgroundColor:'#fff',alignItems:'center',marginTop:40}}>
                    <Image source={require("../../image/wode/thumb.jpg")}/>
                    <Text style={styles.textStyle1}>客服电话</Text>
                    <Text style={styles.textStyle}>0879-2880888</Text>
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    textStyle1:{
        marginTop:10,
        color:'#1aa0f7'
    }
    ,
    textStyle:{
        marginTop:10
    },
    row:{
        flexDirection:'row'
    },
    borderTop:{
        borderTopWidth:1,borderTopColor:"#f1f1f1"
    },
    borderBottom:{
        borderBottomWidth:1,borderBottomColor:"#f1f1f1"
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});





