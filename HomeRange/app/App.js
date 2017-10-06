/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/9/30 下午2:15
 */

import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';

import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';

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
import Chongzhi from './pages/login/chongzhimm'

const HomeIcon = require('./image/shouye/home@2x.png');
const CouponsIcon = require('./image/youhuiquan/coupon.png');
const OrderIcon = require('./image/dingdan/Order@2x.png');
const MineIcon = require('./image/wode/mine@2x.png');

const MyTab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions:({navigation,screenProps}) => ({

            // StackNavigator 属性部分
            headerTitle:'首页', // 只会设置导航栏文字,
            //header:null, //可以自定义导航条内容，如果需要隐藏可以设置为null
            headerBackTitle:null,
            headerStyle:{
                //#24B8FD
                backgroundColor:'#1aa0f7'
            }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
            headerTitleStyle:{
                fontSize:20,
                color:'white'
            },
            gesturesEnabled:true, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭

            // TabNavigator 属性部分
            // title:'', 同上
            tabBarVisible:true, // 是否隐藏标签栏。默认不隐藏(true)
            tabBarIcon: (({tintColor,focused}) => {
                return(
                    <Image
                        source={!focused ? HomeIcon : HomeIcon}
                        style={[{height:22,width:22 }, {tintColor: tintColor}]}
                    />
                )
            }),
            tabBarLabel:'首页', // 设置标签栏的title。推荐这个方式。
        })
    },
    Coupons: {
        //screen:Coupons,
        //navigationOptions: ()=> TabOptions('优惠券',CouponsIcon,CouponsIcon,'优惠券'),
        screen: Coupons,
        navigationOptions:({navigation,screenProps}) => ({

            headerTitle:'优惠券',
            headerBackTitle:null,
            headerStyle:{
                backgroundColor:'#1aa0f7'
            },
            headerTitleStyle:{
                fontSize:20,
                color:'white'
            },
            gesturesEnabled:true,
            tabBarVisible:true,
            tabBarIcon: (({tintColor,focused}) => {
                return(
                    <Image
                        source={!focused ? CouponsIcon : CouponsIcon}
                        style={[{height:22,width:22 }, {tintColor: tintColor}]}
                    />
                )
            }),
            tabBarLabel:'优惠券',
        })
    },
    Order:{
        screen:Order,
        navigationOptions:({navigation,screenProps}) => ({
            headerTitle:'订单',
            //header:null,
            headerBackTitle:null,
            headerStyle:{
                backgroundColor:'#1aa0f7'
            },
            headerTitleStyle:{
                fontSize:20,
                color:'white'
            },
            gesturesEnabled:true,
            tabBarVisible:true,
            tabBarIcon: (({tintColor,focused}) => {
                return(
                    <Image
                        source={!focused ? OrderIcon : OrderIcon}
                        style={[{height:22,width:22 }, {tintColor: tintColor}]}
                    />
                )
            }),
            tabBarLabel:'订单',
        })
    },
    Mine:{
        screen:Mine,
        navigationOptions:({navigation,screenProps}) => ({
            headerTitle:'我的',
            headerBackTitle:null,
            //header:null,
            headerStyle:{
                backgroundColor:'#1aa0f7'
            },
            headerTitleStyle:{
                fontSize:20,
                color:'white'
            },
            gesturesEnabled:true,
            tabBarVisible:true,
            tabBarIcon: (({tintColor,focused}) => {
                return(
                    <Image
                        source={!focused ? MineIcon : MineIcon}
                        style={[{height:22,width:22 }, {tintColor: tintColor}]}
                    />
                )
            }),
            tabBarLabel:'我的',
        })
    },
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName:'', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{

        activeTintColor:'#1aa0f7', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'#ABAAB3', // label和icon的前景色 不活跃状态下(未选中)。

        activeBackgroundColor:'white', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor:'white', // label和icon的背景色 不活跃状态下（未选中）。

        showLabel:true, // 是否显示label，默认开启。
        showIcon:true, // 是否显示图标，默认关闭。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
    }

});



// 初始化StackNavigator
const MyNav = StackNavigator({

    Login:{screen: Login,
        navigationOptions:{
            headerBackTitle:null,
            headerStyle:{
                height:10,
                backgroundColor:'#1aa0f7',
            }
        }},
    MerchantList:{
        screen: MerchantList,
        navigationOptions:{
            headerBackTitle:null,
            headerTintColor:'rgba(0,0,0,0)',
            headerStyle:{
                height:10,
                backgroundColor:'#fff',
            },
        }
    },
    SingUp:{screen: SingUp,
        navigationOptions:{
            headerTitle:'注册',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Detail:{screen:Detail,
        navigationOptions:{
        headerTintColor:'rgba(0,0,0,0)',
        headerStyle:{
            height:0,
        },
    }},
    Pay:{screen: Pay,
        navigationOptions:{
            headerTitle:'支付',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Huanbang:{screen: Huanbang,
    navigationOptions:{
    headerTitle:'换绑手机',
        headerBackTitle:null,
        headerTintColor:'#222',
        headerStyle:{
        backgroundColor:'#fff',
    },
}},
    Change:{screen: Change,
        navigationOptions:{
            headerTitle:'更改密码',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Geren:{screen: Geren,
        navigationOptions:{
            headerTitle:'个人资料修改',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Vipcenter:{screen: Vipcenter,
        navigationOptions:{
            headerTitle:'会员中心',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Setting:{screen: Setting,
        navigationOptions:{
            headerTitle:'设置',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},
    Chongzhi:{screen: Chongzhi,
        navigationOptions:{
            headerTitle:'重置密码',
            headerBackTitle:null,
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},

    Shoucang:{screen: Shoucang,
        navigationOptions:{
            headerTitle:'收藏',
            headerBackTitle:'返回',
            headerTintColor:'#222',
            headerStyle:{
                backgroundColor:'#fff',
            },
        }},

    // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
    MyTab:{
        screen:MyTab,
    }

},{

});

const TabOptions = (tabBarTitle,normalImage,selectedImage,navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:22,width:22 }, {tintColor: tintColor}]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:22,color:'white',alignSelf:'center'};
    // header的style
    const headerStyle = {backgroundColor:'#1085F2'};
    const tabBarVisible = true;
    // const header = null;
    return {tabBarLabel,tabBarIcon,headerTitle,headerTitleStyle,headerStyle,tabBarVisible};
};

export default MyNav;