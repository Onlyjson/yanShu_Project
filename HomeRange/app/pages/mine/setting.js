






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
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');


export default class Mine extends Component {
    goHuanbang(){
        this.props.navigation.navigate('Huanbang');
    }
    goPassword() {
        this.props.navigation.navigate('Change');
    }
    goSignup(){
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.goHuanbang()}>
                <View style={{backgroundColor:"#fff",marginTop:10}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:100,marginLeft:15}}>
                            <Text style={{textAlign:'left'}}>
                                手机
                            </Text>
                        </View>
                        <View style={{flex:1,marginRight:15}}>
                            <Text style={{textAlign:'right'}}>
                            158****2356
                            </Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:100}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                银行卡
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15}}>
                                未绑定
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this.goPassword()}>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:50},styles.row,styles.center]}>
                        <View style={{width:100}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                设置密码
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15}}>
                                修改
                            </Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goSignup()}>
                <View style={[styles.center,{height:50,marginTop:80,backgroundColor:"#fff"}]}>
                    <Text>
                        退出账户
                    </Text>
                </View>
                </TouchableOpacity>
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





