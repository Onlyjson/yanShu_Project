/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    // ImageBackground,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');
function selectOrUnselect(bool) {
    if(bool==true){
        return require('../../image/fukuan/selected.png');
    }
    else {
        return require('../../image/fukuan/unselected.png');
    }
}
function Checked(props){
    return(
        <View style={[{width:20,marginRight:16,justifyContent:'center'}]}>
            <Image source={props.status} style={{width:20,height:20}}/>
        </View>
    )
}
export default class Mine extends Component {
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            union:false,
            wx:true,
            zfb:false,
        };
    }
    check(obj){
        if(obj=='union'){
            if(this.state.union==false){
                this.setState({
                    union:true,
                    wx:false,
                    zfb:false,
                })
            }
        }
        if(obj=='wx'){
            if(this.state.wx==false){
                this.setState({
                    union:false,
                    wx:true,
                    zfb:false,
                })
            }
        }
        if(obj=='zfb'){
            if(this.state.zfb==false){
                this.setState({
                    union:false,
                    wx:false,
                    zfb:true,
                })
            }
        }
    }

    render() {
        return (
            <View>
                <View style={{backgroundColor:"#fff",marginTop:10}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                优惠券
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:12,color:'#fd8136'}}>
                               一张可用
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:70,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                应付金额（元）
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:16,color:'#333'}}>
                                220
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{width:120}}>
                            <Text style={{textAlign:'left',marginLeft:15}}>
                                实付金额（元）
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{textAlign:'right',marginRight:15,fontSize:16,color:'#fd8136'}}>
                                170
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff",marginTop:20,height:600}}>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{flex:1,flexDirection:'row',marginLeft:24}}>
                            <Image source={require('../../image/fukuan/UnionPay.png')} style={{width:26,height:16.5}}/>
                            <View style={[styles.center,{marginLeft:44}]}>
                            <Text>银行卡支付</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.check('union')}>
                            <Checked status={selectOrUnselect(this.state.union)}>

                            </Checked>
                        </TouchableOpacity>
                    </View>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{flex:1,flexDirection:'row',marginLeft:24}}>
                            <Image source={require('../../image/fukuan/wx.png')} style={{width:24.5,height:24.5}}/>
                            <View style={[styles.center,{marginLeft:44}]}>
                                <Text>微信支付</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.check('wx')}>
                            <Checked status={selectOrUnselect(this.state.wx)}>

                            </Checked>
                        </TouchableOpacity>
                    </View>
                    <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                        <View style={{flex:1,flexDirection:'row',marginLeft:24}}>
                            <Image source={require('../../image/fukuan/zfb.png')} style={{width:24.5,height:24.5}}/>
                            <View style={[styles.center,{marginLeft:44}]}>
                                <Text>支付宝支付</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.check('zfb')}>
                            <Checked status={selectOrUnselect(this.state.zfb)}>

                            </Checked>
                        </TouchableOpacity>
                    </View>
<View style={[styles.center,{marginTop:71}]}>
                <View style={[{width:328,height:45,backgroundColor:'#fd8237'},styles.center]}>
                    <Text style={{color:'#fff'}}>
                        确认支付¥{this.props.navigation.state.params.money}
                    </Text>
                </View>
</View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    borderTop:{
        borderTopWidth:1,borderTopColor:"#f1f1f1"
    },
    borderBottom:{
        borderBottomWidth:1,borderBottomColor:"#f1f1f1"
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
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
});





