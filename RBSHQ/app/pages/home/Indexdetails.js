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
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');
function IconLeft(props) {
    return(<View style={[styles.center,{width:16,height:16,backgroundColor:props.color,marginLeft:15}]}>
        <Text style={{color:'#fff',fontSize:13}}>{props.val}</Text>
    </View>)
}

export default class MY_PAGE extends Component {

    goBack(){
        this.props.navigation.goBack()
    }
    render() {
        return (
            <ScrollView style={{width:dim.width,height:dim.height}}>
                <View style={[{width:dim.width,height:188,backgroundColor:'pink'}]}>
                    <TouchableOpacity style={[{position:'absolute',top:15,left:15}]} onPress={()=>this.goBack()}>
                        <Text>返回</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{position:'absolute',top:15,right:47}]} onPress={()=>this.goBack()}>
                        <Text>分享</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{position:'absolute',top:15,right:10}]} onPress={()=>this.goBack()}>
                        <Text>收藏</Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <View style={[styles.center,{marginTop:17}]}><Text style={{fontWeight:'900',color:'#333',fontSize:18}}>家园东北烧烤</Text></View>
                    <View style={[styles.center,{marginTop:7},styles.row]}>
                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                        <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                    </View>
                    <View style={[styles.center,{marginTop:7,marginBottom:10}]}><Text style={{fontSize:13,color:'#9d9d9d'}}><Text>人均¥120</Text><Text>|</Text><Text>已售2831</Text></Text></View>
                </View>
                <View style={[styles.row,{backgroundColor:'#fff',alignItems:'center',height:50,borderTopWidth:0.5,borderTopColor:'#000'}]}>
                    <Text style={{marginLeft:15,fontSize:14,color:'#666'}}>地址:</Text><Text style={{fontSize:13,color:'#333'}}>苏州市吴中区月苑街200号</Text>
                    <View style={[{flex:1,width:49,height:21},styles.row,styles.center]}>
                        <Image source={require('../../img/address.png')} style={{width:14.5,height:16,marginRight:10}}/>
                        <Image source={require('../../img/phone.png')} style={{width:12,height:12,marginLeft:40}}/>
                    </View>
                </View>
                <View style={{marginTop:9}}>
                    <View style={{paddingTop:10,paddingBottom:18,backgroundColor:'#fff',borderBottomWidth:0.1,borderBottomColor:'#e5eaf6'}}>
                        <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff'}]}>
                          <IconLeft val="减" color="#FEB235"></IconLeft>
                            <View style={{flex:1,marginLeft:10}}><Text><Text style={{fontSize:14,color:'#333'}}>会员消费，每单立减5元，一天一次</Text>
                                <Text style={{fontSize:13,color:'#999'}}>/剩余100名</Text></Text></View>
                        </View>
                        <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff',justifyContent: 'center',}]}>
                            <IconLeft val="银" color="#189AF7"></IconLeft>
                            <View style={{flex:1,marginLeft:10}}><Text><Text style={{fontSize:14,color:'#333'}}>工商银行卡，每单立减20元，一天一次</Text>
                                <Text style={{fontSize:13,color:'#999'}}>/剩余50名</Text></Text></View>
                        </View>
                        <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff',justifyContent: 'center',}]}>
                            <IconLeft val="赠" color="#FA3635"></IconLeft>
                            <View style={{flex:1,marginLeft:10}}><Text><Text style={{fontSize:14,color:'#333'}}>满1000，赠送720元，分12月送完</Text>
                            </Text></View>
                        </View>
                        <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff',justifyContent: 'center',}]}>
                            <IconLeft val="折" color="#FB5832"></IconLeft>
                            <View style={{flex:1,marginLeft:10}}><Text><Text style={{fontSize:14,color:'#333'}}>会员消费，享受8折，一天一次</Text></Text></View>
                        </View>
                        <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff',justifyContent: 'center'}]}>
                            <IconLeft val="首" color="#21BE9c"></IconLeft>
                            <View style={{flex:1,marginLeft:10}}><Text><Text style={{fontSize:14,color:'#333'}}>商家首次加入平台，会员消费减免5元</Text>
                                <Text style={{fontSize:13,color:'#999'}}>/剩余100名</Text></Text></View>
                        </View>
                    </View>
                    <View style={{backgroundColor:"#fff"}}>
                        <View style={[{height:89,backgroundColor:'#fff',marginLeft:15,marginRight:15,flexDirection:'row'},styles.center]}>
                            <View style={{flex:1}}>
                            <TextInput placeholder='请输入付款金额(元)'
                                       clearButtonMode={'while-editing'}
                                       style={{paddingLeft:14,fontSize:14,color:'#8a8a8a',height:49,backgroundColor:'#f2f2f2',borderTopLeftRadius:4,borderBottomLeftRadius:4}}/>
                            </View>
                            <View style={[{width:100,height:49,backgroundColor:'blue',borderTopRightRadius:4,borderBottomRightRadius:4},styles.center]}>
                                <Text style={{color:'#fff',fontSize:16}}>付款</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:300,backgroundColor:'#fff',marginTop:16}}>
                        <View style={[{height:40,borderBottomWidth:.5,borderBottomColor:"#000",flexDirection:'row'},styles.center]}>
                            <View style={{width:3,height:9,backgroundColor:'blue',marginLeft:15}}></View>
                            <View style={{flex:10,marginLeft:10}}>
                                <Text>
                                <Text>用户评价(120)</Text>
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row'}}>
                                <Text>查看</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{marginTop:15,flexDirection:"row",marginLeft:15,borderBottomWidth:0.5,borderBottomColor:"#000",height:80}}>
                                <View style={{width:37,height:37,backgroundColor:'pink',overflow:'hidden',borderRadius:37}}>

                                </View>
                                <View style={{flex:1,marginLeft:10}}>
                                    <View><Text style={{fontSize:14,color:"#333"}}>逆风如解意</Text></View>
                                    <View style={[styles.row,{marginTop:9}]}>
                                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                                        <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                                        <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                                    </View>
                                    <View style={{marginTop:18}}>
                                        <Text>
                                            上菜很快,口味适中，比较实惠
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEE',
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
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    row:{
        flexDirection: 'row'
    }
});

