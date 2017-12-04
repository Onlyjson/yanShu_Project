/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/7/27 下午2:02
 */

import React, { PureComponent } from 'react'
import { StatusBar } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import color from '../app/common/Color'
import TabBarItem from '../app/common/TabBarItems'
import Home from './pages/home/Home';
import Coupons from './pages/coupons/Coupons';
import Order from './pages/order/Order';
import Mine from './pages/mine/Mine';

import Login from './pages/login/login';
import SingUp from './pages/login/signup';
import Detail from './pages/home/merchantdetails';
import MerchantList from './pages/home/merchantList';
//引入更改密码页面
import Change from './pages/mine/changepassword';
//引入 个人资料页面
import Geren from './pages/mine/gerenziliao';
//  引入设置页面
import Setting from './pages/mine/setting';
// 引入收藏页面
import Shoucang from './pages/mine/shoucang';
// 引入会员中心页面
import Vipcenter from './pages/mine/vipcenter';
// 引入换绑手机
import Huanbang from './pages/mine/huanbang';
import Pay from './pages/home/pay';
import Chongzhi from './pages/login/chongzhimm';
import PingjiaList from './pages/home/achievement/achievement';
import PingJia from './pages/order/component/PingJia';
import Search from './pages/home/merchantSearch';
import Zailaiyidan from './pages/order/zailaiyidan';
import kefu from './pages/mine/kefu';
import Pjsucess from './pages/order/pingjiasucess';
import WeChatPay from './pages/mine/AboutUs';
import Aboutus from './pages/mine/aboutus_';
import WoDe from './pages/mine/Wode';
//首页
import QCode from './pages/home/component/QCode';
import FufeiVip from  './pages/mine/fufeivip';

const HomeIcon = require('./image/shouye/home.png');
const CouponsIcon = require('./image/tabicon/tab_coupon_sel.png');
const OrderIcon = require('./image/tabicon/tab_order_sel@2x.png');
const MineIcon = require('./image/tabicon/tab_mine_sel@2x.png');


const lightContentScenes = ['Home', 'Coupons','Order','Mine','Pay'];


function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

class RootScene extends PureComponent {
    constructor() {
        super()
        StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                StatusBar.setBarStyle('light-content')//light-content
                            } else {
                                StatusBar.setBarStyle('light-content')//dark-content
                            }
                        }
                    }
                }
            />
        );
    }
}

const Tab = TabNavigator(
    {
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
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        backBehavior:'none',
       
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',//ABAAB3
            showIcon:true,
            upperCaseLabel:false,
            style: { backgroundColor: '#ffffff' },
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: { screen: Tab },
        //Tab: { screen: WoDe },
        // 将需要跳转的页面注册在这里，全局才可以跳转
        Login:{screen: Login},//登录
        WoDe:{screen: WoDe},//我的
        SingUp:{screen: SingUp},//注册
        Detail:{screen:Detail},//轮播图点击跳转
        Pay:{screen: Pay},
        Huanbang:{screen: Huanbang},
        Change:{screen: Change},
        Geren:{screen: Geren},
        Vipcenter:{screen: Vipcenter},
        Setting:{screen: Setting},
        Chongzhi:{screen: Chongzhi},
        MerchantList:{screen: MerchantList},//首页按钮跳转详情
        Shoucang:{screen: Shoucang},
        PingjiaList:{screen:PingjiaList},
        Search:{screen:Search},
        PingJia:{screen:PingJia},//订单去评价
        WeChatPay:{screen:WeChatPay},//微信支付
        Zailaiyidan:{screen:Zailaiyidan},
        kefu:{screen:kefu},
        Pjsucess:{screen:Pjsucess},
        Aboutus:{screen:Aboutus},
        MyCoupons:{screen:Coupons},
        扫一扫:{screen:QCode},//二维码扫描
        FufeiVip:{screen:FufeiVip},
    },
    {   headerMode: 'screen',
        navigationOptions: {
            headerStyle: { backgroundColor: color.theme },
            //headerBackTitle: null,
            headerTintColor: '#fff',
            showIcon: true,
        },
    }
);
//make this component available to the app
export default RootScene;
