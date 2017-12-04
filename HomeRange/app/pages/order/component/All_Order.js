import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    StatusBar,
    AsyncStorage,
    Platform
} from 'react-native';

import config from '../../../utils/Config'//接口配置
import { netRequest } from '../../../utils/FetchRequest'//网络请求方法
import { NullPage , NoNetPage }from '../../../components/NullPage'
import { Toast,ActivityIndicator } from  'antd-mobile'
import All_Order_Item from '../component/All_Order_List_Item'
import RefreshListView, {RefreshState} from '../../../components/MyRefreshFlatList'

export default class All_Order extends Component {
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            })
            return jsonValue;
        });
    }

    constructor(props) {
        super(props)

        this.state = {
            dataList: "",
            refreshState: RefreshState.Idle,
            startid:0,
            endid:0,
            animating:false
        }
    }

    componentDidMount() {
        this.get('userInfo').then(()=>this._fetchData());
        // this._fetchData()
    }

    render() {
        console.log('render scene')
        return (
            <View style={styles.container}>
                {this._renderList()}
            </View>
        )
    }

    _renderList() {
        console.log('_renderList')
        if(this.state.dataList!="") {
            if (this.state.dataList.length > 0) {
                return (
                    <RefreshListView
                        data={this.state.dataList}
                        keyExtractor={this.keyExtractor}
                        renderItem={this._renderRow}
                            removeClippedSubviews={false}
                        // renderItem={(item) => this._renderRow(item)}

                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}
                        onFooterRefresh={this.onFooterRefresh}

                        // 可选
                        footerRefreshingText='玩命加载中 >.<'
                            footerFailureText = '居然失败了 =.=!'
                        footerNoMoreDataText='-我是有底线的-'
                    />

                )
            } else {
                return ( isNet ? this.NullPage() : <NoNetPage/> );
            }
        }
    }
    NullPage(){
        return(

            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>


                <Image style={{marginTop:140}} source={require('../../../image/buchong/cry.png')}/>
                <View style={{height:30}}>
                    <Text style={{marginTop:20,color:'#333'}}>无订单</Text>
                </View>
                <View style={{width:100,height:30,borderWidth:1,borderRadius:5,marginTop:10,borderColor:'#1aa0f7',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#1aa0f7'}} onPress={()=>this._fetchData()}>
                点击刷新
                </Text>
                </View>
                {this.Actity(this.state.animating)}
            </View>
        )
    }
    Actity(obj){
        if(obj==true) {
            return (
                <View style={{
                    position: 'absolute',
                    width: 80,
                    top: "50%",
                    height: 80,
                    left: "50%",
                    marginLeft: -40,
                    marginTop: 160,
                    backgroundColor: '#333',
                    opacity: 0.9,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#fff', fontSize: 12}}>正在加载...</Text>
                </View>
            )
        }else {
            return;
        }
    }

    _renderRow = (item,index) => {
        console.log('_renderRow',item.item.ordercode)
        item =item.item
        return (
            <All_Order_Item
                key={'key-${index}'}
                onPress={() => this.cellOnPress(item)}
                buttonOneClick={() => this.buttonOneClick(item)}
                buttonPingClick={()=>this.buttonPingClick(item)}
                item={item}
            />
        );
    };

    keyExtractor = (item: any, index: number) => {
        return index
    }

    buttonPingClick(item){
        const { navigate } = this.props.navigation
        navigate('PingJia',{id:item.id,return_data:this.return_data.bind(this)})
    }



    // cellOnPress(item){
    //     // console.log(item);
    //     const { navigate } = this.props.navigation
    //     navigate('Zailaiyidan',{item:item})
    // }

    buttonOneClick(item){
        const { navigate } = this.props.navigation
        navigate('Zailaiyidan',{item:item,return_data:this.return_data.bind(this)})
    }


    cellOnPress(item){
        // console.log(item);
        const { navigate } = this.props.navigation
        navigate('Zailaiyidan',{item:item,return_data:this.return_data.bind(this)})
    }

    //评价成功后回调
    return_data(){
        this.get('userInfo').then(()=>this._fetchData());
    }




    //数据请求
    _fetchData() {
        this.setState({
            animating:true
        })
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        netRequest(
            config.api.base + config.api.getorder,
            {
                userid:this.state.userInfo.id,
                sign: '1',//
                startid:0,
                endid:0,
                orientation:1,
            },
            (data)=>{
                console.log('返回的数据为data---',data)
                if (data.code =='1'){
                    this.setState({
                        dataList:data.data.orders,
                        startid:data.data.root.startid,
                        endid:data.data.root.endid,
                        refreshState: RefreshState.Idle,
                        total:data.data.root.total,
                        animating:false
                    });
                }
                //Toast.success('查询列表成功',1)
            },
            (err)=>{
                this.setState({refreshState: RefreshState.Idle})
                // console.error(err)
                Toast.info('请求数据失败',1)
            },
            ()=> {
                this.setState({refreshState: RefreshState.Idle})
                Toast.offline('当前网络不可用')
            }
        )

    }

    //下拉刷新
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        netRequest(
            config.api.base + config.api.getorder,
            {
                userid:this.state.userInfo.id,
                sign: '1',//
                startid:0,
                endid:0,
                orientation:1,
            },

            (data)=>{
                console.log('下拉刷新返回的数据为data---',data)
                this.setState({
                    refreshState: RefreshState.Idle,
                    dataList:data.data.orders,
                    startid:data.data.root.startid,
                    endid:data.data.root.endid,
                    total:data.data.root.total,
                });
            },
            (err)=>{
                this.setState({ refreshState: RefreshState.Idle });
                // console.error(err)
                Toast.info('请求数据失败',1)
            },
            ()=> {
                this.setState({ refreshState: RefreshState.Idle});
                Toast.offline('当前网络不可用')
            }
        )

    }

    //上拉加载更多
    onFooterRefresh = () => {
        this.setState({refreshState: RefreshState.FooterRefreshing})
        netRequest(
            config.api.base + config.api.getorder,
            {
                userid:this.state.userInfo.id,
                sign: '1',//
                startid:this.state.endid,
                endid:this.state.total,
                orientation:1,
            },

            (data)=>{
                console.log('加载更多返回的数据为data---',data)
                this.setState({
                    dataList: this.state.dataList.concat(data.data.orders),
                    //refreshState: data.data.orders.length >= 17 ? RefreshState.NoMoreData : RefreshState.Idle,
                    refreshState: RefreshState.NoMoreData,
                    startid:data.data.root.startid,
                    endid:data.data.root.endid,
                    total:data.data.root.total,
                });
            },
            (err)=>{
                this.setState({ refreshState: RefreshState.Idle });
                // console.error(err)
                Toast.info('请求数据失败',1)
            },
            ()=> {
                this.setState({ refreshState: RefreshState.Idle });
                Toast.offline('当前网络不可用')
            }
        )
    }


}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})


/**
 *
 * // 开始下拉刷新
 this.setState({refreshState: RefreshState.HeaderRefreshing})

 // 开始上拉翻页
 this.setState({refreshState: RefreshState.FooterRefreshing})

 // 加载成功
 this.setState({refreshState: RefreshState.Idle})

 // 加载失败
 this.setState({refreshState: RefreshState.Failure})

 // 加载全部数据
 this.setState({refreshState: RefreshState.NoMoreData})
 * **/