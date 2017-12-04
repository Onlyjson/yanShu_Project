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
    PixelRatio,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Toast ,ActivityIndicator} from 'antd-mobile';
import Alipay from 'react-native-yunpeng-alipay';//支付宝支付
import request from '../../utils/Request';//网络请求方法
import config from '../../utils/Config';//接口配置
import * as WeChat from 'react-native-wechat';
let dim = Dimensions.get('window');
function selectOrUnselect(bool) {
    if(bool==true){
        return require('../../image/fukuan/selected.png');
    }
    else {
        return require('../../image/fukuan/unselected.png');
    }
}
function Checked(props){
    return(
        <View style={[{width:20,marginRight:16,justifyContent:'center'}]}>
            <Image source={props.status} style={{width:20,height:20}}/>
        </View>
    )
}
export default class Mine extends Component {
    //初始化赋值
    constructor(props){
        super(props);
        WeChat.registerApp('wxfa7e09756642baa0');
        this.state = {
            union:false,
            wx:true,
            zfb:false,
        };
    }
    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            });
            return jsonValue;
        });
    }
    componentWillMount() {
        // 处理支付回调结果监听
        WeChat.addListener('PayReq.Resp', (res) => {
            //Toast.info('这里是支付回调====='+res);
            console.log('这里是支付回调=====',res);
            if (res.errCode === 0) {
                console.log('===支付成功');
            } else if (res.errCode === -1) {
                console.log('===支付失败,请稍后尝试');
            } else if (res.errCode === -2) {
                console.log('===支付取消');
            }
        });
    }
    componentWillUnmount(){
        WeChat.removeAllListeners()
    }
    //支付宝支付
    _alipay() {
        let body = {
            userid:this.state.userid,
            sign: '1',
            shopid:this.props.navigation.state.params.shopid,//商家id
            discountprice:0,//折扣价格 double
            payway:1,//0：银行卡,1:支付宝,2:微信
            //couponid:null,//用户与优惠券关联表ID 不是必填
        };

        let url = config.api.base + config.api.prepay;
        request.post(url, body).then(
            (data) => {
                //console.log('后台返回的数据',data)
                if (data.code===1) {
                    /*打开支付宝进行支付*/
                    Alipay.pay(data.data.alipayparam).then((data) => {
                            console.log('支付宝后台返回的数据',data)
                            if (data.length && data[0].resultStatus) {
                                /*处理支付结果*/
                                switch (data[0].resultStatus) {
                                    case "9000":
                                        Toast.info('支付成功！',1)
                                        break;
                                    case "8000":
                                        Toast.info('支付结果未知,请查询订单状态',1)
                                        break;
                                    case "4000":
                                        Toast.info('订单支付失败',1)
                                        break;
                                    case "5000":
                                        Toast.info('重复请求',1)
                                        break;
                                    case "6001":
                                        Toast.info('用户中途取消',1)
                                        break;
                                    case "6002":
                                        Toast.info('网络连接出错',1)
                                        break;
                                    case "6004":
                                        Toast.info('支付结果未知,请查询订单状态',1)
                                        break;
                                    default:
                                        Toast.info('其他失败原因',1)
                                        break;
                                }
                            } else {
                                Toast.info('其他失败原因',1)
                            }
                        }, (err) => {
                            Toast.info('支付失败，请重新支付',1)//取消支付6001
                        }
                    )
                } else {
                    this.setState({ animating:false })
                    Toast.fail('支付失败，请重新支付',1)
                }
            }
        )
            .catch((err) => {
                this.setState({ animating:false })
                console.log('err',err);
                //支付参数错误
            });
    }

    //微信支付网络请求
    _fetchData(){
        this.setState({ animating:true })
        let body = {
            userid:this.state.userid,
            sign: '1',
            shopid:this.props.navigation.state.params.shopid,//商家id
            discountprice:0,//折扣价格 double
            payway:2,//0：银行卡,1:支付宝,2:微信
            //couponid:null,//用户与优惠券关联表ID 不是必填
        };

        let url = config.api.base + config.api.prepay;
        request.post(url, body).then(
            (data) => {
                console.log('返回的数据',data)
                if (data.code===1) {
                    //TODO
                    this.onPressPay(data.data)
                    this.setState({animating:false,})
                } else {
                    this.setState({ animating:false })
                    Toast.fail('出错了',1)
                }
            }
        )
            .catch((err) => {
                this.setState({ animating:false })
                console.log('err',err);
            });
    }

    //调起微信支付
    async onPressPay(res) {
        const currentTimestamp = new Date().getTime().toString();

        let isInstalled = await WeChat.isWXAppInstalled();
        if (isInstalled) {
            try {
                let result = await WeChat.pay(
                    {
                        partnerId: res.partnerid,  // 商家向财付通申请的商家id,备注：此处appid就是接口返回的商家id
                        prepayId: res.prepayid,   // 预支付订单
                        timeStamp: res.timestamp.toString(),  // 时间戳，防重发
                        nonceStr: res.noncestr,   // 随机串，防重发
                        package: res.package,    // 商家根据财付通文档填写的数据和签名
                        sign: res.sign        // 商家根据微信开放平台文档对数据做的签名
                    }
                );
                console.log('result------>',JSON.stringify(result));
                this.paySucc()
            } catch (e) {
                Toast.info("已取消支付",1);
            }
        } else {
            Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
        }
    }

    paySucc(){
        Toast.info('支付成功！',1)
    }
    componentDidMount() {
        this.get('userInfo').then(()=>this.setState({userid:this.state.userInfo.id}));
    }

    static navigationOptions=({navigation})=>({
        headerTintColor: "#fff",
        headerStyle:{
            backgroundColor:'#fd8237'
        },
        headerTitle:'支付',
        headerTitleStyle:{
            fontSize:18,
            color:'#fff'
        },
    });
    check(obj){
        if(obj=='union'){
            if(this.state.union==false){
                this.setState({
                    union:true,
                    wx:false,
                    zfb:false,
                })
            }
        }
        if(obj=='wx'){
            if(this.state.wx==false){
                this.setState({
                    union:false,
                    wx:true,
                    zfb:false,
                })
            }
        }
        if(obj=='zfb'){
            if(this.state.zfb==false){
                this.setState({
                    union:false,
                    wx:false,
                    zfb:true,
                })
            }
        }
    }

    render() {
        return (
            <View>
                <View style={{backgroundColor:"#fff",marginTop:10}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                优惠券
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyCoupons')} style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:12,color:'#fd8136'}}>
                               查看
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:70,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                应付金额（元）
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:16,color:'#333'}}>
                                {this.props.navigation.state.params.money}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                实付金额（元）
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:16,color:'#fd8136'}}>
                                {this.props.navigation.state.params.money}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff",marginTop:20,height:600}}>
                    {/*<View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>*/}
                        {/*<View style={{flex:1,flexDirection:'row',marginLeft:24}}>*/}
                            {/*<Image source={require('../../image/fukuan/UnionPay.png')} style={{width:26,height:16.5}}/>*/}
                            {/*<View style={[styles.center,{marginLeft:44}]}>*/}
                                {/*<Text>银行卡支付</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*<TouchableOpacity onPress={()=>this.check('union')}>*/}
                            {/*<Checked status={selectOrUnselect(this.state.union)}>*/}

                            {/*</Checked>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{flex:1,flexDirection:'row',marginLeft:24}}>
                            <Image source={require('../../image/fukuan/wx.png')} style={{width:24.5,height:24.5}}/>
                            <View style={[styles.center,{marginLeft:44}]}>
                                <Text>微信支付</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.check('wx')}>
                            <Checked status={selectOrUnselect(this.state.wx)}>

                            </Checked>
                        </TouchableOpacity>
                    </View>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{flex:1,flexDirection:'row',marginLeft:24}}>
                            <Image source={require('../../image/fukuan/zfb.png')} style={{width:24.5,height:24.5}}/>
                            <View style={[styles.center,{marginLeft:44}]}>
                                <Text>支付宝支付</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.check('zfb')}>
                            <Checked status={selectOrUnselect(this.state.zfb)}>

                            </Checked>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.center,{marginTop:71}]}>
                        <TouchableOpacity onPress={()=>this.whattoPay()} style={[{width:328,height:45,backgroundColor:'#fd8237'},styles.center]}>
                            <Text style={{color:'#fff'}}>
                                确认支付¥{this.props.navigation.state.params.money}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
    whattoPay(){
        if(this.state.wx===true){
            this._fetchData()
        }else {
            this._alipay()
        }
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





