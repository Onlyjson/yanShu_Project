/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/11/24 下午2:30
 */
/**
 * @author: zhangyh-k@glondon.com
 * @description:所有页面的入口
 * @Date: 2017/11/23 下午2:57
 */
import React, { PureComponent } from 'react'
import { StatusBar ,Platform} from 'react-native'
import { StackNavigator, NavigationActions,TabNavigator, TabBarBottom } from 'react-navigation';

//启动引导标签页
import MyTab from './MyTab';
import YinDaoYe from './YinDaoYe';
import QiDongYe from './QiDongYe';

import Login from './pages/login/login';
import SingUp from './pages/login/signup';
import Detail from './pages/home/merchantdetails';
import MerchantList from './pages/home/merchantList';
import Coupons from './pages/coupons/Coupons';//我的优惠券
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
//首页相关
import QCode from './pages/home/component/QCode';
import FufeiVip from  './pages/mine/fufeivip';
import MyYinDaoYe from  './MyYinDaoYe';
import ZhiFu from  './pages/home/ZhiFu';
import Shangjia from './pages/bussiss/shangjia'

const MyApp = StackNavigator({



    启动页: { screen: QiDongYe },//启动页

    引导页: { screen: YinDaoYe },//引导页
    // 引导页: { screen: MyYinDaoYe },//引导页
    //
    // //这个就是进来的页面
    // MyTab:{screen:ZhiFu},
    Shangjia:{screen:Shangjia},
    MyTab: {screen: MyTab,navigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'#1aa0f7',
            height:Platform.OS==='ios'?64:44
        },
        headerTitleStyle: {
            //用于android头部标题的居中
            alignSelf: 'center'
        },
    }},
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
    支付:{screen:ZhiFu},//订单支付

},{
    headerMode: 'screen',
    navigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:'#1aa0f7',
            height:Platform.OS==='ios'?64:44
        },
        headerTitleStyle: {
            //用于android头部标题的居中
            //alignSelf: 'center'
        },
    }
});

//make this component available to the app
export default MyApp;
