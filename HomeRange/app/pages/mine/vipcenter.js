






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
    PixelRatio
} from 'react-native';
let dim = Dimensions.get('window');

function Vip(props) {

    let text ="";
    if(props.opacity==2){
        text="立即开通"
    }else{
        text="立即续费"
    }
    let secondDisplay="";
    if(props.opacity==2){
        secondDisplay=0;
    }
    else {
        secondDisplay=1;
    }
    let des="";
    if(props.opacity==2){
        des="VIP";
    }
    else {
        des="V";
    }
    let firLevel="";
    if(props.opacity==2){
        firLevel="";
    }else {
        firLevel="1";
    }
    return(
        <View>
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
            <View style={[styles.center,{opacity:secondDisplay,backgroundColor:'#fff',width:193,height:50,borderRadius:40,overflow:'hidden',borderWidth:1,position:'absolute',top:152,left:dim.width/2,marginLeft:-96.5}]}>
                <Text style={{color:"#333",fontSize:18}}>
                    {text}
                </Text>
            </View>
        </View>
    )
}
export default class Mine extends Component {
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            userStuts:0
        };
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
        }if(obj==2){
            return "暂无会员卡";
        }
        else {
            return "即将到期";
        }
    }
    Imgload(obj){
        if(obj==1||obj==2){
            return require("../../image/huiyuanzhongxin/bg.png");
        }else {
            return require("../../image/huiyuanzhongxin/maturity_bg.png");
        }
    }
    kaitong(obj){
        if(obj!=2){
            return 1
        }else {
            return 0
        }
    }
    opacity(obj){
        if(obj==1){
            return 0;
        }else {
            return obj;
        }
    }
    render() {
        return (
            <View style={{width:dim.width,height:dim.height,backgroundColor:'#fff'}}>
                <Vip tittle={this.tittleInfo(this.state.userStuts)} load={this.Imgload(this.state.userStuts)} opacity={this.opacity(this.state.userStuts)}></Vip>
                <View style={[styles.center,{marginTop:49,opacity:this.kaitong(this.state.userStuts)}]}>
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
                            <View style={{opacity:this.signByovervip(this.state.userStuts)}}>
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





