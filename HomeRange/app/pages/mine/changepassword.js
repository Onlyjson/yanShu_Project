/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:37
 */







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
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
let dim = Dimensions.get('window');


export default class Mine extends Component {
    static navigationOptions=({navigation})=>({
        //header:null,
        headerTitle:'修改密码',
        headerTitleStyle:{color:'white', fontSize:18},
        headerStyle:{backgroundColor:'#1aa0f7'}
    })
    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            })
            return jsonValue;
        });
    }
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            phoneNumber:0,
            passWordnow:0,
            passWord1:0,
            passWord2:0,
        };
    }
    componentDidMount(){
        this.get('userInfo').then(()=>this.getuser());

    }

    getuser(){
        let body = {
            userid:this.state.userInfo.id,
            sign:"1"
        };
        let url = config.api.base + config.api.getuser;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data.data);
                    this.setState({
                        phoneNumber:data.data.phone
                    })
                    //TODO
                    //Toast.success('获取用户信息成功',1)
                } else {
                    //TODO
                    Toast.fail('获取用户信息失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    passWordnow(obj){
        this.setState({
            passWordnow:obj
        })
    }
    password1(obj){
        this.setState({
            passWord1:obj
        })
    }
    password2(obj){
        this.setState({
            passWord2:obj
        })
    }
    changePassword(){
        let body = {
            id: this.state.userInfo.id,
            password:this.state.password2,
            sign:"1"
        };
        let url = config.api.base + config.api.update;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    //TODO
                    //Toast.success('更换密码成功',1)
                } else {
                    //TODO
                    ///Toast.success('更换密码失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    render() {
        return (
            <View style={{width:dim.width,height:dim.height,backgroundColor:"#fff"}}>
                <View style={[styles.center,{height:100}]}>
                    <Text style={{fontSize:16}}>
                        账号：{this.state.phoneNumber}
                    </Text>
                </View>
                <View style={[styles.center,styles.row,{height:40}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                        <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                                   onChangeText={(text) => this.passWordnow(text)}
                            style={[{width:200,height:40,fontSize:14}]} placeholder='当前密码'></TextInput>
                    </View>
                </View>
                <View style={[styles.center,styles.row,{height:40}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                        <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                                   onChangeText={(text) => this.password1(text)}
                            style={[{width:200,height:40,fontSize:14}]} placeholder='新密码'></TextInput>
                    </View>
                </View>
                <View style={[styles.center,styles.row,{height:40}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#f1f1f1',width:200,height:40}}>
                        <TextInput secureTextEntry={true} clearButtonMode={'while-editing'}
                                   onChangeText={(text) => this.password2(text)}
                            style={[{width:200,height:40,fontSize:14}]} placeholder='重新输入密码'></TextInput>
                    </View>
                </View>

                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:67}}>
                    <TouchableOpacity onPress={()=>this.get('userInfo').then(()=>this.changePassword())}>
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





