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


function CenerSign(props) {
    return(<View style={{alignItems: 'center',opacity:props.opacity,marginTop:100}}>
        <View style={{width:220,height:20,justifyContent: 'center',flexDirection:"row",marginTop:0}}>
            <Image source={require("../../image/dengzhuce/prompt.png")} style={{width:20,height:15}}/>
            <Text style={{marginLeft:5,fontSize:12,color:'#f48136'}}>{props.val}</Text>
        </View>
    </View>)
}


let userName = "",
    passWord1 = "",
    passWord2="";
export default class MY_PAGE extends Component {

    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            phoneNumber:0,
            opacity:0,
            val:"手机号已被注册"
        };
    }
    goSinnup(){
        if(this.state.phoneNumber==110){
            this.setState({
                opacity:1
            })
        }
        if(passWord1!=passWord2){
            this.setState({
                val:"两次输入的密码不一样,你是不是傻",
                opacity:1
            })
        }else {
            this.props.navigation.navigate('MyTab');
        }
    }
    phoneNumber(obj){
        this.setState({
            phoneNumber:obj
        })
    }
    password1(obj){
        passWord1=obj;
    }
    password2(obj){
        passWord2=obj;
    }
    render() {
        return (
            <View style={styles.contain}>
                <View style={[styles.center,{marginTop:112}]}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:176,height:14}}
                                   placeholder={"请输入新手机号"}
                                   secureTextEntry={false}
                                   onChangeText={(text) => this.phoneNumber(text)}
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.center}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1}}>
                        <TextInput clearButtonMode={'while-editing'}
                                   style={{width:118,height:14,marginBottom:-10}}
                                   placeholder={"请输入验证码"}
                                   secureTextEntry={false}></TextInput>
                        <Text style={{marginBottom:2,width:92,flex:1,textAlign:'center',lineHeight:16,borderRadius:10,backgroundColor:'#1aa0f7',color:'#fff',overflow:"hidden"}}>
                            发送验证码
                        </Text>
                    </View>
                </View>



                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:121}}>
                    <View style={[{width:250,height:14,justifyContent:'center',alignItems:'center',marginBottom:10}]}>
                        <Text style={{color:"#fd8136",fontSize:10}}>
                          重新绑定后，之前绑定的手机号将不能作为登录凭证
                        </Text>
                    </View>
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


