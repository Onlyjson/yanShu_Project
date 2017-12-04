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
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { ActivityIndicator,Toast } from 'antd-mobile'
import { NavigationActions } from 'react-navigation'
import DeviceStorage from "../../../app/utils/AsyncStorge";
var md5 = require('md5')
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import request from '../../utils/Request'
import config from '../../utils/Config'

export default class Login extends Component {


    // 保存
    async save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    static navigationOptions=({navigation})=>({
        header : null,
    })
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            notice:"",
            phone:'',
            password:'',
            animating:false,
        };
    }


    render() {
        return (
            <View style={styles.contain}>
                <ActivityIndicator
                    size='large'
                    color="#1aa0f7"
                    text="正在加载..."
                    toast={true}
                    animating={this.state.animating}
                />

                <View>
                    <Image source={require('../../image/dengzhuce/bg.png')} style={{width:global.SCREEN_WIDTH,height:220}}/>
                    <Image source={require('../../image/dengzhuce/logo.png')} style={{width:117,height:80,position:'absolute',top:128,left:40}}/>
                </View>

                <KeyboardAwareScrollView>

                    <View style={styles.textInputBoxStyle1}>
                        <Image source={require("../../image/dengzhuce/accountnumber.png")} style={styles.iconStyle}/>
                        <TextInput
                            style={styles.textInputStyle}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholder="请输入账号"
                            //placeholderTextColor={'rgba(255,255,255,0.8)'}
                            placeholderTextColor='#666666'
                            //去掉android默认下划线
                            underlineColorAndroid='transparent'
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                        />
                    </View>
                    <View style={styles.line}/>

                    <View style={styles.textInputBoxStyle}>
                        <Image source={require("../../image/dengzhuce/password.png")} style={styles.iconStyle}/>
                        <TextInput
                            style={styles.textInputStyle}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholder="请输入密码"
                            placeholderTextColor='#666666'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />

                    </View>
                    <View style={styles.line}/>



                    <View style={styles.forget}>
                        <Text style={{fontSize:14,color:"#8e8e8e",textAlign:'right'}}
                            onPress={()=>this._forget()}
                        >忘记密码?</Text>
                    </View>

                    {
                        this.state.notice
                            ?
                            <View style={styles.noticeView}>
                                <Image source={require("../../image/dengzhuce/prompt.png")} style={{height:15,width:20}}/>
                                <Text style={{fontSize:13,color:'#ff6300'}}>{this.state.notice}</Text>
                            </View>
                            :
                            <View style={{height:30}}></View>
                    }

                    <TouchableOpacity style={styles.loginBox} onPress={this._login}>
                        <Text style={styles.loginText}>登录</Text>

                    </TouchableOpacity><TouchableOpacity style={styles.loginBox1} onPress={this._register}>
                        <Text style={styles.loginText}>注册</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>


            </View>
        );
    }

    _login=()=> {

        if (!this.state.phone) { return Toast.fail('账号不能为空哦',1)}
        if (!this.state.password) { return Toast.fail('密码不能为空哦',1)}

        this.setState({ animating:true })

        let phone=this.state.phone
        let password=this.state.password
        let body = {
            phone: phone,
            password: password,
            sign:'1'
        };
        let url = config.api.base + config.api.login;
        request.post(url, body).then(
            (data) => {
                console.log('返回数据--->',data)
                if (data.code =='1') {
                    this.save('userInfo',data.data);
                    this.setState({ animating:false });
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'MyTab', params: { token: '123456' }})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction);

                } else {
                    this.setState({ notice:data.msg,animating:false });
                    //Toast.fail(data.msg,2)
                }
            }
        )
            .catch((err) => {
                this.setState({ animating:false });
                alert(err);
            });

    }


    //注册
    _register=()=>{
        this.props.navigation.navigate('SingUp');
    }
   //忘记密码
    _forget=()=>{
        this.props.navigation.navigate('Chongzhi');
    }


}

const styles = StyleSheet.create({
    contain:{
        flex:1,
        backgroundColor:'white'
    },
    textInputBoxStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:35,
        marginLeft:30,
        marginRight:30,
        marginTop:40,
    },
    textInputBoxStyle1:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height:35,
        marginLeft:30,
        marginRight:30,
        marginTop:20,
    },
    iconStyle:{
        width: 12,
        height: 14,
    },
    textInputStyle: {
        flex: 1,
        paddingLeft:20,
        justifyContent: 'center',
        color:'#333'
    },
    line:{
        width:global.SCREEN_WIDTH-60,
        height:1,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'rgb(214,214,215)'
    },
    forget:{
        width:100,
        marginLeft:30,
        marginRight:30,
        height:30,
        alignSelf:'flex-end',
        justifyContent:'center'

    },
    loginBox: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
        backgroundColor: '#1aa0f7',
        height: 40,
        width:240,
        borderRadius:20,
        marginHorizontal:(global.SCREEN_WIDTH-240)/2
    },
    loginBox1: {
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
        backgroundColor: 'rgb(170,220,255)',
        height: 40,
        width:240,
        borderRadius:20,
        marginHorizontal:(global.SCREEN_WIDTH-240)/2
    },
    loginText:{
        textAlign:'center',
        fontSize:18,
        color:'white',
    },
    YanCodeView: {
        height: 20,
        width: 110,
        backgroundColor: '#1aa0f7',
        borderRadius:10,
    },
    noticeView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        height:30
    }
});



