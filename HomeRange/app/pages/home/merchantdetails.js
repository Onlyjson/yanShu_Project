/**
 * 首页轮播图点击详情
 * **/
import React, { Component } from "react"
import {AsyncStorage,StyleSheet,Linking, Text, View,PixelRatio, Image,FlatList,StatusBar, Dimensions ,ScrollView,TouchableOpacity,TextInput} from "react-native"
import * as Animatable from "react-native-animatable"
import { Header } from "react-navigation"
import HeaderImageScrollView, { TriggeringView } from "react-native-image-header-scroll-view"
import * as WeChat from 'react-native-wechat';
import MyCarousel from '../../components/MyCarousel2'
import request from '../../utils/Request'
import config from '../../utils/Config'
import {Toast} from 'antd-mobile'
import ModalBox from 'react-native-modalbox'

let dim = Dimensions.get('window');
import MapLinking from '../../common/AMap';//地图调用
import {Pingjia,Star1,IconLeft} from  "./component/Detail"
const Window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
const MIN_HEIGHT = Header.HEIGHT
const MAX_HEIGHT = 188

const shareList = [
    {
        icon: require('../../image/buchong/icon-weixin.png'),
        name: '微信好友',
        code: 'wx_friend',
    },
    {
        icon: require('../../image/buchong/icon-circle.png'),
        name: '朋友圈',
        code: 'wx_circle',
    }
];

export default class LunBoDetail extends Component {

    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            })
            return jsonValue;
        });
    }

    static navigationOptions = {
        header:null,
        // headerTintColor: "rgba(0,0,0,0)",
        headerTitle: null,
        headerStyle: {
        },
    };
    //初始化赋值
    constructor(props){
        super(props);
        WeChat.registerApp('wxfa7e09756642baa0');
        this.state = {
            length:0,
            iscollect:"",
            userInfo:"",
            bgColor:"rgba(0,0,0,0)",
            money:"",
            dataSource:"",
            shopid:this.props.navigation.state.params.id,
            pingjiaitem: [
                {key:1,StarNumber:5,tittle:"逆风如解意",text:"上菜挺快的",time:"2017-09-27"},
                {key:2,StarNumber:2,tittle:"逆风不解意",text:"上菜挺慢的",time:"2017-10-27"},
                {key:3,StarNumber:3,tittle:"逆风要解意",text:"上菜挺惨的",time:"2017-11-27"},
                {key:4,StarNumber:4,tittle:"逆风想解意",text:"上菜挺好的",time:"2017-12-27"},
                {key:5,StarNumber:1,tittle:"逆风能解意",text:"上菜挺傻的",time:"2017-13-27"}
            ]
        };

    }

    componentDidMount(){
        this._fetchData();
    }
    changeHeader(obj){
        if(obj>120){
            this.setState({
                bgColor:'#1aa0f7'
            })
        }else {
            this.setState({
                bgColor:'rgba(0,0,0,0)'
            })
        }
    }
    changeImg(){
        if(this.state.bgColor=="#1aa0f7"){
            return 'rgba(0,0,0,0)'
        }else {
            return 'rgba(0,0,0,0.3)'
        }
    }
    _handleEndDrag(event,_scrollView){
        if(event.nativeEvent.velocity.y<0) {
            _scrollView.scrollTo({y: 0});
        }
    }
    //数据请求
    _fetchData(){
        let body = {
            userid: this.state.userInfo.id,
            shopid: this.props.navigation.state.params.id,
            sign: "1"
        };
        let url = config.api.base + config.api.shopinfoassess;

        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data)

                    this.setState({
                        pingjia:data.data.comments,
                        dataSource: data.data.shopinfo,
                        iscollect:data.data.shopinfo.iscollect,
                        lengths:data.data.comments.length,
                    });
                    // console.log(,"==========");
                } else {
                    //TODO
                    Toast.fail('查询详情出错',1)
                }
            }
        ).catch((err) => {
            alert(err);
        });
    }

    render() {
        let queryString = this.state.dataSource;
        return (
            <View style={{flex: 1,}}>

                <ModalBox
                    ref={"modal"}
                    style={[styles.modal,
                        {width: Window.width, height: Math.ceil(shareList.length/3)*100 + 70}]}
                    backdropOpacity={0.3}
                    position={"bottom"}
                    isOpen={false}>
                    <View style={styles.content}>
                        { this._renderList(shareList) }
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.close()} style={styles.btn}>
                        <Text style={styles.btnText}>取消</Text>
                    </TouchableOpacity>
                </ModalBox>

                <ScrollView ref={(scrollView) => { this._scrollView = scrollView; }}
                    scrollEventThrottle={200}
                    onScrollEndDrag={(event)=>{this._handleEndDrag(event,this._scrollView)}}
                    style={{flex:1,backgroundColor:'#f2f2f2'}}
                    onScroll={(e)=>{this.changeHeader(e.nativeEvent.contentOffset.y)}}
                >
                    <StatusBar barStyle={'light-content'} />


                    <View style={[{height:188,backgroundColor:'transparent'}]}>


                        {/*<TouchableOpacity style={[{position:'absolute',top:15,left:15}]} onPress={()=>this.goBack()}>*/}
                        {/*<Image source={require('../../image/tongyong/back.png')} style={{marginTop:20,height:14,width:14}}/>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<TouchableOpacity style={[{position:'absolute',top:15,right:47}]} onPress={()=>alert(1)}>*/}
                        {/*<Text style={{marginTop:20,color:'white'}}>分享</Text>*/}
                        {/*</TouchableOpacity>*/}

                        {/*<TouchableOpacity style={[{position:'absolute',top:15,right:10}]} onPress={()=>this.goBack()}>*/}
                        {/*<Text style={{marginTop:20,color:'white'}}>收藏</Text>*/}
                        {/*</TouchableOpacity>*/}

                        <MyCarousel data={this.state.dataSource.headerimglist} onPress={ (index) => alert(index) }/>

                    </View>
                    <View style={[styles.section,{flex:1}]}>
                        <View style={{backgroundColor:'#fff'}}>
                            <View style={[styles.center,{marginTop:17}]}><Text style={{fontWeight:'900',color:'#333',fontSize:18}}>{this.state.dataSource.shopname}</Text></View>
                            <View style={[styles.center,{marginTop:7},styles.row]}>
                                <Star1 index={queryString.level} />
                            </View>
                            <View style={[styles.center,{marginTop:7,marginBottom:10}]}><Text style={{fontSize:13,color:'#9d9d9d'}}><Text>人均¥{queryString.percapita}</Text><Text>|</Text><Text>已售{queryString.sales}</Text></Text></View>
                        </View>
                        <View style={[styles.row,{backgroundColor:'#fff',alignItems:'center',height:50,borderTopWidth:1,borderTopColor:'#e5eaf6'}]}>
                            <View style={{flex:1,flexDirection:'row'}}>

                                <Text style={{marginLeft:15,fontSize:14,color:'#666'}}>地址:<Text style={{fontSize:13,color:'#333'}}>{queryString.address}</Text></Text>
                            </View>
                            <View style={[{width:100,height:21},styles.row,styles.center]}>

                                <TouchableOpacity onPress={()=>this._MapLink(this.state.dataSource.latitude,this.state.dataSource.longitude)}>
                                <Image source={require('../../image/xiamgqing/address.png')} style={{width:14.5,height:16,marginRight:15}}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.get('userInfo').then(()=>this._phoneClick(this.state.dataSource.servicetel))}>
                                <Image source={require('../../image/xiamgqing/phone.png')} style={{width:12,height:12,marginLeft:15}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop:9}}>
                            <View style={{paddingTop:10,paddingBottom:18,backgroundColor:'#fff',borderBottomWidth:0.1,borderBottomColor:'#e5eaf6'}}>
                                <FlatList
                                    extraData={this.state}
                                    keyExtractor={this.keyExtractor}
                                    data={queryString.discountlist}
                                    renderItem={(item,index) => this.renderRow(item,index)}
                                />
                            </View>
                            <View style={{backgroundColor:"#fff"}}>
                                <View style={[{height:89,backgroundColor:'#fff',marginLeft:15,marginRight:15,flexDirection:'row'},styles.center]}>
                                    <View style={{flex:1}}>
                                        <TextInput placeholder='请输入付款金额(元)'
                                            clearButtonMode={'while-editing'}
                                            onChangeText={(text) => this.money(text)}
                                            style={{paddingLeft:14,fontSize:14,color:'#8a8a8a',height:49,backgroundColor:'#f2f2f2',borderTopLeftRadius:4,borderBottomLeftRadius:4}}/>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.goPay()}>
                                        <View style={[{width:100,height:49,backgroundColor:'#1aa0f7',borderTopRightRadius:4,borderBottomRightRadius:4},styles.center]}>
                                            <Text style={{color:'#fff',fontSize:16}}>付款</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{backgroundColor:'#fff',marginTop:16}}>
                                <View style={[{height:40,borderBottomWidth:.5,borderBottomColor:"#000",flexDirection:'row'},styles.center]}>
                                    <View style={{width:3,height:9,backgroundColor:'blue',marginLeft:15}}></View>
                                    <View style={{flex:10,marginLeft:10}}>
                                        <Text>
                                            <Text>用户评价({this.state.lengths})</Text>
                                        </Text>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row'}}>
                                        <Text onPress={()=>this.goAllpingjia()}>查看</Text>
                                    </View>
                                </View>
                                {this.pingjiaList(this.state.lengths,this.state.dataSource.shopname)}

                            </View>
                            <View style={[{height:98,backgroundColor:'#fff'},styles.center]}>
                                <TouchableOpacity onPress={()=>this.goAllpingjia()}>
                                    <View style={[{width:93,height:21,borderWidth:1,borderColor:'#1799f6',borderRadius:4},styles.center]}><Text  style={{color:'#1799f6',fontSize:12,}}>查看全部评价</Text></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{position:'absolute',top:0,left:0,width:dim.width,backgroundColor:this.state.bgColor,height:60,justifyContent:"center"}}>
                    <TouchableOpacity style={[{position:'absolute',top:20,left:15}]} onPress={()=>this.goBack()}>
                        <Image source={require('../../image/tongyong/back.png')} style={{marginTop:8,height:14,width:14}}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={[{position:'absolute',top:20,right:77,}]}
                        //分享选择
                        onPress={()=>this.open()}
                    >
                        <View style={{width:30,height:30,borderRadius:30,backgroundColor:this.changeImg(),justifyContent:'center',alignItems:"center"}}>
                             <Image  style={{width:16,height:16}} source={require("../../image/buchong/share.png")}/>
                        </View>
                        {/*<Text style={{marginTop:8,color:'white'}}>分享</Text>*/}
                    </TouchableOpacity>
                    {/*<IsCang  obj={queryString.iscollect}/>*/}
                    {this.isCang(this.state.iscollect)}
                </View>
            </View>
        )
    }

    _ziyoufenxiang(){
        this.open()
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: '融博生活圈',
                        description: '测试测试',
                        thumbImage: `http://39.108.139.245:9001/${this.state.dataSource.headerimglist[0].mid}.png`,
                        type: 'news',
                        webpageUrl: 'http://www.baidu.com'
                    }).catch((error) => {
                        Toast.info(error.message, 1);
                    });
                } else {
                    Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
                }
            });
    }

    handleTodo(code) {
        if (!this.lock) {
            switch (code) {
                case 'wx_circle':
                    WeChat.isWXAppInstalled()
                        .then((isInstalled) => {
                            if (isInstalled) {
                                WeChat.shareToTimeline({
                                    title: '融博生活圈',
                                    description: '融博生活圈',
                                    thumbImage: `http://39.108.139.245:9001/${this.state.dataSource.headerimglist[0].mid}.png`,
                                    type: 'news',
                                    webpageUrl: 'http://www.baidu.com'
                                }).catch((error) => {
                                    Toast.info(error.message, 1);
                                });
                            } else {
                                Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
                            }
                        });
                    break;
                case 'wx_friend':
                    WeChat.isWXAppInstalled()
                        .then((isInstalled) => {
                            if (isInstalled) {
                                WeChat.shareToSession({
                                    title: '融博生活圈',
                                    description: '融博生活圈',
                                    thumbImage: `http://39.108.139.245:9001/${this.state.dataSource.headerimglist[0].mid}.png`,
                                    type: 'news',
                                    webpageUrl: 'http://www.baidu.com'
                                }).catch((error) => {
                                    Toast.info(error.message, 1);
                                });
                            } else {
                                Toast.info('没有安装微信软件，请您安装微信之后再试', 1);
                            }
                        });
                    break;
                default:
                    break;
            }
        }
    }


    _renderList(data) {
        return data.map((item, i) => {
            return (
                <TouchableOpacity key={i} onPress={()=>this.handleTodo(item.code)} style={styles.item}>
                    <Image style={styles.image} source={item.icon} />
                    <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
            )
        })
    }

    open() {
        this.refs.modal.open()
    }

    close() {
        this.refs.modal.close()
    }


    _MapLink(weidu,jingdu){
        // alert(weidu+"1111111"+jingdu)
        //alert(this.state.lat)
        console.log('纬度',weidu)
        console.log('经度',jingdu)
        MapLinking.navigate({lat:weidu,lng:jingdu, title: '终点'})
    }


    _phoneClick(ConsigneePhone){
        let url = 'tel: ' + ConsigneePhone;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    pingjiaList(len) {

        if(len===undefined){
            return;
        }else if(len===0){
            return(
                <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                    <Text>
                        暂无评价
                    </Text>
                </View>
            )
        }else if(len>0){
            return(
                <FlatList
                    keyExtractor={(item: any, index: number)=>index}
                    extraData={this.state}
                    data={this.state.pingjia}
                    renderItem={(item,index) => this.renderRow_pingjia(item,index)}
                />
            )
        }
    }

    isCang(obj){

        if(obj==0){
            return(
                <TouchableOpacity ref="collect" style={[{position:'absolute',top:20,right:10,width:30,height:30,borderRadius:30,backgroundColor:this.changeImg(),justifyContent:"center",alignItems:"center"}]} onPress={()=>this.get('userInfo').then(()=>this.addcollect())}>
                    <Image style={{width:16,height:16}} source={require("../../image/buchong/collection.png")}/>
                    {/*<Text style={{marginTop:8,color:'white'}}>收藏</Text>*/}
                </TouchableOpacity>
            )
        }else {
            return(
                <TouchableOpacity
                    style={[{position:'absolute',top:20,right:10,width:30,height:30,borderRadius:30,backgroundColor:this.changeImg(),justifyContent:"center",alignItems:"center"}]}
                    onPress={()=>this.get('userInfo').then(()=>this.canselcollect())}>
                    <Image style={{width:16,height:16}} source={require("../../image/buchong/collection_Selected.png")}/>
                </TouchableOpacity>
            )
        }
    }

    keyExtractor = (item: any, index: number) => {
        return index
    };



    canselcollect(){
        let body = {
            userid: this.state.userInfo.id,
            shopid:this.props.navigation.state.params.id,
            sign: "1"
        };
        let url = config.api.base + config.api.collectcancel;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data.data);
                    this.setState({
                        iscollect:data.data.iscollect
                    });
                    Toast.success('取消收藏成功',1)
                } else {
                    //TODO
                    Toast.success('取消收藏失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }

    //收藏
    addcollect(){
        let body = {
            userid: this.state.userInfo.id,
            shopid:this.props.navigation.state.params.id,
            sign: "1"
        };
        let url = config.api.base + config.api.collect;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    console.log(data.data);
                    this.setState({
                        iscollect:data.data.iscollect
                        // dataSource: data.data,
                        // iscollect:this.state.dataSource.iscollect
                    });
                    Toast.success('收藏成功',1)
                } else {
                    //TODO
                    Toast.success('收藏失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }

    goPay(){
        if(this.state.money!=""){
            this.props.navigation.navigate('Pay',this.state);
        }else {
            Toast.info("请输入金额",1)
        }
        // this.props.navigation.navigate('Pay',this.state);
    }
    money(obj){
        this.setState({
            money:obj
        })
    }
    goBack(){
        this.props.navigation.goBack()
    }
    goAllpingjia(){
        this.props.navigation.navigate('PingjiaList',{id:this.props.navigation.state.params.id})
    }

    // 折扣部分行列
    renderRow({item,index}){
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
        return(
            <View style={[styles.row,styles.center,{height:36,backgroundColor:'#fff'}]}>
                <IconLeft val={val} color={color}></IconLeft>
                <View style={{flex:1,marginLeft:10}}>
                    <Text>
                        <Text style={{fontSize:14,color:'#333'}}>{item.disdescripe}</Text>
                        {/*<Text style={{fontSize:13,color:'#999',opacity:item.other}}>/{item.othermessage}</Text>*/}
                    </Text>
                </View>
            </View>
        )
    }
    //评价部分行列
    renderRow_pingjia({item,index}){
        return(
            <Pingjia headurl={item.user.headurl} stars={this.Star2(item.level)} tittle={item.user.nickname} text={item.content} time={item.createtime}>

        </Pingjia>)
    }
    Star2(index){
        if(index==1){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }if(index==2){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==3){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==4){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
        if(index==5){
            return(<View style={[styles.row,{marginTop:9}]}>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
                <Image source={require('../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            </View>)
        }
    }
}



const styles = StyleSheet.create({
    nav: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 50,
        height: 50,
        zIndex: 1000,
    },
    image: {
        height: MAX_HEIGHT,
        width: Dimensions.get("window").width,
        alignSelf: "stretch",
        resizeMode: "cover",
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        color: "white",
        fontSize: 18,
        backgroundColor: "transparent",
    },
    titleContainer: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
    },
    imageTitle: {
        color: "white",
        backgroundColor: "transparent",
        fontSize: 24,
    },
    section: {
        //padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        backgroundColor: "white",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    sectionContent: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "justify",
    },
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
    },
    content: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent:'center',
        position: 'relative',
    },
    item: {
        width: (Window.width - 40) / 3,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginBottom: 10,
    },
    title: {
        fontSize: 14,
        color: '#9B9B9B',
    },
    btn: {
        borderTopColor: '#eee',
        borderTopWidth: 1/PixelRatio.get(),
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        color: '#686868',
    },
})