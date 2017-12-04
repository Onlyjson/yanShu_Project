/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/1 上午11:44
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
    ListView,
    ActivityIndicator
} from 'react-native';

export  default  styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },

    navBarBoxStyle:{
        height: Platform.OS === 'ios' ? 64:44,
        paddingRight:10,
        flexDirection:'row',
        backgroundColor:'#1aa0f7',
        alignItems:'center',
        //justifyContent:'center',
    },
    //导航栏的样式
    navBarStyle:{
        marginTop:Platform.OS==='ios'?20:0,
        //设置主轴的方向
        flexDirection:'row',
        flex:1,
        marginLeft:10,
        paddingLeft:10,
        //垂直居中--->设置侧轴的对齐方式
        alignItems:'center',
        backgroundColor:'#fff',
        justifyContent:'center',
        borderRadius:5,
        height:30,
        marginRight:10,
    },

    textInputStyle:{
        marginLeft:10,
        flex:1,
        padding:0,
        width:214,
    },
    icon:{
        height:13,
        width:13
    },
    textBox:{
        marginTop:Platform.OS==='ios'?20:0,
    },
    text:{
        color:'white',
        fontSize:16
    },

});
