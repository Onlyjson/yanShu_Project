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
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    DeviceEventEmitter,
    Linking
} from 'react-native';
import {List} from 'antd-mobile';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
const Item = List.Item;

export default class Mine extends Component {
    static navigationOptions=({navigation,screenProps})=>({
        header:null
    })

    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue,
                headurl:""
            });
            return jsonValue;
        });
    }
    //初始化赋值
    constructor(props){
        super(props);
        this.state={
            level:"",
            ConsigneePhone:'13368798000'
        }
    }
    //初始化赋值
    componentDidMount(){
        DeviceEventEmitter.addListener('changeImage',(dic)=>{
            //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
            this.setState({
                headurl:dic.url,
                nicheng:dic.nicheng
            });
            console.log(dic);
        });
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
                        headurl:data.data.headurl,
                        nicheng:data.data.nickname,
                    })
                    console.log(data.data.headurl);
                    //TODO
                    //Toast.success('获取用户信息成功',1)
                } else {
                    //TODO
                    //Toast.fail('获取用户信息失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
                <View style={{ position: 'absolute', width: global.SCREEN_WIDTH, height: global.SCREEN_HEIGHT / 3-20, backgroundColor: '#1aa0f7' }} />
                <View>
                    {this.renderHeader(this.state.headurl,this.state.nicheng)}
                    {this.renderList()}
                </View>
            </View>

        );
    }
    HeaderImg(id){
        if(id==""){
        return(<Image source={require('../../image/wode/Avatar.png')} style={{width:71,height:71}}></Image>)
        }
        else{
            return(
            <Image source={{uri:`http://39.108.139.245:9001/${id}.png`}} style={{width:71,height:71}}></Image>)
        }
    }

    renderHeader(id,name){
        return (
            <View style={{height:139,backgroundColor:"#1aa0f7",position:'relative'}}>
                <View style={[{height:68,backgroundColor:"#fff",position:"absolute",top:81,width:global.SCREEN_WIDTH},styles.center]}>
                    <Text style={{marginTop:9,fontSize:13,color:'#333'}}>{name}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Geren')}>
                    <View style={[styles.center,{position:"absolute",top:34.5,left:global.SCREEN_WIDTH/2,width:71,marginLeft:-35.5,height:71,overflow:'hidden',borderRadius:71}]}>
                        {this.HeaderImg(id)}
                    {/*<Image source={{uri:`http://39.108.139.245:9001/${id}.png`}} style={{width:71,height:71}}></Image>*/}

                </View>
                </TouchableOpacity>
                {/*<Image source={require("../../image/wode/Female.png")} style={{width:16,height:16,position:'absolute',left:global.SCREEN_WIDTH/2+15,bottom:31}}/>*/}
            </View>
        )
    }
    renderList(){
        return (
            <View style={{backgroundColor:"#f3f3f3"}}>

                <Item thumb={<Image source={require("../../image/wode/collect.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Shoucang')} >
                    <Text style={styles.itemText}>我的收藏</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/coupon.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('MyCoupons')} >
                    <Text style={styles.itemText}>我的优惠券</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/vip.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Vipcenter')} >
                    <Text style={styles.itemText}>会员中心</Text>
                </Item>
                <View style={{height:15}}></View>

                <Item thumb={<Image source={require("../../image/wode/telephone.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('kefu')} >
                    <Text style={styles.itemText}>客服中心</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/cooperation.png")}/>} arrow="horizontal"
                    extra={<Image source={require("../../image/wode/phone.png")}/>}
                    onClick={()=>this._phoneClick()} >
                    <Text style={styles.itemText}>商务合作</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/about_us.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Aboutus')} >
                    <Text style={styles.itemText}>关于</Text>
                </Item>

                <View style={{height:15}}></View>

                <Item thumb={<Image source={require("../../image/wode/site.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Setting')} >
                    <Text style={styles.itemText}>设置</Text>
                </Item>

            </View>
        )
    }

    _phoneClick(){
        let url = 'tel: ' + this.state.ConsigneePhone;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

}

const styles = StyleSheet.create({
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText:{
        color:'#333333',
        fontSize:15,
        marginLeft:10
    }
});





