
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
        headerTitle:'关于我们',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });


    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="dark-content"/>
            <View style={{flex:1,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:"#e5eaf6"}}>
                <View
                    numberOfLines={2}
                    style={{marginHorizontal:32,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require("../../image/wode/logo.png")} style={{marginTop:47,width:64,height:46}}/>
                    <Text style={{marginTop:18}}>
                        融博生活圈
                    </Text>
                    <Image source={require("../../image/wode/slogan.png")} style={{marginTop:46,width:215,height:50}}/>
                    <Text style={{color:'#666',marginTop:56}}>
                        <Text style={{lineHeight:24,fontSize:14,width:28,height:12,backgroundColor:'#fff',opacity:0}}>空格</Text>
                           融博生活圈是普洱融博科技网络有限公司2017年创立，运用当下最新的思维模式：分享经济、倍增原理、大数据、互联网金融、资本市场，致力于创建一个以新零售、新制造、新金融、新技术和新能源为主的新型商业模式。
                    </Text>
                </View>
            </View>
                <View style={{position:'absolute',bottom:40,width:dim.width,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#999',fontSize:10,backgroundColor:'rgba(0,0,0,0)'}}>
                        Copyright@2017
                    </Text>
                    <Text style={{color:'#999',fontSize:12,marginTop:5,backgroundColor:'rgba(0,0,0,0)'}}>
                        普洱融博网络科技有限公司
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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





