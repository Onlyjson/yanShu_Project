/**
 * @author: zhangyh-k@glondon.com
 * @description:https://github.com/i6mi6/react-native-parallax-scroll-view
 * ScrollView
 * @Date: 2017/11/2 下午4:15
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

import {List} from 'antd-mobile';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
const Item = List.Item;

export default class Wode extends Component {
    static navigationOptions=({navigation,screenProps})=>({
        header:null
    })

    //初始化赋值
    constructor(props){
        super(props);
        this.state={
            level:""
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



    render() {
        return (
            <ScrollView
                style={styles.scrollViewStyle}
                contentInset = {{top:-120}}
                contentOffset = {{y:100}}
            >
                {this._renderHeader(this.state.headurl,this.state.nicheng)}

                {this._renderList()}

            </ScrollView>
        );
    }

    _renderHeader(id,name){
        let uri ='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505209877964&di=9632d6f7c4f4aa873214ebc46d9780c3&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F57c00d27edf5d.jpg'
        return(
            <View style={styles.headerView}>
                <Text style={styles.text1}>我的</Text>

                <View style={styles.avatarView}>
                    {/*<Image source={{uri:uri}} style={{width:71,height:71}}></Image>*/}
                    <Image source={{uri:`http://39.108.139.245:9001/${id}.png`}} style={{width:71,height:71}}></Image>
                    </View>

                <View style={styles.nameView}>
                    <Text style={styles.text2}>我叫郭德纲</Text>
                </View>
            </View>
        )
    }

    _renderList(){
        return (
            <View style={{backgroundColor:"#f3f3f3",marginTop:100}}>

                <Item thumb={<Image source={require("../../image/wode/collect.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Shoucang')} >
                    <Text style={styles.itemText}>我的收藏</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/coupon.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('EditPassword')} >
                    <Text style={styles.itemText}>我的优惠券</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/vip.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('Vipcenter')} >
                    <Text style={styles.itemText}>会员中心</Text>
                </Item>
                <View style={{height:15}}></View>

                <Item thumb={<Image source={require("../../image/wode/telephone.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('kefu')} >
                    <Text style={styles.itemText}>客服中心</Text>
                </Item>

                <Item thumb={<Image source={require("../../image/wode/cooperation.png")}/>} arrow="horizontal" onClick={()=>this.props.navigation.navigate('EditPassword')} >
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

}

const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor:'#fff',
    },
    headerView:{
        height:200,
        backgroundColor:'#1aa0f7',
        justifyContent:'center',
        alignItems:'center'
    },
    text1:{
        color:'white',
        fontSize:18,
        top:75
    },
    avatarView:{
        top:90,
        width:71,
        height:71,
        overflow:'hidden',
        borderRadius:71
    },
    text2:{
        color:'#333',
        fontSize:14,
        top:100,
    },
    nameView:{
        backgroundColor:'transparent'
    },
    itemText:{
        color:'#333333',
        fontSize:15,
        marginLeft:10
    }

});




