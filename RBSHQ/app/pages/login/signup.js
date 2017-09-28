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
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native';

var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contain:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'#fff'
    },
    center:{
        justifyContent: 'center',alignItems: 'center',marginTop:30
    }
});



let userName = "",
    passWord = "";
export default class MY_PAGE extends Component {

    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
        };
    }
    goSinnup(){
        this.props.navigation.navigate('MyTab');
    }
    render() {
        return (
            <View style={styles.contain}>
                <View style={styles.center}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                        <Text>
                            <Image source={require('../../../app/img/accountnumber.png')} style={{width:11,height:14,marginTop:4}}/>
                        </Text>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:176,height:14,marginLeft:26}}
                                   placeholder={"请输入手机号"}
                                   secureTextEntry={false}></TextInput>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1}}>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:118,height:14,marginBottom:-10}}
                                   placeholder={""}
                                   secureTextEntry={false}></TextInput>
                        <Text style={{marginBottom:2,width:92,flex:1,borderWidth:1,textAlign:'center',lineHeight:16,borderRadius:10,backgroundColor:'blue',color:'#fff',overflow:"hidden"}}>
                            发送验证码
                        </Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                        <Text>
                            <Image source={require('../../../app/img/password.png')} style={{width:11,height:14,marginTop:4}}/>
                        </Text>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:176,height:14,marginLeft:26}}
                                   placeholder={"请输入密码"}
                                   secureTextEntry={false}></TextInput>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                        <Text>
                            <Image source={require('../../../app/img/confirm_password.png')} style={{width:11,height:14,marginTop:4}}/>
                        </Text>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:176,height:14,marginLeft:26}}
                                   placeholder={"请确认密码"}
                                   secureTextEntry={false}></TextInput>
                    </View>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:67}}>
                    <TouchableOpacity onPress={()=>this.goSinnup()}>
                        <Image source={require('../../../app/img/button.png')} style={{width:250,height:47}}>
                            <Text style={{backgroundColor:"rgba(0,0,0,0)",width:250,textAlign:'center',marginTop:15.5,color:'#fff'}}>注册</Text>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



