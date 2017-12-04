/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:38
 */
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
    TouchableOpacity,
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
import { HeaderBackButton } from 'react-navigation';
var { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    contain:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'#fff'
    },
    center:{
        justifyContent: 'center',alignItems: 'center',marginTop:30
    }
});

export default class MY_PAGE extends Component {
    static navigationOptions=({navigation})=>({
        headerTitle:null,
        headerTitleStyle:{
            fontSize:18,
            color:'white'
        },
        //消除黑线
        headerStyle: { backgroundColor: "#1aa0f7",
            borderBottomColor: 'transparent',
            borderBottomWidth: 0
        },
        headerLeft: (
            <HeaderBackButton
                tintColor='white'
                onPress={() => navigation.state.params.handleSave()}
            />
        ),
    });
    state = {
        dataSource:this.props.navigation.state.params.item,
        isfinish:0,
        phoneNumber:0,
        signNumber:0,
        opacity:0,
        val:"手机号已被注册"
    };
    //初始化赋值
    constructor(props){
        super(props);
    }


    componentDidMount(){
        this.props.navigation.setParams({ handleSave: this._leftClick.bind(this) })
        // console.log()
        // this.get('userInfo').then(()=>this.collectList());
    }
    _leftClick=()=>{
        this.props.navigation.state.params.return_data()
        this.props.navigation.goBack()
    }
    collectList(){
        let body = {
            shopid:1,
            isassess:1,
            sign: "1"
        };
        let url = config.api.base + config.api.getorder;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data.data);
                    this.setState({
                        ListItem:data.data
                    });
                    //TODO
                    // alert("")
                    //Toast.success('查询收藏成功',1)
                } else {
                    //TODO
                    //Toast.success('查询收藏失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    HeaderImg(id){
        if(id==""){
            return(<Image source={require('../../image/buchong/cry.png')} style={{borderWidth:1,width:60,height:60,borderRadius:31}}></Image>)
        }
        else{
            return(
                <Image source={require('../../image/buchong/cry.png')} style={{borderWidth:1,width:60,height:60,borderRadius:31,position:'absolute',top:-30}}></Image>
            )
        }
    }
    render() {
        console.log(this.state.dataSource)
        return (
            <View>
                <ScrollView>
                        <View style={{height:100,backgroundColor:"#1aa0f7"}}>

                        </View>

                    <View style={{height:230,backgroundColor:'#fff'}}>

                    </View>

                    <View style={{width:Dimensions.get('window').width,height:100,position:'absolute',top:40,left:0}}>
                        <View style={{alignItems:'center'}}>
                            <View style={{width:260,height:150,alignItems:'center',backgroundColor:'#fff',shadowOpacity:1,shadowRadius:2,shadowColor:'#999',shadowOffset:{height:1}}}>
                                {this.HeaderImg(this.state.dataSource.user.headurl)}

                                <Text style={{marginTop:40,fontSize:18}}>订单已完成！</Text>
                                {this.isfinish(this.state.dataSource.isassess)}
                                </View>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',height:30,marginTop:20}}>
                            {/*<Image style={{marginLeft:12,width:30,height:30}} source={require('../../image/shouye/daiyuanquan/dessert.png')}/>*/}

                            <Text style={{marginLeft:12,width:36,backgroundColor:'rgba(0,0,0,0)',color:"#666"}}>地址:</Text>
                            <Text style={{flex:1,backgroundColor:'rgba(0,0,0,0)',marginLeft:10}}>{this.state.dataSource.shopinfo.address}</Text>
                            <Image style={{marginRight:12}} source={require('../../image/dingdan/iconRight2.png')}/>
                        </View>
                        {/*<View style={{flexDirection:'row',marginTop:20}}>*/}
                            {/*<Text style={{flex:1,marginLeft:52,backgroundColor:'rgba(0,0,0,0)'}}>优惠券</Text>*/}
                            {/*<Text style={{marginRight:12,backgroundColor:'rgba(0,0,0,0)',color:'red'}}>满200减20</Text>*/}
                        {/*</View>*/}
                        <View style={{height:1,backgroundColor:'#e5eaf6',marginTop:10,marginHorizontal:12}}>

                        </View>
                        <View style={{flexDirection:'row',alignSelf:'flex-end',marginTop:10}}>
                            <Text style={{color:'#999',textDecorationLine:'line-through',marginRight:12,backgroundColor:'rgba(0,0,0,0)'}}>应付:¥{this.state.dataSource.orderprice}</Text>
                            <Text style={{marginRight:12,backgroundColor:'rgba(0,0,0,0)'}}>实付:¥{this.state.dataSource.payprice}</Text>
                        </View>
                    </View>

                    <View style={{backgroundColor:'#fff',marginTop:10,height:320}}>
                        <View style={{flexDirection:'row',marginTop:20}}>
                            <Text style={{marginLeft:12,color:'#666'}}>订单号码:</Text>
                            <Text style={{color:"#333",marginLeft:12}}>{this.state.dataSource.ordercode}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Text style={{marginLeft:12,color:'#666'}}>支付方式:</Text>
                            <Text style={{color:"#333",marginLeft:12}}>{this.payway(this.state.dataSource.payway)}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10}}>
                            <Text style={{marginLeft:12,color:'#666'}}>下单时间:</Text>
                            <Text style={{color:"#333",marginLeft:12}}>{this.state.dataSource.ordertime}</Text>
                        </View>
                    </View>

                </ScrollView>

            </View>
        );
    }
    isfinish(obj){
        if(this.state.isfinish==0) {
            if (obj == 1) {
                return (
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('Detail', {
                            id: this.state.dataSource.shopinfo.id,
                            long: "",
                            lati: ""
                        });
                    }} style={{flex: 1, flexDirection: 'row'}}>
                        <Text style={{
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 30,
                            lineHeight: 25,
                            height: 30,
                            borderColor: '#1aa0f7',
                            borderWidth: 1,
                            color: '#1aa0f7',
                            flex: 1,
                            textAlign: 'center'
                        }}>再来一单</Text>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity style={{
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 30,
                            justifyContent: "center",
                            alignItems: "center",
                            height: 30,
                            borderColor: '#1aa0f7',
                            borderWidth: 1,
                            flex: 1,
                        }} onPress={() => {
                            this.props.navigation.navigate('Detail', {
                                id: this.state.dataSource.shopinfo.id,
                                long: "",
                                lati: ""
                            })
                        }}>
                            <Text style={{color: '#1aa0f7'}}>再来一单</Text>
                        </TouchableOpacity>
                        <Text onPress={() =>
                            this.buttonPingClick(this.state.dataSource.id)
                        }
                              style={{
                                  marginLeft: 10,
                                  marginRight: 10,
                                  marginTop: 30,
                                  lineHeight: 25,
                                  height: 30,
                                  borderColor: '#1aa0f7',
                                  borderWidth: 1,
                                  color: '#1aa0f7',
                                  flex: 1,
                                  textAlign: 'center'
                              }}>
                            评价
                        </Text>
                    </View>
                )
            }
        }else {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('Detail', {
                        id: this.state.dataSource.shopinfo.id,
                        long: "",
                        lati: ""
                    });
                }} style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{
                        marginLeft: 10,
                        marginRight: 10,
                        marginTop: 30,
                        lineHeight: 25,
                        height: 30,
                        borderColor: '#1aa0f7',
                        borderWidth: 1,
                        color: '#1aa0f7',
                        flex: 1,
                        textAlign: 'center'
                    }}>再来一单</Text>
                </TouchableOpacity>
            )
        }
    }
    returnfinish(){
        alert(1);
        this.setState({
            isfinish:1
        })
    }
    buttonPingClick(id){
        const { navigate } = this.props.navigation
        navigate('PingJia',{id:id,return_data:"1",isfinish:this.returnfinish.bind(this)})
    }
    payway(obj){
        if(obj==0){
            return"银行卡"
        }if(obj==1){
            return"支付宝"
        }else {
            return"微信"
        }
    }
}



