/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午3:40
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
    StatusBar,
    TouchableOpacity,
    FlatList,
    AsyncStorage
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'
import { Toast } from 'antd-mobile'
let dim = Dimensions.get('window');


function MerchantList(props) {

    return(

        <View style={{height:props.height,backgroundColor:'#fff',overflow:'hidden',borderBottomColor:'#333',borderBottomWidth:1}}>
            <View style={{marginTop:16,flexDirection:"row"}}>
                <Image  source={{uri:`http://39.108.139.245:9001/${props.img}.png`}}  style={{width:64,height:60,marginLeft:15}}/>
                <View style={{flex:1,marginLeft:12}}>
                    <View style={style_.row}>
                        <Text style={{flex:1}}>{props.tittle}</Text>
                    </View>
                    <Star1 index={props.starNumber}></Star1>
                    <View>

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
    if(props.index==1){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }if(props.index==2){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==3){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==4){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star_un.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==5){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../image/meishi/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
}

export default class MY_PAGE extends React.PureComponent  {
    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'我的收藏',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
    });
    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue,
                headurl:""
            })
            return jsonValue;
        });
    }
    async getzuobiao1(key){
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                longitude:jsonValue
            })
            return jsonValue;
        });
    }
    async getzuobiao2(key){
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                latitude:jsonValue
            })
            return jsonValue;
        });
    }
    componentDidMount(){
        this.getzuobiao1("long").then(()=>
            this.getzuobiao2("lati").then(
                ()=>this.get('userInfo').then(
                    ()=>this.collectList()
                )
            )

        )

    }
    collectList(){
        // console.log(this.state.key)
        let body = {
            userid: this.state.userInfo.id,
            longitude:this.state.longitude,
            latitude:this.state.latitude,
            sign: "1"
        };
        let url = config.api.base + config.api.myclo;
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
    goDetail(item) {
        this.props.navigation.navigate('Detail',{id:item.id,long:"",lati:""});
    }
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            height:96,
            ListItem:[]
        };
    }
    goBack(){
        this.props.navigation.goBack()
    }
    change(){
        this.setState((state) => {
            var d = state.newListItem;
            state.ListItem=d;
            // var len = state.ListItem[index].infoList.length;
            // if(state.ListItem[index].bool==1){
            //     state.ListItem[index].height=state.ListItem[index].height+len*26;
            //     state.ListItem[index].bool=0;
            // }else {
            //     state.ListItem[index].height=state.ListItem[index].height-len*26;
            //     state.ListItem[index].bool=1;
            // }
            // state.height=110;
            return {state};
        });
    }
    changeHeight(item,index){
        this.setState((state) => {
            var len = state.ListItem[index].infoList.length;
            if(state.ListItem[index].bool==1){
                state.ListItem[index].height=state.ListItem[index].height+len*26;
                state.ListItem[index].bool=0;
            }else {
                state.ListItem[index].height=state.ListItem[index].height-len*26;
                state.ListItem[index].bool=1;
            }
            // state.height=110;
            return {state};
        });
    }
    renderRow({item,index}){
        return(
            <TouchableOpacity key={index} activeOpacity={1} onPress={()=>this.goDetail(item)}>
                <MerchantList infoArray={this.state.ListItem}
                    index={index}
                    height={96}
                    img={item.headerimglist[0].mid}
                    tittle={item.address}
                    range={111}
                    starNumber={item.level}


                    press={this.changeHeight.bind(this,item,index)}
                ></MerchantList>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <StatusBar barStyle="dark-content"/>
                    <FlatList
                        keyExtractor={(item: any, index: number)=>index}
                        extraData={this.state}
                        data={this.state.ListItem}
                        renderItem={(item,index) => this.renderRow(item,index)}
                    />
            </View>
        );
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

