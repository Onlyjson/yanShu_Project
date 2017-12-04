import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    StatusBar,
    AsyncStorage
} from 'react-native';

import { Toast,ActivityIndicator } from  'antd-mobile'
import Coupons_Item from './component/List_Item_Coupons'
import config from '../../utils/Config'//接口配置
import { netRequest } from '../../utils/FetchRequest'//网络请求方法
import { NullPage , NoNetPage }from '../../components/NullPage'
import RefreshListView, {RefreshState} from '../../components/MyRefreshFlatList'

export default class Coupons extends Component {
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
    static navigationOptions=({navigation,screenProps})=>({
        headerTitle:'优惠券',
        headerTitleStyle:{
            fontSize:18,
            color:'white'
        },
    });

    constructor(props) {
        super(props);

        this.state = {
            dataList: "",
            refreshState: RefreshState.Idle,
            animating:false
        }
    }

    componentDidMount() {
        this.get('userInfo').then(()=>this._fetchData());
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                {this._renderList()}
            </View>
        )
    }

    _renderList() {
        // if(this.state.dataList!="") {
            if (this.state.dataList.length > 0) {
                return (
                    <RefreshListView
                        data={this.state.dataList}
                        keyExtractor={this.keyExtractor}
                        renderItem={this._renderRow}

                        refreshState={this.state.refreshState}
                        onHeaderRefresh={this.onHeaderRefresh}

                    />

                )
            } else {
                return ( isNet ? this.NullPage() : <NoNetPage/> );
            }
        // }
    }

    NullPage(){
        return(
            <View style={{flex:1,backgroundColor:'#fff',alignItems:'center'}}>
                <ActivityIndicator
                    size='large'
                    color="#1aa0f7"
                    text="正在加载..."
                    toast={true}
                    animating={this.state.animating}
                />
                <Image style={{marginTop:140}} source={require('../../image/dingdan/cry.png')}/>
                <Text style={{marginTop:20}}>暂无优惠卷</Text>
                <View style={{width:100,height:30,borderWidth:1,borderRadius:5,marginTop:10,borderColor:'#1aa0f7',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#1aa0f7'}} onPress={()=>this._fetchData()}>
                        点击刷新
                    </Text>
                </View>

            </View>
        )
    }

    _fetchData() {
        this.setState({
            animating:true
        })
        this.setState({refreshState: RefreshState.HeaderRefreshing})
        netRequest(
            config.api.base + config.api.youhuiquan,
            {
                userid:this.state.userInfo.id,
                sign: '1',//
            },

            (data)=>{
                console.log('返回的数据为data---',data)
                if (data.code =='1'){
                    this.setState({
                        dataList:data.data,
                        refreshState: RefreshState.Idle,
                        animating:false
                    });
                    // Toast.success('查询列表成功',1)
                }

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

    keyExtractor = (item: any, index: number) => {
        return index
    }

    _renderRow = (rowData) => {
        console.log('rowData-->',rowData.item.couponname);
        rowData =rowData.item
        return (
            <Coupons_Item
                onPress={() => this.cellOnPress()}
                rowData={rowData}
            />

        );
    }

    cellOnPress(){
        // alert('4444')
    }

    //下拉刷新
    onHeaderRefresh = () => {
        this.setState({refreshState: RefreshState.HeaderRefreshing})

        netRequest(
            config.api.base + config.api.youhuiquan,
            {
                userid:this.state.userInfo.id,
                sign: '1',//
            },

            (data)=>{
                console.log('下拉刷新返回的数据为data---',data)
                this.setState({
                    refreshState: RefreshState.Idle,
                    dataList:data.data,
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

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : 0,
    },
    title: {
        fontSize: 18,
        height: 84,
        textAlign: 'center'
    }
})




