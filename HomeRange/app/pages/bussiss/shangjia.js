/**
 * desc：商家页面
 * author：李焱舒
 * date： 2017-12-04
 */
import React, {PropTypes, Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

export default class shangjia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = ({navigation}) => ({
        headerBackTitle:null,
        headerTintColor:'#e5007f',
        title:'商家中心',
        headerStyle:{
            backgroundColor:'#fff',
        },
        headerTitleStyle:{
            color:"#333"
        },
        headerRight:(
            <TouchableOpacity onPress={()=>alert(1)}>
                <Image style={{marginRight:15}} source={require('../../image/buchong/revise.png')}></Image>
                {/*<Text style={{color:'#e5007f',fontSize:30,marginRight:15}}></Text>*/}
            </TouchableOpacity>

        )

    });

    /**
     * 初始化了状态之后，在第一次绘制 render() 之前
     * （能够使用setState()来改变属性 有且只有一次）
     */
    componentWillMount() {

    }

    /**
     * 这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，
     * 或者发起网络请求。这个函数也是只被调用一次
     * （能够使用setState()来改变属性 有且只有一次）
     */
    componentDidMount() {

    }

    /**
     * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，
     * 通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render()
     * （能够使用setState()来改变属性 多次调用）
     */
    componentWillReceiveProps() {

    }

    /**
     * 当组件接收到新的属性和状态改变的话，都会触发调用 shouldComponentUpdate(...)
     * （不能够使用setState()来改变属性 多次调用）
     */
    shouldComponentUpdate() {

    }

    /**
     * 如果组件状态或者属性改变，并且上面的 shouldComponentUpdate(...) 返回为 true，就会开始准更新组件
     * （不能够使用setState()来改变属性 多次调用）
     */
    componentWillUpdate() {

    }

    /**
     * 调用了 render() 更新完成界面之后，会调用 componentDidUpdate() 来得到通知
     * （不能够使用setState()来改变属性 多次调用）
     */
    componentDidUpdate() {

    }

    /**
     * 组件要被从界面上移除的时候，就会调用 componentWillUnmount()
     * （不能够使用setState()来改变属性 有且只有一次调用）
     */
    componentWillUnmount() {

    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <StatusBar/>
                <View style={{alignItems:'center'}}>
                <Image source={require("../../image/buchong/order.png")} style={{justifyContent:"center",position:"absolute",right:0,top:15}}>
                <Text style={{backgroundColor:'rgba(0,0,0,0)',color:"#fff",fontSize:13,textAlign:"right",marginRight:6}}>
                    订单
                </Text>
                </Image>
                <Image source={require("../../image/buchong/today.png")} style={{alignItems:'center',marginTop:29}}>
                    

                    <Text style={{marginLeft:40,marginTop:48,textAlign:"center",fontSize:26,color:'#1aa0f7',fontWeight:'bold',backgroundColor:"rgba(0,0,0,0)"}}>
                        <Text style={{fontSize:17}}>¥</Text>7390.00</Text>
                    <Text style={{marginLeft:40,marginTop:20,fontSize:18,color:'#333',backgroundColor:"rgba(0,0,0,0)"}}>今日应收金额</Text>
                </Image>
                    <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                        <Text style={{fontSize:14,color:"#333"}}>
                            今日实收金额：
                        </Text>
                        <Text style={{color:'#3697fd',fontSize:19}}>
                            ¥27090.00
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',flexDirection:'row'}}>
                        <View style={{flex:1,alignItems:'center',marginTop:33}}>
                            <Text style={{fontWeight:'bold',color:'#333'}}>¥611.00</Text>
                            <Text style={{marginTop:5,color:"#666"}}>商家补贴</Text>
                            <View style={{marginTop:5,width:81,height:3,backgroundColor:'#15cbba'}}>

                            </View>
                        </View>
                        <View style={{flex:1,alignItems:'center',marginTop:33}}>
                            <Text style={{fontWeight:'bold',color:'#333'}}>¥10543.00</Text>
                            <Text style={{marginTop:5,color:"#666"}}>平台补贴</Text>
                            <View style={{marginTop:5,width:81,height:3,backgroundColor:'#fe9e45'}}>

                            </View>
                        </View>
                    </View>
                    <View style={{height:15,backgroundColor:"#eee",width:"100%",marginTop:36}}>

                    </View>
                </View>

                <View>
                    <View style={{flexDirection:"row",alignItems:"center",marginTop:22,marginLeft:22}}>
                        <View>
                            <Text style={{color:"#1aa0f7",fontSize:16,fontWeight:'bold'}}>
                                总累计
                            </Text>
                        </View>
                        <View style={{flex:1,height:1,backgroundColor:"#000",marginLeft:12,marginRight:40,opacity:0.2}}>
                        </View>
                    </View>
                    <View style={{marginTop:30,flexDirection:"row",alignItems:"center",marginLeft:22}}>
                        <View>
                            <Text>
                                应收金额
                            </Text>
                        </View>
                        <View style={{marginLeft:15,backgroundColor:"#85dafa",width:162,height:5}}>
                        </View>
                        <View style={{marginLeft:9}}>
                            <Text style={{color:"#3697f6"}}>
                                ¥133490.00
                            </Text>
                        </View>
                    </View>
                    <Leiji text={"实收金额"}/>
                    <Leiji text={"商家补贴"}/>
                    <Leiji text={"平台补贴"}/>
                </View>

            </View>
        );
    }
}

function Leiji({text}) {
    return(
        <View style={{marginTop:18,flexDirection:"row",alignItems:"center",marginLeft:22}}>
            <View>
                <Text>
                    {text}
                </Text>
            </View>
            <View style={{marginLeft:15,backgroundColor:"#85dafa",width:162,height:5}}>
            </View>
            <View style={{marginLeft:9}}>
                <Text style={{color:"#3697f6"}}>
                    ¥133490.00
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({});