/**
 * @author: zhangyh-k@glondon.com
 * @description:注册页面
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountDownButton from '../../common/TimerCount'

export default class SingUp extends Component {
    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'注册',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });

    state = {
        phoneNumber: '',
        vercode:'',
        password: '',
        password_que: '',
        animating:false,
        requestSucc:'1',
        notice:''
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>
                <View style={{height:1,backgroundColor:'#f2f2f2'}}></View>

                <KeyboardAwareScrollView>

                    <View style={styles.textInputBoxStyle1}>
                        <Image source={require("../../image/dengzhuce/accountnumber.png")} style={styles.iconStyle}/>
                        <TextInput
                            style={styles.textInputStyle}
                            maxLength={11}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholder="请输入手机号"
                            //placeholderTextColor={'rgba(255,255,255,0.8)'}
                            placeholderTextColor='#666666'
                            //去掉android默认下划线
                            underlineColorAndroid='transparent'
                            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                            value={this.state.phoneNumber}
                        />
                    </View>
                    <View style={styles.line}/>

                    <View style={styles.textInputBoxStyle}>
                        <TextInput
                            style={styles.textInputStyle}
                            maxLength={11}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholderTextColor='#666666'
                            //去掉android默认下划线
                            underlineColorAndroid='transparent'
                            onChangeText={(vercode) => this.setState({vercode})}
                            value={this.state.vercode}
                        />
                        <CountDownButton enable={this.state.phoneNumber.length>10}
                            style={styles.YanCodeView}
                            textStyle={{color: 'white',fontSize:12}}
                            timerCount={60}
                            onClick={(shouldStartCountting)=>{
                                // 这里调用自己的获取验证码的API
                                // shouldStartCountting是一个回调函数，根据调用接口的情况在适当的时候调用它来决定是否开始倒计时
                                this._fetchCode(shouldStartCountting)
                            }}
                            timerEnd={()=>{
                                console.log('倒计时结束')
                            }}
                        />


                    </View>
                    <View style={styles.line}/>

                    <View style={styles.textInputBoxStyle}>
                        <Image source={require("../../image/dengzhuce/password.png")} style={styles.iconStyle}/>
                        <TextInput
                            style={styles.textInputStyle}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholder="请设置至少六位密码"
                            secureTextEntry={true}
                            placeholderTextColor='#666666'
                            underlineColorAndroid='transparent'
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>
                    <View style={styles.line}/>

                    <View style={styles.textInputBoxStyle}>
                        <Image source={require("../../image/dengzhuce/confirm_password.png")} style={styles.iconStyle}/>
                        <TextInput
                            style={styles.textInputStyle}
                            autoCapitalize='none'
                            clearButtonMode="while-editing"
                            placeholder="请确认密码"
                            placeholderTextColor='#666666'
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            onChangeText={(password_que) => this.setState({password_que})}
                            value={this.state.password_que}
                        />
                    </View>
                    <View style={styles.line}/>

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


                    <TouchableOpacity style={styles.loginBox} onPress={this._fetchRegister}>
                        <Text style={styles.loginText}>注册</Text>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>
            </View>

        );
    }

    _fetchRegister=()=>{
        if (!this.state.password) { return Toast.fail('密码不能为空哦',1)}
        if (!this.state.password_que) { return Toast.fail('确认密码不能为空哦',1)}
        if (!this.state.vercode ) { return Toast.fail('验证码码不能为空哦',1)}
        if (!this.state.phoneNumber) { return Toast.fail('请输入正取的手机号码！',1)}
        if (this.state.password!=this.state.password_que) { return Toast.fail('两次输入的密码不一样！',1)}

        let url = config.api.base + config.api.register;
        let body ={
            phone:this.state.phoneNumber,
            password:this.state.password,
            vercode:this.state.vercode,
            sign:'1'
        }
        request.post(url, body).then(
            (data) => {
                console.log('返回数据--->',data)
                if (data.code==1) {
                    Toast.success('注册成功！',1)
                    const { navigate } = this.props.navigation
                    navigate('Login')
                } else {
                    this.setState({ notice:data.msg });
                    //Toast.fail(data.msg,2)
                    // const { navigate } = this.props.navigation
                    // navigate('Login')
                }
            }
        )
            .catch((err) => {
                Toast.info(err,1);
            });

    }

    _fetchCode(shouldStartCountting){
        //Toast.info('获取验证码',1);
        let url = config.api.base + config.api.验证码;
        let body ={
            phone:this.state.phoneNumber,
            sign:'1'
        }
        request.post(url, body).then(
            (data) => {
                console.log('返回数据--->',data)
                if (data.code==1) {
                    Toast.success('获取成功！',1)
                } else {
                    Toast.fail(data.msg,2)
                }
            }
        )
            .catch((err) => {
                Toast.info(data.error);
            });

        setTimeout(()=>{
            shouldStartCountting && shouldStartCountting(this.state.requestSucc)
        }, 100);

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginTop:45,
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
        backgroundColor:'#f2f2f2'
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




