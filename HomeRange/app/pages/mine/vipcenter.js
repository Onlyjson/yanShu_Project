






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
    PixelRatio
} from 'react-native';
let dim = Dimensions.get('window');


export default class Mine extends Component {
    render() {
        return (
            <View style={{width:dim.width,height:dim.height,backgroundColor:'#fff'}}>
                <View style={{width:dim.width,height:177,backgroundColor:'#fff'}}>
                   <Image source={require('../../image/huiyuanzhongxin/bg.png')} style={{width:dim.width,height:177}}>
                       <View style={[styles.center,{backgroundColor:'rgba(0,0,0,0)'}]}>
                           <Text style={{color:'#fff'}}>金卡</Text>
                       </View>
                   </Image>
                </View>
                <View style={[styles.center,{marginTop:49}]}>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                            昵称：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                            逆风如解意
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                电话：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                15690283832
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员卡号：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                164994132
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员等级：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                金卡
                            </Text>
                        </View>
                    </View>
                    <View style={[{width:220,height:16,marginTop:25},styles.row]}>
                        <View style={{width:100,alignSelf:'flex-end'}}>
                            <Text style={{textAlign:'right',color:'#999',fontSize:16}}>
                                会员有效期：
                            </Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{color:'#333',fontSize:16}}>
                                2018年9月5日
                            </Text>
                        </View>
                    </View>

                    {/*<View style={styles.center}>*/}
                        {/*<View style={[{width:400,height:20},styles.row]}>*/}
                            {/*<View style={{width:90}}>*/}
                                {/*<Text>昵称</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flex:1}}>*/}
                                {/*<Text>逆风如解意</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                    {/*</View>*/}
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





