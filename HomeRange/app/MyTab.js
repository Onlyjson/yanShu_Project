/**
 * @author: zhangyh-k@glondon.com
 * @description:app页面底下的标签栏
 * @Date: 2017/11/23 下午3:11
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import color from '../app/common/Color'

import TabBarItem from '../app/common/TabBarItems'
import Home from './pages/home/Home';
import Coupons from './pages/coupons/Coupons';
import Order from './pages/order/Order';
import Mine from './pages/mine/Mine';

const HomeIcon = require('./image/shouye/home.png');
const CouponsIcon = require('./image/tabicon/tab_coupon_sel.png');
const OrderIcon = require('./image/tabicon/tab_order_sel@2x.png');
const MineIcon = require('./image/tabicon/tab_mine_sel@2x.png');

import { TabNavigator ,TabBarBottom} from 'react-navigation';

const styles = StyleSheet.create({
    tabBarIcon: {
        height: 22,
        width:22,
    }
});

export default MyTab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={HomeIcon}
                    selectedImage={HomeIcon}
                />
            )
        }),
    },
    Coupons: {
        screen: Coupons,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '优惠券',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={CouponsIcon}
                    selectedImage={CouponsIcon}
                />
            )
        }),
    },
    Order: {
        screen: Order,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '订单',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={OrderIcon}
                    selectedImage={OrderIcon}
                />
            )
        }),
    },
    Mine: {
        screen: Mine,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={MineIcon}
                    selectedImage={MineIcon}
                />
            )
        }),
    },
}, {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
        activeTintColor: color.theme,
        inactiveTintColor: '#979797',//ABAAB3
        showIcon:true,
        upperCaseLabel:false,
        style: { backgroundColor: '#ffffff' },
    },

});