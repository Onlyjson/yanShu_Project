






/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    // ImageBackground,
    Image,
    Dimensions,
    PixelRatio,
    TextInput,
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');


export default class Mine extends Component {
    render() {
        return (
            <View style={{width:dim.width,height:dim.height,backgroundColor:"#fff"}}>
                <View style={[styles.center,{height:100}]}>
                    <Text style={{fontSize:16}}>
                    账号：15986336236
                    </Text>
                </View>
            <View style={[styles.center,styles.row,{height:40}]}>
                <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                           style={[{width:200,height:40}]} placeholder='当前密码'></TextInput>
                </View>
            </View>
                <View style={[styles.center,styles.row,{height:40}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                        <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                                   style={[{width:200,height:40}]} placeholder='新密码'></TextInput>
                    </View>
                </View>
                <View style={[styles.center,styles.row,{height:40}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                        <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                                   style={[{width:200,height:40}]} placeholder='重新输入密码'></TextInput>
                    </View>
                </View>

                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:67}}>
                    <TouchableOpacity onPress={()=>this.goSinnup()}>
                        <Image source={require('../../image/dengzhuce/button.png')} style={{width:250,height:47}}>
                            <Text style={{backgroundColor:"rgba(0,0,0,0)",width:250,textAlign:'center',marginTop:15.5,color:'#fff'}}>提交</Text>
                        </Image>
                    </TouchableOpacity>
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





