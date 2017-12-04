
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
    StatusBar,
    AsyncStorage
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
let dim = Dimensions.get('window');

import { NavigationActions } from 'react-navigation'
export default class Mine extends Component {
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
        this.state={
            phoneNumber:"",
        }
    }
    componentDidMount(){
        this.get('userInfo').then(()=>this.getuser());
    }
    getuser(){
        let body = {
            userid: this.state.userInfo.id,
            sign:"1"
        };
        let url = config.api.base + config.api.getuser;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    this.setState({
                        phoneNumber:data.data.phone,
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

    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'设置',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });

    goHuanbang(){
        this.props.navigation.navigate('Huanbang');
    }

    goPassword() {
        this.props.navigation.navigate('Change');
    }

    //退出登录
    goSignup(){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Login', params: { token: '123456' }})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <ScrollView style={{flex:1,backgroundColor:'#f2f2f2'}}>
                <StatusBar barStyle="dark-content"/>
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
                                    {this.state.phoneNumber}
                                    {/*158****2356*/}
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

                {/*退出登录*/}
                <TouchableOpacity onPress={()=>this.goSignup()}>
                    <View style={[styles.center,{height:50,marginTop:80,backgroundColor:"#fff"}]}>
                        <Text>
                            退出账户
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

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





