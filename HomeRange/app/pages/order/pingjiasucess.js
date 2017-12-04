/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:38
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
var { width, height } = Dimensions.get('window');

export default class MY_PAGE extends Component {
    static navigationOptions=({navigation})=>({
        header:null
        // headerTitle:null,
        // headerTitleStyle:{
        //     fontSize:18,
        //     color:'white'
        // },
    })
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            orderID:this.props.navigation.state.params.orderID,
            phoneNumber:0,
            signNumber:0,
            opacity:0,
            val:"手机号已被注册"
        };
    }
    renderRow(){
        return(
            <View style={{flexDirection:'row',marginTop:18,height:60}}>
                <View style={{width:60,height:60,backgroundColor:'pink',marginLeft:12}}>

                </View>
                <View style={{flex:1,marginLeft:12}}>
                    <Text style={{marginTop:9,color:'#333'}}>家园东北烧烤</Text>
                    <Text style={{marginTop:14,color:'#666',fontSize:11}}>下单时间:2017-09-16 18:36</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <View style={{width:76,height:26,borderColor:'#f67017',borderWidth:1,justifyContent:'center',alignItems:'center',marginRight:0}}>
                        <Text style={{color:'#f67017',fontSize:13}}>评价</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#999',height:1,marginHorizontal:12,marginTop:14}}></View>
            </View>
        )
    }
    返回上一级(){
        this.props.navigation.goBack();
    }
    返回订单(){
        this.props.navigation.navigate('Order');
    }
    查看评价(){
        this.props.navigation.navigate('PingjiaList');
    }
    render() {
        let data=[{key:1},{key:2},{key:3}]
        return (
            <View>
                <ScrollView>
                    <View style={{height:250,backgroundColor:'#fff'}}>
                        <Image source={require('../../image/youhuiquan/success_bg.png')}>
                       <Image source={require('../../image/tongyong/back@2x.png')} style={{width:12,height:12,position:'absolute',top:40,left:12}}/>
                           <View style={{flexDirection:'row',justifyContent:'center',marginTop:74,height:10,alignItems:'center'}}>
                               <Image source={require('../../image/youhuiquan/smile.png')}/>
                                  <View>
                                      <Text style={{backgroundColor:'rgba(0,0,0,0)',color:'#fff',fontSize:16,marginLeft:9}}>{"评价成功!"}</Text>
                                  </View>
                           </View>
                       </Image>
                        <View style={{flexDirection:'row',marginTop:31,alignItems:'center',justifyContent:'center'}}>
                            <View style={{borderColor:'#999',width:139,height:29,borderRadius:20,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                <Text onPress={()=>this.返回订单()}>返回订单</Text>
                            </View>
                            <View style={{marginLeft:30,borderColor:'#1799f6',width:139,height:29,borderRadius:20,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
                                <Text onPress={()=>this.查看评价()}  style={{color:'#333'}}>查看我的评价</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{height:520,backgroundColor:'#fff',marginTop:10}}>
                        <Text style={{color:'#999',marginTop:18,marginLeft:12}}>继续评价</Text>
                        <FlatList
                            data={data}
                            renderItem={(item,index) => this.renderRow(item,index)}
                        />


                    </View>
                </ScrollView>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        height:80,
        flexDirection:'row',
        alignItems:'center',
    },
    left:{
        width: 80,
        marginTop:20
    },
    centent:{
        flex:1,
    },
    right:{
        //width: 80,
    },
    text1:{
        fontSize:16,
        color:'#333333',
        fontWeight:'bold',
        marginTop:14
    },
    text2:{
        fontSize:11,
        color:'#666666',
        marginLeft:0,
        marginTop:8
    },
    text3:{
        fontSize:12,
        color:'#333',
        marginLeft:0,
        marginTop:5
    },
    text4:{
        fontSize:12,
        color:'#1799f6',
    },
    text5:{
        fontSize:15,
        color:'#f67017',
    },
    hairline:{
        marginTop:15,
        height:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    image1:{
        height: 58,
        width: 58,
        marginLeft:10
    },
    button1:{
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#f67017',
    },
});



