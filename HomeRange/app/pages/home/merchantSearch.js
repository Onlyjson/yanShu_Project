/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/9/30 下午1:55
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
    AsyncStorage,
    StatusBar,
    FlatList
} from 'react-native';
import { Toast,Button } from 'antd-mobile';
import DeviceStorage from "../../../app/utils/AsyncStorge";
import MyCarousel from '../../components/MyCarousel';
import MyGrid from '../../components/MyGrid';
import MyGridData  from '../../components/MyGridData';
import {MerchantList} from "./merchantList";
let dim = Dimensions.get('window');
//网络请求方法
import request from '../../utils/Request';
//接口配置
import config from '../../utils/Config';



export default class Home extends Component {
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            })
            return jsonValue;
        });
    }

    static navigationOptions=({navigation})=>({
        header:null
    });
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            searchInfo:""
        };
    }


    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.content}>
                <StatusBar barStyle="dark-content"/>
                {/*搜索栏*/}
                {this.renderHeader()}
                <View>
                    <Text style={{color:'#999',marginLeft:17,marginTop:18}}>
                        热门搜索
                    </Text>
                </View>
                {/*<View style={{height:30,flexDirection:'row',marginTop:17}}>*/}
                {/*<View style={{marginLeft:17,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>花之林</Text>*/}
                {/*</View>*/}
                {/*<View style={{marginLeft:16,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>胖哥俩肉蟹煲</Text>*/}
                {/*</View>*/}
                {/*<View style={{marginLeft:16,marginRight:17,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>胖哥俩肉蟹煲</Text>*/}
                {/*</View>*/}
                {/*</View>*/}
                {/*<View style={{height:30,flexDirection:'row',marginTop:15}}>*/}
                {/*<View style={{marginLeft:17,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>花之林</Text>*/}
                {/*</View>*/}
                {/*<View style={{marginLeft:16,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>胖哥俩肉蟹煲</Text>*/}
                {/*</View>*/}
                {/*<View style={{marginLeft:16,marginRight:17,flex:1,backgroundColor:'#eee',justifyContent:'center',alignItems:'center'}}>*/}
                {/*<Text style={{color:'#333'}}>胖哥俩肉蟹煲</Text>*/}
                {/*</View>*/}
                {/*</View>*/}


                {this.nullpage()}

            </View>
        );
    }
    nullpage(){
        if(this.state.dataSource!=null) {
            if (this.state.dataSource.length > 0) {
                return ( <FlatList
                    style={{width: dim.width, height: dim.height - 210}}
                    keyExtractor={(item: any, index: number) => index}
                    onEndReachedThreshold={0}
                    onEndReached={this.加载下一页}
                    onRefresh={this._refreshing}
                    refreshing={false}
                    data={this.state.dataSource}
                    renderItem={(item, index) => this.renderRow(item, index)}
                />)
            } else {
                return(
                    <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
                        <Image style={{marginTop:140}} source={require('../../image/dingdan/cry.png')}/>
                        <View style={{height:30}}>
                            <Text style={{marginTop:20,color:'#333'}}>无内容</Text>
                        </View>
                    </View>
                )}
        }
    }
    goDetail(item) {
        // console.log(item.id)
        this.props.navigation.navigate('Detail',{id:item.id,long:this.props.navigation.state.params.localLongitude,lati:this.props.navigation.state.params.localLatitude});
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
    searchInfo(obj){
        this.setState({
            searchInfo:obj,
        });
    }

    renderHeader(){
        return(
            <View style={styles.wrap}>
                <StatusBar barStyle="dark-content"/>
                <TouchableOpacity style={styles.left}
                    onPress={()=>{this.renderLocation()}}>
                    <Image style={{width: 14,height: 18,marginTop:16,marginRight:6}} source={require("../../image/tongyong/back_black@2x.png")}/>
                    <Text style={styles.location_view_text}>返回</Text>
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    <Image style={{width: 20,height: 20,marginLeft: 10}} source={require("../../image/shouye/search_icon.png")}/>
                    <TextInput style={{width:164,height:20,marginTop:5,marginLeft:10}}
                        placeholder='请输入搜索内容'
                        clearButtonMode={'while-editing'}
                        onChangeText={(text) => this.searchInfo(text)}
                    />
                </View>
                {/*<Image source={require('../../image/shouye/search_icon.png')} style={styles.searchIcon} />*/}

                <TouchableOpacity style={styles.right} onPress={()=>{this.renderQcode(this.state.searchInfo)}}>
                    <View style={{width:80,height:64,flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{textAlign:'center',color:'#333',fontSize:14,marginTop:16}}>搜索</Text>
                    </View>
                </TouchableOpacity>
                {/*<Image source={require("../../image/ddd.png")}/>*/}
            </View>
        )
    }





    onPress(title){
        Toast.info(title,1);
        const { navigate } = this.props.navigation
        navigate('MerchantList',title)
    }
    //搜索跳转
    renderSearch(){
        const { navigate } = this.props.navigation
        navigate('Setting')
    }
    //定位
    renderLocation(){
        this.props.navigation.goBack();
    }

    renderQcode(obj){
        this.get('userInfo').then(()=>this.search());
        // searchshops.do
    }
    加载下一页=()=>{
        let body = {
            userid: this.state.userInfo.id,
            shopcate:this.props.navigation.state.params.title||0,
            longitude:this.props.navigation.state.params.localLongitude+"",
            latitude:this.props.navigation.state.params.localLatitude+"",
            shopname:this.state.searchInfo,
            sorttype:1,
            sign:"1",
            endid:this.state.total,
            startid:this.state.endid,
            HYPERLINK:1
        };
        let url = config.api.base + config.api.searchshops;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    // console.log();
                    this.setState({
                        endid:data.data.root.endid,
                        startid:data.data.root.startid,
                        total:data.data.root.total,
                        dataSource: this.state.dataSource.concat(data.data.shopinfos),
                    });
                    console.log(this.state.dataSource)
                    //TODO
                    //Toast.success('加载更多成功',1)
                } else {
                    //TODO
                    //Toast.fail('查询列表出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    };
    _refreshing=()=> {
        let body = {
            userid: this.state.userInfo.id,
            shopcate:this.props.navigation.state.params.title||1,
            longitude:this.props.navigation.state.params.localLongitude+"",
            latitude:this.props.navigation.state.params.localLatitude+"",
            shopname:this.state.searchInfo,
            sorttype:1,
            startid:0,
            endid:0,
            sign:"1",
            HYPERLINK:1
        };
        let url = config.api.base + config.api.searchshops;
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
                    //Toast.success('刷新列表成功',1)
                } else {
                    //TODO
                    Toast.fail('查询列表出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    }
    search(){
        let body = {
            userid: this.state.userInfo.id,
            shopcate:this.props.navigation.state.params.title||1,
            sorttype:1,
            shopname:this.state.searchInfo,
            startid:0,
            endid:0,
            sign:"1",
            longitude:this.props.navigation.state.params.localLongitude+"",
            latitude:this.props.navigation.state.params.localLatitude+""
        };
        let url = config.api.base + config.api.searchshops;
        request.post(url, body).then(
            (data) => {
                console.log(data.data.shopinfos);
                if (data.code =='1') {
                    this.setState({
                        dataSource:data.data.shopinfos,
                        endid:data.data.root.endid,
                        startid:data.data.root.startid,
                        total:data.data.root.total,
                    });
                    // console.log(data.data);
                    //TODO
                    //Toast.success('搜索商户信息成功',1)
                } else {
                    //TODO
                    Toast.fail('获取用户信息失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
}


const styles = StyleSheet.create({
    content: {
        flex:1,
        width:global.SCREEN_WIDTH,
        backgroundColor:'#fff',
    },
    //左侧定位
    location_view_icon: {
        marginTop:12,
        width:10,
        height:10,
        marginLeft:2,
    },
    //左侧定位城市text
    location_view_text: {
        marginTop:16,
        color:'#333',
        fontSize:14,
    },
    //右侧扫描定位
    scan_view_icon: {
        marginTop:18,
        width:16,
        height:16,
    },
    //扫一扫定位
    scan_view_text:{
        color:'white',
        fontSize:10,
        marginTop:2,
        textAlign:'right'
    },
    searchBar: {
        width: 214,
        height: 30,
        borderRadius: 19,
        marginTop:14,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    },
    wrap :{
        //flex:1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        height:64,
        borderBottomWidth:1,
        justifyContent:'space-between'
    },
    left:{
        width: 80,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    centent:{
        flex:1,
        marginTop:10
    },
    right:{
        width: 80,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        padding:10,
        fontSize:16,
        color:'#EEEEEE',
        lineHeight:20,
        textAlign: 'center',
    }

})


