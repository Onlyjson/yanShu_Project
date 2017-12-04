/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/30 下午4:49
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as WeChat from 'react-native-wechat'//引入微信支付和分享的第三方库

export default class WeChatPay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiVersion: 'waiting...',
            wxAppInstallUrl: 'waiting...',
            isWXAppSupportApi: 'waiting...',
            isWXAppInstalled: 'waiting...',
        };
    }

    async componentDidMount() {
        try {
            await WeChat.registerApp('1234567');
            this.setState({
                apiVersion: await WeChat.getApiVersion(),
                wxAppInstallUrl: await WeChat.getWXAppInstallUrl(),
                isWXAppSupportApi: await WeChat.isWXAppSupportApi(),
                isWXAppInstalled: await WeChat.isWXAppInstalled()
            });
            console.log(this.state);
        } catch (e) {
            console.error(e);
        }
        console.log(WeChat);
        // console.log('getApiVersion', typeof WeChat.getApiVersion);
        // console.log('getWXAppInstallUrl', typeof WeChat.getWXAppInstallUrl);
        // console.log('sendRequest', typeof WeChat.sendRequest);
        // console.log('registerApp', typeof WeChat.registerApp);
        // console.log('sendErrorCommonResponse', typeof WeChat.sendErrorCommonResponse);
        // console.log('sendErrorUserCancelResponse', typeof WeChat.sendErrorUserCancelResponse);
        // console.log('sendAuthRequest', typeof WeChat.sendAuthRequest);
        // console.log('getWXAppInstallUrl', typeof WeChat.getWXAppInstallUrl);
        // console.log('openWXApp', typeof WeChat.openWXApp);
        // console.log('registerAppWithDescription', typeof WeChat.registerAppWithDescription);
        // console.log('isWXAppSupportApi', typeof WeChat.isWXAppSupportApi);
        // console.log('isWXAppInstalled', typeof WeChat.isWXAppInstalled);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>api版本：{this.state.apiVersion}</Text>
                <Text>微信注册url：{this.state.wxAppInstallUrl}</Text>
                <Text>是否支持api：{String(this.state.isWXAppSupportApi)}</Text>
                <Text>是否安装微信：{String(this.state.isWXAppInstalled)}</Text>
                <TouchableOpacity onPress={this._openWXApp}>
                    <Text>打开微信</Text>
                </TouchableOpacity>
            </View>
        );
    }
    async _openWXApp() {
        await WeChat.openWXApp();
    }

}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
        },
        btnStyle: {

        },
    });