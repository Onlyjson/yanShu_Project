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
    Button,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import request from '../../../../utils/Request'
import config from '../../../../utils/Config'
import { Tabs , ActivityIndicator }  from 'antd-mobile'
import {Pingjia,Star1} from  "../../component/Detail"
import {Toast} from 'antd-mobile'


export default class HeiMingDan extends Component {
    state = {
        key:'1',
        animating:true,
        pingjiaitem:""
    }

    componentDidMount(){
        this.canselcollect();
    }

    canselcollect(){
        let body = {
            shopid:this.props.navigation.state.params.id,
            type:2,
            sign: "1",
            startid:0,
            endid:0,
            HYPERLINK:1
        };
        let url = config.api.base + config.api.get;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data.data);
                    this.setState({
                        pingjiaitem:data.data.comments
                    });
                    //Toast.success('查询收藏列表成功',1)
                } else {
                    //TODO
                    //Toast.success('查询收藏列表失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }

    render() {
        return (
            <View>
                <FlatList
                    extraData={this.state}
                    keyExtractor={(item: any, index: number) => index}
                    data={this.state.pingjiaitem}
                    renderItem={(item,index) => this.renderRow_pingjia(item,index)}
                />
            </View>
        );
    }
    //评价部分行列
    renderRow_pingjia({item,index}){
        console.log(item);
        return(
            <Pingjia headurl={item.user.headurl} stars={this.Star2(item.level)} tittle={item.user.nickname} text={item.content} time={item.createtime}></Pingjia>

        )
    }
    Star2(index){
        if(index==1){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }if(index==2){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==3){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==4){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==5){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row:{
        flexDirection: 'row'
    }

});