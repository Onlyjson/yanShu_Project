/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/11/24 下午12:34
 */
/**
 * 二维码扫描Demo
 * http://www.jianshu.com/p/8bef243bc35d
 * @description:npm install react-native-smart-barcode --save
 * npm install react-native-smart-timer-enhance --save
 * @Date: 2017/8/4 上午10:29
 */
import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Alert,
    NativeModules,
    NativeEventEmitter,
    Text,
    DeviceEventEmitter
} from 'react-native'
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

import Barcode from 'react-native-smart-barcode'
import TimerEnhance from 'react-native-smart-timer-enhance'

class BarcodeTest extends Component {
    static navigationOptions=({navigation})=>({
        //header:null,
        headerTitle:'扫一扫',
        headerTitleStyle:{color:'white', fontSize:20},
        headerStyle:{backgroundColor:'#1aa0f7'}
    })

    callback
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.callback = this.props.navigation.state.params.callback
        this.state = {
            viewAppear: false,
        };
    }

    //返回上一页
    back = () => {
        const {navigate, goBack, state} = this.props.navigation;
        goBack(null);
    }

    render() {

        return (
            <View style={{flex: 1,backgroundColor: '#0000004D',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1, }}
                    ref={ component => this._barCode = component }
                    onBarCodeRead={this._onBarCodeRead}/> : null}
                <View style={{backgroundColor:'transparent',width:global.SCREEN_WIDTH,position:'absolute',bottom:180,alignItems:'center',}}>
                    <Text style={{color:'rgba(255,255,255,1)'}}>请将二维码放置扫描框内</Text>
                </View>

            </View>
        )
    }

    componentDidMount() {
        this.setState({
            viewAppear: true,
        })
    }

    // 将要离开页面的时候触发
    componentWillUnmount(){
        DeviceEventEmitter.emit('changeImage', {jsona:this.state.jsona});
    }
    _onBarCodeRead = (e) => {
        const {navigate, goBack, state} = this.props.navigation;
        // 治标
        this.setState({
            viewAppear: false,
        })
        console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan()
        //this.props.navigation.state.params.callback(callback=JSON.stringify(e.nativeEvent.data.code))
        //state.params.callback(callback=JSON.stringify(e.nativeEvent.data.code));
        this.setState({
            jsona:e.nativeEvent.data.code
        });
        goBack();

    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

}

export default TimerEnhance(BarcodeTest)