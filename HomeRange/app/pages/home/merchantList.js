/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:36
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
    FlatList,
    RefreshControl,
    StatusBar,
    AsyncStorage
} from 'react-native';
let dim = Dimensions.get('window');
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast,ActivityIndicator} from 'antd-mobile'

import MyCarousel from '../../components/MyCarousel';


import {ListItem,newListItem} from "./component/databylist"
export default class MY_PAGE extends React.PureComponent  {

    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            });
            return jsonValue;
        });
    }

    static navigationOptions=({navigation})=>({
        header : null,
    });
    constructor(props) {
        super(props)
this._bottomList=null;
        this.state = {
            ads:[],
            dex:1,
            shopcate:0,
            height:96,
            ListItem:ListItem,
            newListItem:newListItem,
            data:"",
            // dataSource:"",
            endid:"",
            startid:'',
            animating:false,
            colorArray:["red","#333","#333","#333"]
        };
    }




    //初始化赋值
    componentDidMount(){

        this.getlist();
    }

    goSeacrch(){
        const { navigate } = this.props.navigation
        navigate('Search',{title:this.props.navigation.state.params.title,
            longitude:this.props.navigation.state.params.localLongitude,
            latitude:this.props.navigation.state.params.localLatitude})
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <ActivityIndicator
                    size='large'
                    color="#1aa0f7"
                    text="正在加载..."
                    toast={true}
                    animating={this.state.animating}
                />
                <StatusBar barStyle="dark-content"/>
                {/*搜索头部*/}
                <View style={[style_.center,{backgroundColor:'#fff',height:64,paddingTop:10}]}>
                    <TouchableOpacity onPress={()=>this.goBack()} style={{width:40,height:39,position:'absolute',left:15,top:0,justifyContent:'center'}}>
                        <View style={{marginTop:35}}>
                            <Image source={require('../../image/tongyong/back_black.png')} style={{height:14,width:14}}/>
                        </View>
                    </TouchableOpacity>

                    <View style={[{alignItems:'center',justifyContent:'center',backgroundColor:"#eee",width:250,borderRadius:16,overflow:'hidden',height:29}]}>
                        <TouchableOpacity onPress={()=>this.goSeacrch()}>

                            <View style={{width:200,height:29,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:12,color:"#333"}}>
                                    搜索
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.content()}
            </View>
        );
    }
    NullPage(){
        return(

            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>


                <Image style={{marginTop:140}} source={require('../../image/dingdan/cry.png')}/>
                <View style={{height:30}}>
                    <Text style={{marginTop:20,color:'#333'}}>暂无数据</Text>
                </View>
                <View style={{width:100,height:30,borderWidth:1,borderRadius:5,marginTop:10,borderColor:'#1aa0f7',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#1aa0f7'}} onPress={()=>this.getlist()}>
                        点击刷新
                    </Text>
                </View>
            </View>
        )
    }
    content(){

        if(this.state.dataSource!=undefined) {
            if (this.state.dataSource.length > 0) {
                return (
                    <View>
                        <MyCarousel
                            ads={this.state.ads}
                            onPress={this.state.ads}
                            navigation={this.props.navigation}
                        />
                        <View style={[{
                            height: 39,
                            backgroundColor: '#fff',
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            borderBottomColor: "#999",
                            marginTop: 10
                        }, style_.center]}>
                            <TouchableOpacity onPress={() => this.change(1,this._bottomList)} style={[{
                                flex: 1,
                                height: 15,
                                borderRightWidth: 1,
                                borderRightColor: "#999"
                            }, style_.center]}>
                                <View>
                                    <Text style={{fontSize: 13, color: this.state.colorArray[0]}}>全部</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.change(2,this._bottomList)} style={[{
                                flex: 1,
                                height: 15,
                                borderRightWidth: 1,
                                borderRightColor: "#999"
                            }, style_.center]}>
                                <View>
                                    <Text style={{fontSize: 13, color: this.state.colorArray[1]}}>距离最近</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.change(3,this._bottomList)} style={[{
                                flex: 1,
                                height: 15,
                                borderRightWidth: 1,
                                borderRightColor: "#999"
                            }, style_.center]}>
                                <View>
                                    <Text style={{fontSize: 13, color: this.state.colorArray[2]}}>评价最高</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.change(4,this._bottomList)}
                                              style={[{flex: 1, height: 15}, style_.center]}>
                                <View>
                                    <Text style={{fontSize: 13, color: this.state.colorArray[3]}}>智能排序</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            ref={(scrollView) => { this._bottomList = scrollView; }}
                            // ListHeaderComponent={this._header}
                            style={{width: dim.width, height: dim.height - 230}}
                            renderItem={(item, index) => this.renderRow(item, index)}
                            keyExtractor={(item: any, index: number) => index}

                            onEndReachedThreshold={0}
                            onEndReached={this.加载下一页}
                            onRefresh={this._refreshing}
                            refreshing={false}
                            // ListFooterComponent={this.ddd}
                            extraData={this.state}
                            data={this.state.dataSource}

                        />
                    </View>
                )
            } else {
                return (
                    this.NullPage()
                )
            }
        }

    }
    keyExtractor = (item: any, index: number) => {
        return index
    }
    goDetail(item) {
        // console.log(item.id)
        this.props.navigation.navigate('Detail',{id:item.id,long:this.props.navigation.state.params.localLongitude,lati:this.props.navigation.state.params.localLatitude});
    }
    getlist(){
        this.get('userInfo').then(()=>this.setState({
            animating:true,
            shopcate:this.props.navigation.state.params.title,
            longitude:this.props.navigation.state.params.localLongitude,
            latitude:this.props.navigation.state.params.localLatitude
        },()=>{
            let body = {
                userid: this.state.userInfo.id,
                shopcate: this.state.shopcate,
                longitude:this.state.longitude+"",
                latitude:this.state.latitude+"",
                sorttype:1,
                startid:0,
                endid:0,
                HYPERLINK:1,
                sign:"1"
            };
            let url = config.api.base + config.api.getshops;
            request.post(url, body).then(
                (data) => {
                    console.log(data,"============");
                    if (data.code =='1') {
                        this.setState({
                            ads:data.data.root.ads,
                            dataSource: data.data.shopinfos,
                            endid:data.data.root.endid,
                            startid:data.data.root.startid,
                            total:data.data.root.total,
                            animating:false
                        });
                        if(data.data.shopinfos.length==0){
                            // alert(1);
                        }
                        console.log("=============>",data.data);
                        // console.log(this.state.dataSource)
                        //TODO
                        // Toast.success('查询列表成功',1)
                    } else {
                        //TODO
                        // Toast.fail('查询列表出错',1)
                    }
                }
            ).catch((err) => {
                alert(err);
            });
        }));
    }
    goBack(){
        this.props.navigation.goBack()
    }
    change(dex,_bottomList){
        let a=dex-1;
        let newArray=["#333","#333","#333","#333"];
        newArray[a]="red";
        this.setState({
            dex:dex,
            animating:true,
            colorArray:newArray
        });
        let body = {
            userid: this.state.userInfo.id,
            shopcate: this.state.shopcate,
            longitude:this.state.longitude+"",
            latitude:this.state.latitude+"",
            sorttype:dex,
            startid:0,
            endid:0,
            HYPERLINK:1,
            sign:"1"
        };
        let url = config.api.base + config.api.getshops;
        // this.setState({animating:false});
        request.post(url, body).then(

            (data) => {
                console.log(data)
                if (data.code =='1') {
                    _bottomList.scrollToOffset({animated: true, offset: 0});
                    // this.refs.flatlist.scrollTo({y: 0});
                    this.setState({
                        dataSource: data.data.shopinfos,
                        endid:data.data.root.endid,
                        startid:data.data.root.startid,
                        total:data.data.root.total,
                        animating:false
                    });
                    //TODO
                    // Toast.success('查询列表成功',1)
                } else {
                    //TODO
                    // Toast.fail('查询列表出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    }
    changeHeight(item,index){
        // this.setState((state) => {
        //     var len = state.ListItem[index].infoList.length;
        //     if(state.ListItem[index].bool==1){
        //         state.ListItem[index].height=state.ListItem[index].height+len*26;
        //         state.ListItem[index].bool=0;
        //     }else {
        //         state.ListItem[index].height=state.ListItem[index].height-len*26;
        //         state.ListItem[index].bool=1;
        //     }
        //     // state.height=110;
        //     return {state};
        // });
    }
    renderRow({item,index}){
        if(item.headerimglist[0]!=undefined) {
            let toDecimal = (x) => {
                var f = parseFloat(x);
                if (isNaN(f)) {
                    return;
                }
                f = Math.round(x * 100) / 100;
                if(f<1000){
                    return f+"米";
                }else {
                    return (f/1000).toFixed(1)+"千米";
                }
            }
            return (

                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.goDetail(item)}>
                    <MerchantList
                        index={index}
                        height={96}
                        infoList={item.discountlist}
                        img={item.headerimglist[0].mid}
                        tittle={item.shopname}
                        range={toDecimal(item.distance)}
                        starNumber={item.level}
                        actityNumber={item.discountlist.length}
                        press={this.changeHeight.bind(this, item, index)}
                        sale={item.sales}
                    ></MerchantList>
                </TouchableOpacity>
            )
        }
    }


    加载下一页=()=>{
        let body = {
            userid: this.state.userInfo.id,
            shopcate: this.state.shopcate,
            longitude:this.state.longitude+"",
            latitude:this.state.latitude+"",
            sorttype:this.state.dex,
            endid:this.state.total,
            startid:this.state.endid,
            sign:"1",
            HYPERLINK:1
        };
        let url = config.api.base + config.api.getshops;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    // console.log();
                    this.setState({
                        endid:data.data.root.endid,
                        startid:data.data.root.startid,
                        dataSource: this.state.dataSource.concat(data.data.shopinfos),
                    });
                    console.log("加载更多");
                    console.log(this.state.dataSource)
                    //TODO
                    // Toast.success('加载更多成功',1)
                } else {
                    //TODO
                    // Toast.fail('查询列表出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    };
    _refreshing=()=> {
        let body = {
            userid: this.state.userInfo.id,
            shopcate: this.state.shopcate,
            longitude:this.state.longitude+"",
            latitude:this.state.latitude+"",
            sorttype:this.state.dex,
            startid:0,
            endid:0,
            sign:"1",
            orientation:1
        };
        let url = config.api.base + config.api.getshops;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    this.setState({
                        dataSource: data.data.shopinfos,
                        endid:data.data.root.endid,
                        startid:data.data.root.startid,
                        total:data.data.root.total,
                    });
                    //TODO
                    // Toast.success('查询列表成功',1)
                } else {
                    //TODO
                    // Toast.fail('查询列表出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    }
}

const style_ = StyleSheet.create({
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

function MerchantList({sale,height,img,tittle,starNumber,infoList,press,range}) {

    var pic="";
    function Img({Imgs}) {
        if(Imgs!=null){
            return(
                <Image source={{uri:`http://39.108.139.245:9001/${Imgs}.png`}} style={{width:64,height:60,marginLeft:15}}/>
            )
        }else {
            return(
                <Image source={require('../../image/buchong/nodata.png')} style={{width:64,height:60,marginLeft:15}}/>
            )
        }
    }

    return(
        <View style={{height:height,backgroundColor:'#fff',overflow:'hidden'}}>
            <View style={{marginTop:16,flexDirection:"row"}}>
                <Img Imgs={img}/>
                <View style={{flex:1,marginLeft:12}}>
                    <View style={style_.row}>
                        <Text style={{flex:1}}>{tittle}</Text>
                        <Text style={{marginRight:16,fontSize:12,color:'#999'}}>{range}</Text>
                    </View>
                    <Star1 index={starNumber} sale={sale}></Star1>
                    <View>
                        <FlatList data={infoList}
                            keyExtractor={(item: any, index: number)=>index}
                            renderItem={({item,index}) =>{
                                let color="",val="";
                                if(item.dtype==1){
                                    color="#FEB235"
                                    val="减"
                                }if(item.dtype==2){
                                    color="#189AF7"
                                    val="银"
                                }if(item.dtype==3){
                                    color="#189AF7"
                                    val="赠"
                                }if(item.dtype==4){
                                    color="#FB5832"
                                    val="折"
                                }if(item.dtype==5){
                                    color="#21BE9c"
                                    val="首"
                                }
                                return <IconLeft index={index} changeHeight={press} item={item} color={color} icon={val} valInfo={item.disdescripe} actityNumber={infoList.length}></IconLeft>
                            }}
                        />

                    </View>
                </View>

            </View>

        </View>
    )
}

function IconLeft(props) {
    if(props.index==0){
        return(<View style={[style_.row,{marginTop:15}]}>
            <View style={[style_.center,{width:16,height:16,backgroundColor:props.color}]}>
                <Text style={{color:'#fff',fontSize:13}}>{props.icon}</Text>
            </View>
            <View style={{flex:1,marginLeft:10}}><Text numberOfLines={1} ellipsizeMode='tail'>
                <Text style={{fontSize:14,color:'#333'}}>{props.valInfo}</Text>
            </Text>
            </View>
            <TouchableOpacity onPress={()=>props.changeHeight()}>
                <View style={{marginRight:20}}>
                    <Text style={{fontSize:12,color:'#999'}}>{props.actityNumber}个活动</Text>
                </View>
            </TouchableOpacity>
        </View>)
    }
    else {
        return(<View style={[style_.row,{marginTop:15}]}>
            <View style={[style_.center,{width:16,height:16,backgroundColor:props.color}]}>
                <Text style={{color:'#fff',fontSize:13}}>{props.icon}</Text>
            </View>
            <View style={{flex:1,marginLeft:10}}><Text numberOfLines={1} ellipsizeMode='tail'>
                <Text style={{fontSize:14,color:'#333'}}>{props.valInfo}</Text>
            </Text>
            </View>
        </View>)
    }
}
function Star1(props) {
    let num ="";
    if(props.sale!=0){
        num="已售"+props.sale
    }
    if(props.index==1){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Text style={{fontSize:12,color:'#333',marginLeft:10}}>
                {num}
            </Text>
        </View>)
    }if(props.index==2){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Text style={{fontSize:12,color:'#333',marginLeft:10}}>
                {num}
            </Text>
        </View>)
    }
    if(props.index==3){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Text style={{fontSize:12,color:'#333',marginLeft:10}}>
                {num}
            </Text>
        </View>)
    }
    if(props.index==4){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Text style={{fontSize:12,color:'#333',marginLeft:10}}>
                {num}
            </Text>
        </View>)
    }
    if(props.index==5){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Text style={{fontSize:12,color:'#333',marginLeft:10}}>
                {num}
            </Text>
        </View>)
    }
}

export {MerchantList}