/**
 * Created by ztb-libin on 2017/9/25.
 *
 */


/**
 * Created by ztb-libin on 2017/7/28.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';
import HOME_PAGE from './pages/home'
import COUPON_PAGE from './pages/coupon'
import ORDER_PAGE from './pages/order'
import MY_PAGE from './pages/my'
import color from './utils/color'
import { TabNavigator ,TabBarBottom} from 'react-navigation';

const styles = StyleSheet.create({
    tabBarIcon: {
        height: 22,
        width:22,
    }
});


const  MyTab = TabNavigator({
    HOME_PAGE: {
        screen: HOME_PAGE,
        navigationOptions:{
            title: '首页',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/aaaaa.png')}
                    style={[styles.tabBarIcon, {tintColor: tintColor}]}
                />)
        }
    },
    COUPON_PAGE: {
        screen: COUPON_PAGE,
        navigationOptions:{
            title: '优惠券',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/aaaaa.png')}
                    style={[styles.tabBarIcon, {tintColor: tintColor}]}
                />)
        }
    },

    ORDER: {
        screen: ORDER_PAGE,
        navigationOptions:{
            title: '订单',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/aaaaa.png')}
                    style={[styles.tabBarIcon, {tintColor: tintColor}]}
                />)
        }
    },
    MY: {
        screen: MY_PAGE,
        navigationOptions:{
            title: '我的',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./img/aaaaa.png')}
                    style={[styles.tabBarIcon, {tintColor: tintColor}]}
                />
            )
        }
    },
}, {
    tabBarPosition: 'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    initialRouteName:'HOME_PAGE',
    backBehavior:'HOME_PAGE',
    lazy:true,
    tabBarComponent:TabBarBottom,
    tabBarOptions: {
        //选中时候的颜色
        activeTintColor: color.theme,
        //未选中时候的颜色
        inactiveTintColor: '#ABAAB3',
        //去掉android的下划线
        indicatorStyle:{height:0},
        activeBackgroundColor:'white',
        inactiveBackgroundColor:'white',
        showIcon:true,
        //整个背景颜色
        style:{
            backgroundColor: 'white',
            height:49,
        },
        //每个box
        tabStyle:{
            justifyContent:'space-between',
        },
        //图片样式
        iconStyle:{
            height: 22,
            width:22,
        },
        //标签字 样式
        labelStyle:{
            fontSize: 12,
        },
    },

});

export  default MyTab ;