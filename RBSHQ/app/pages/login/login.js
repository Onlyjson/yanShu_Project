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
    }
});


let userName = "",
    passWord = "";
export default class MY_PAGE extends Component {

    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            text:"",
            sid:"",
            pla:"请输入密码",
            value:""
        };
    }
    goIndex() {
        if(userName=="liyanshu"&&passWord=="123456"){
             this.props.navigation.navigate('MyTab');
        }
        else{
            this.props.navigation.navigate('MyTab');
        }
    }
    goSinnup(){
        this.props.navigation.navigate('SingUp');
    }
    onuserName(obj){
        userName = obj;
    }
    onpassWord(obj){
        passWord=obj;
    }


    render() {
        return (
            <View style={styles.contain}>
                <View>
                    <Image source={require('../../../app/img/bg.png')} style={{width:Dimensions.get('window').width,height:220}}/>
                    <Image source={require('../../../app/img/logo.png')} style={{width:117,height:80,position:'absolute',top:128,left:40}}/>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:40}}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                    <Text>
                        <Image source={require('../../../app/img/accountnumber.png')} style={{width:11,height:14,marginTop:4}}/>
                    </Text>
                    <TextInput clearButtonMode={'while-editing'} style={{width:176,height:14,marginLeft:26}} placeholder='请输入账号'  autoCapitalize="none" onChangeText={(text) => this.onuserName(text)}></TextInput>
                    </View>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:20}}>
                    <View style={{width:208,flexDirection: 'row',borderBottomColor:"#8e8e8e",borderBottomWidth:1,paddingBottom:2}}>
                    <Text>
                    <Image source={require('../../../app/img/password.png')} style={{width:11,height:14,marginTop:4}}/>
                    </Text>
                    <TextInput clearButtonMode={'while-editing'} style={{width:176,height:14,marginLeft:26}} placeholder={this.state.pla} secureTextEntry={true} onChangeText={(text) => this.onpassWord(text)}></TextInput>
                    </View>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <View style={{width:208}}>
                        <View style={{alignSelf:'flex-end',flexDirection:'row'}}>
                        <Text style={{marginTop:14,color:"#8e8e8e"}}>忘记密码?</Text>
                        </View>
                    </View>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:34}}>
                    <TouchableOpacity onPress={()=>this.goIndex()}>
                        <Image source={require('../../../app/img/button.png')} style={{width:250,height:47}}>
                            <Text style={{backgroundColor:"rgba(0,0,0,0)",width:250,textAlign:'center',marginTop:15.5,color:'#fff'}}>登录</Text>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center',alignItems: 'center',marginTop:17}}>
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



