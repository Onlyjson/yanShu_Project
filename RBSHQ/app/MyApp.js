/**
 * Created by ztb-libin on 2017/9/25.
 *
 */
/**
 * Created by sunny on 21/03/2017.
 * libin 所有页面的入口
 */

import { StackNavigator , NavigationActions } from 'react-navigation';

// import { ToastAndroid }from 'react-native'
//
//
import color from './utils/color'
//
//
// import Splash from './Splash';
// import Guide from './Guide';
import MyTab from './MyTab';
import Login from '../app/pages/login/login';
import SingUp from '../app/pages/login/signup'
import Detail from '../app/pages/home/Indexdetails'
// import SetIP from './SetIP';
// //import Login from './Login2';


const MyApp = StackNavigator({
    // Splash: {screen: Splash},
    // 这个就是进来的页面

    Login:{screen: Login,
                navigationOptions:{
                headerStyle:{height:0}
         }},
    SingUp:{screen: SingUp,
                navigationOptions:{
                headerTitle:'注册',
                headerTintColor:'#222',
                headerStyle:{
                   backgroundColor:'#fff',

                },
            }},
    Detail:{screen:Detail,navigationOptions:{
        headerTitle:'注册',
        headerTintColor:'rgba(0,0,0,0)',
        headerStyle:{
            height:0,
        },
    }},
    MyTab: {screen: MyTab}
    // 引导页: {screen: Guide},
    // 登录: {screen: Login},
}, {
    headerMode: 'screen',
    navigationOptions:{
        headerTintColor:'white',
        headerStyle:{
            backgroundColor:color.theme,
        },
        headerTitleStyle: {
            alignSelf: 'center'
        },
    }
});


/**
 * 处理安卓返回键
 */
// let lastBackPressed=0
// const defaultStateAction = MyApp.router.getStateForAction;
// MyApp.router.getStateForAction = (action,state) => {
//     if(state && action.type === NavigationActions.BACK && state.routes.length === 1) {
//         if (lastBackPressed + 2000 < Date.now()) {
//             ToastAndroid.show('再点击一次退出应用',ToastAndroid.SHORT);
//             lastBackPressed = Date.now();
//             const routes = [...state.routes];
//             return {
//                 ...state,
//                 ...state.routes,
//                 index: routes.length - 1,
//             };
//         }
//     }
//     return defaultStateAction(action,state);
// };
export default MyApp;
