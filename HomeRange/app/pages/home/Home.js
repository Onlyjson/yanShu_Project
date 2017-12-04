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
    ScrollView,
    AsyncStorage,
    StatusBar,
    Button,
    TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import { Toast ,Carousel,ActivityIndicator} from 'antd-mobile';
import DeviceStorage from "../../../app/utils/AsyncStorge";
import MyCarousel from '../../components/MyCarousel';
import MyGrid from '../../components/MyGrid';
import MyGridData  from '../../components/MyGridData';
import request from '../../utils/Request';//网络请求方法
import config from '../../utils/Config';//接口配置
import {Geolocation} from 'react-native-baidu-map';

export default class Home extends Component {

    static navigationOptions=({navigation})=>({
        header:null
    });

    state = {
        searchText:null,
        images: ['https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png', 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png', 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'],
        image1: '',//广告数组
        animating:false,
        localLongitude:'',//经度
        localLatitude:'',//纬度
        LocalPosition:'',
    }
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
    // 保存
    async save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    componentDidMount() {
        this.get('userInfo').then(()=>this._fetchData());
        // APP启动的时候获取地理位置
        this._getLocation();

        DeviceEventEmitter.addListener('changeImage',(dic)=>{
            //接收到详情页发送的通知，刷新首页的数据，改变按钮颜色和文字，刷新UI
            this.setState({
                callback2:dic.jsona,
            });
            this.props.navigation.navigate('Detail',{id:dic.jsona,long:"",lati:""})
        });

    }

    render() {
        return (
            <View style={styles.content}>
                <StatusBar barStyle="light-content"/>
                {/*搜索栏*/}
                {this.renderHeader()}

                <ScrollView>
                    <ActivityIndicator
                        size='large'
                        color="#1aa0f7"
                        text="正在加载..."
                        toast={true}
                        animating={this.state.animating}
                    />

                    <Carousel
                        selectedIndex={0}
                        swipeSpeed={35}
                        autoplayTimeout={5}
                        autoplay
                        infinite
                        dotStyle={styles.dotStyle}
                        dotActiveStyle={styles.dotActiveStyle}
                    >
                        {this.renderImg()}
                    </Carousel>
                    <MyGrid
                        data={MyGridData}
                        onPress={(title) => this.onPress(title) }
                    />

                </ScrollView>
            </View>
        );
    }

    //定位信息
    _getLocation(){

        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(JSON.stringify(data));
                this.setState({
                    LocalPosition:data.city,
                    localLatitude: data.latitude,
                    localLongitude: data.longitude,
                });

                this.save("long",data.longitude);
                this.save("lati",data.latitude)
            })
            .catch(e =>{
                console.log(e, 'error');
            })
    }

    //头部
    renderHeader(){
        return(
            <View style={styles.wrap}>
                <TouchableOpacity style={styles.left}
                    onPress={()=>{this._getLocation()}}>
                    <Text style={styles.location_view_text}>{this.state.LocalPosition}</Text>
                    {/*<Image style={styles.location_view_icon} source={require('../../image/shouye/home.png')}/>*/}
                </TouchableOpacity>

                <TouchableOpacity style={styles.searchBar}  onPress={()=>{this.renderSearch()}}>
                    <Image source={require('../../image/shouye/search_icon.png')} style={styles.searchIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.right]} onPress={()=>{this.renderQcode()}}>
                    <Image style={styles.scan_view_icon} source={require('../../image/shouye/scan.png')}/>
                    <Text style={styles.scan_view_text}>扫一扫</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //轮播图广告
    renderImg=()=>{
        // if(this.state.image1!="") {

            var imageViews = [];
            let images = this.state.image1;
            if(images.length==1){
                for (let i = 0; i < images.length; i++) {
                    console.log(`http://39.108.139.245:9001/${images[i][0]}.png`)
                    imageViews.push(
                        <View key={i}>
                            <TouchableOpacity onPress={() => this._showToast(images[i][1])} key={i}>
                                <Image
                                    key={i}
                                    style={styles.topImg}
                                    //http://39.108.139.245:9001/1508315741133.png
                                    //`https://zos.alipayobjects.com/rmsportal/${ii}.png`
                                    source={{uri: `http://39.108.139.245:9001/${images[i][0]}.png`}}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                    imageViews.push(
                        <View key={i}>
                            <TouchableOpacity onPress={() => this._showToast(images[i][1])} key={i}>
                                <Image
                                    key={i}
                                    style={styles.topImg}
                                    //http://39.108.139.245:9001/1508315741133.png
                                    //`https://zos.alipayobjects.com/rmsportal/${ii}.png`
                                    source={{uri: `http://39.108.139.245:9001/${images[i][0]}.png`}}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }
            }else {
                for (let i = 0; i < images.length; i++) {
                    console.log(`http://39.108.139.245:9001/${images[i][0]}.png`)
                    imageViews.push(
                        <View key={i}>
                            <TouchableOpacity onPress={() => this._showToast(images[i][1])} key={i}>
                                <Image
                                    key={i}
                                    style={styles.topImg}
                                    //http://39.108.139.245:9001/1508315741133.png
                                    //`https://zos.alipayobjects.com/rmsportal/${ii}.png`
                                    source={{uri: `http://39.108.139.245:9001/${images[i][0]}.png`}}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }
            }

            console.log(this.state.image1);
            return imageViews;
        // }
    }

    //轮播图跳转
    _showToast(i) {
        const { navigate } = this.props.navigation
        navigate('Detail',{id:i,long:this.state.localLongitude,lati:this.state.localLatitude})
    }

    onPress(title){
        const { navigate } = this.props.navigation
        navigate('MerchantList',{title:title,localLongitude:this.state.localLongitude,localLatitude:this.state.localLatitude})
        console.log('经度',this.state.localLongitude)
        console.log('纬度',this.state.localLatitude)
    }

    //搜索跳转
    renderSearch(){
        const { navigate } = this.props.navigation
        navigate('Search',{localLongitude:this.state.localLongitude,localLatitude:this.state.localLatitude})
        //navigate('MyYinDaoYe')
    }

    //扫一扫
    renderQcode(){
        const { navigate } =this.props.navigation
        //navigate('PingJia',{id:item.id,return_data:this.return_data.bind(this)})
        navigate('扫一扫',{callback2:this.callback2.bind(this)})
    }
    //扫一扫回调
    callback2(callback){
        console.log('我是扫描后传回来的内容:',callback)
        console.log('我是扫描后传回来的内容:',this.props.navigation.navigate)
        const { navigate } = this.props.navigation
        navigate('Login')
        //this.props.navigation.navigate('Detail',{id:callback,long:"",lati:""})
        // Toast.info(callback,1)

    }
    //网络请求
    _fetchData(){
        this.setState({ animating:true })
        let body = {
            userid:this.state.userInfo.id,
            sign: '1',
        };

        let url = config.api.base + config.api.shouye;
        request.post(url, body).then(
            (data) => {
                //console.log('返回的数据',data)
                if (data.code===1) {
                    //TODO
                    let obj = data.data.ads
                    let arr = []
                    for (let i = 0; i < obj.length; i++) {
                        let arr0 = []
                        arr0.push(obj[i].imgid)
                        arr0.push(obj[i].shopid)
                        // arr0.push(obj[i].height)
                        // arr0.push(obj[i].width)
                        arr.push(arr0)
                    }
                    this.setState({
                        image1:arr,
                        animating:false,
                    })
                    //console.log('我是Image1---》',this.state.image1)
                } else {
                    //TODO
                    this.setState({ animating:false })
                    //Toast.fail('用户名或密码错误',1)
                }
            }
        )
            .catch((err) => {
                this.setState({ animating:false })
                console.log('err',err);
            });
    }


}


const styles = StyleSheet.create({
    content: {
        flex:1,
        width:global.SCREEN_WIDTH,
        backgroundColor:'#f2f2f2',
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
        color:'white',
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
        flex:1,
        height: 30,
        borderRadius: 19,
        marginTop:14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        justifyContent:"space-between",
        backgroundColor: '#1aa0f7',
        height:64
    },
    left:{
        width: 65,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
    },
    centent:{
        flex:1,
        marginTop:10
    },
    right:{
        width: 65,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        padding:10,
        fontSize:14,
        color:'#EEEEEE',
        lineHeight:20,
        textAlign: 'center',
    },
    //轮播图
    topImg:{
        width:global.SCREEN_WIDTH,
        height:131
    },
    dotStyle:{
        backgroundColor:'#e0e0e0'
    },
    dotActiveStyle:{
        width:8,
        backgroundColor:'white'
    }

})


