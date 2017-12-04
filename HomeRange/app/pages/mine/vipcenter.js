/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:40
 */
import React, { Component } from 'react';

import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
import {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    Text,
    View,
    // ImageBackground,
    Image,
    Dimensions,
    PixelRatio,
    StatusBar,
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');




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
            level:"",
            money:"",
        }
    }
    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerBackTitle:null,
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'会员中心',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });
    //初始化赋值
    componentDidMount(){
        this.get('userInfo').then(()=>this.fetchcard());
    }
    render() {
        let stuas = this.state.level;
        return (
            <View style={{width:dim.width,height:dim.height,backgroundColor:'#fff'}}>
                <StatusBar barStyle={"dark-content"}/>
                <Vip navigation={this.props.navigation} tittle={this.tittleInfo(stuas)} load={this.Imgload(stuas)} ls={stuas}></Vip>
                <View style={[styles.center,{marginTop:49,opacity:this.kaitong(stuas)}]}>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                昵称：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                逆风如解意
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                电话：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                15690283832
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员卡号：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                164994132
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员等级：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                金卡
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员有效期：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                2018年9月5日
                            </Text>
                            <View style={{opacity:this.signByovervip(stuas)}}>
                                <Text style={{color:'#ff3434',fontSize:12}}>
                                    (即将到期,请续费)
                                </Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
    signByovervip(obj){
        if(obj==0){
            return 1;
        }else {
            return 0;
        }
    }
    tittleInfo(obj){
        if(obj==1){
            return "金卡";
        }if(obj==0){
            return "暂无会员卡";
        }
        else {
            return "即将到期";
        }
    }
    Imgload(obj){
        if(obj==1||obj==0){
            return require("../../image/huiyuanzhongxin/bg.png");
        }else {
            return require("../../image/huiyuanzhongxin/maturity_bg.png");
        }
    }
    kaitong(obj){
        if(obj!=0){
            return 1
        }else {
            return 0
        }
    }
    fetchcard(){
        let body = {
            userid: this.state.userInfo.id
        };
        let url = config.api.base + config.api.mycard;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    this.setState({
                        vipdata: data.data,
                        level:data.data.viplevel
                    });
                    //TODO
                } else {
                    //TODO
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
}
function Vip(props) {

    let text ="";
    if(props.ls==0){
        text="立即开通"
    }else{
        text="立即续费"
    }
    let secondDisplay="";
    if(props.ls==0){
        secondDisplay=0;
    }
    else {
        secondDisplay=1;
    }
    let des="";
    if(props.ls==2){
        des="VIP";
    }
    else {
        des="V";
    }
    let firLevel="";
    if(props.ls==0){
        firLevel="";
    }else {
        firLevel="1";
    }
    let button1="";
    if(props.ls==1){
        button1=0;
    }else {
        button1=1;
    }
    return(
        <View>
            <StatusBar barStyle="dark-content"/>
            <View style={{width:dim.width,height:177,backgroundColor:'#fff'}}>
                <Image source={props.load} style={[{width:dim.width,height:177},styles.center]}>

                    <Image style={{width:dim.width,height:4}} source={require("../../image/huiyuanzhongxin/line.png")}>

                    </Image>
                    <Image source={require("../../image/huiyuanzhongxin/ring.png")} style={[styles.center,{width:77,height:77,position:'absolute'}]}>
                        <Text style={{backgroundColor:'rgba(0,0,0,0)',color:'#fff',fontSize:24}}>
                            {des}<Text style={{fontSize:16}}>{firLevel}</Text>
                        </Text>
                    </Image>
                    <Image source={require("../../image/huiyuanzhongxin/Small_circle.png")} style={[styles.center,{opacity:secondDisplay,width:42,height:42,position:'absolute',right:40}]}>
                        <Text style={{backgroundColor:'rgba(0,0,0,0)',color:'#fff',fontSize:20}}>
                            V<Text style={{fontSize:12}}>2</Text>
                        </Text>
                    </Image>
                </Image>
                <View style={[{backgroundColor:'rgba(0,0,0,0)',position:'absolute',top:125,left:dim.width/2,width:100,marginLeft:-50},styles.center]}>
                    <Text style={{color:'#fff',fontSize:18}}>{props.tittle}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>props.navigation.navigate("FufeiVip",{})} style={[styles.center,{opacity:button1,backgroundColor:'#fff',width:193,height:50,borderRadius:40,overflow:'hidden',borderWidth:1,position:'absolute',top:152,left:dim.width/2,marginLeft:-96.5}]}>
                <Text style={{color:"#333",fontSize:18}}>
                    {text}
                </Text>
            </TouchableOpacity>

        </View>
    )
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





