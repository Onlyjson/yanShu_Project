
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';
import * as WeChat from 'react-native-wechat';
import { Toast ,ActivityIndicator} from 'antd-mobile';
import request from '../../utils/Request';//网络请求方法
import config from '../../utils/Config';//接口配置
import Alipay from 'react-native-yunpeng-alipay';//支付宝支付

class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}

export default class ywgrn extends Component {
    constructor(props) {
        super(props);
        //应用注册
        WeChat.registerApp('wxfa7e09756642baa0');
    }

    state = {
        animating:false,
        userid:''
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

    componentDidMount() {
        this.get('userInfo').then(()=>this.setState({userid:this.state.userInfo.id}));
    }

    componentWillMount() {
        // 处理支付回调结果监听
        WeChat.addListener('PayReq.Resp', (res) => {
            //alert('这里是支付回调====='+res);
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

    render() {
        return (
            <View style={{ margin: 20 }}>
                <CustomButton text='微信好友分享-链接'
                    onPress={() => {
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToSession({
                                        title: '微信好友测试链接',
                                        description: '分享自:王磊的博客(vipstone.cnblogs.com)',
                                        thumbImage: 'http://mat1.gtimg.com/fashion/images/index/2017/08/25/mrjx1.jpg',
                                        type: 'news',
                                        webpageUrl: 'http://www.cnblogs.com/vipstone/p/7485081.html'
                                    }).catch((error) => {
                                        Toast.info(error.message, 1);
                                    });
                                } else {
                                    Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
                                }
                            });
                    }}
                />
                <CustomButton text='微信朋友圈分享-文本'
                    onPress={() => {
                        WeChat.isWXAppInstalled()
                            .then((isInstalled) => {
                                if (isInstalled) {
                                    WeChat.shareToTimeline({
                                        type: 'text',
                                        description: '测试微信朋友圈分享文本'
                                    }).catch((error) => {
                                        Toast.info(error.message, 1);
                                    });
                                } else {
                                    Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
                                }
                            });
                    }}
                />
                <CustomButton text='微信支付'
                    onPress={() => this._fetchData()}
                />

                <CustomButton text='支付宝支付'
                    onPress={() => this._alipay()}
                />
            </View>
        );
    }

    //支付宝支付
    _alipay() {
        let body = {
            userid:this.state.userid,
            sign: '1',
            shopid:18,//商家id
            discountprice:0.2,//折扣价格 double
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
                                        alert('支付成功！')
                                        break;
                                    case "8000":
                                        alert('支付结果未知,请查询订单状态')
                                        break;
                                    case "4000":
                                        alert('订单支付失败')
                                        break;
                                    case "5000":
                                        alert('重复请求')
                                        break;
                                    case "6001":
                                        alert('用户中途取消')
                                        break;
                                    case "6002":
                                        alert('网络连接出错')
                                        break;
                                    case "6004":
                                        alert('支付结果未知,请查询订单状态')
                                        break;
                                    default:
                                        alert('其他失败原因')
                                        break;
                                }
                            } else {
                                alert('其他失败原因')
                            }
                        }, (err) => {
                        alert('支付失败，请重新支付')//取消支付6001
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
            shopid:18,//商家id
            discountprice:0.2,//折扣价格 double
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
        alert('支付成功！')
    }



}




const styles = StyleSheet.create({
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
    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});

