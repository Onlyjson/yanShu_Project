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
    FlatList
} from 'react-native';
let dim = Dimensions.get('window');


function MerchantList(props) {

    return(
        <TouchableOpacity onPress={()=>this.goDetail()}>
        <View style={{height:96,backgroundColor:'#fff'}}>
            <View style={{marginTop:16,flexDirection:"row"}}>
                <Image style={{width:64,height:60,backgroundColor:props.img,marginLeft:15}}/>
                <View style={{flex:1,marginLeft:12}}>
                    <View style={style_.row}>
                        <Text style={{flex:1}}>{props.tittle}</Text>
                        <Text style={{marginRight:16,fontSize:12,color:'#999'}}>{props.range}</Text>
                    </View>
                    <Star1 index={props.starNumber}></Star1>
                    <FlatList data={props.infoList}

                              renderItem={({item}) =>{
                                  let color=""
                                  if(item.key=="减"){
                                        color="#FEB235"
                                  }if(item.key=="银"){
                                      color="#189AF7"
                                  }if(item.key=="赠"){
                                      color="#189AF7"
                                  }if(item.key=="折"){
                                      color="#FB5832"
                                  }if(item.key=="首"){
                                      color="#21BE9c"
                                  }
                                  return <IconLeft color={color} icon={item.key} valInfo={item.valInfo} actityNumber={props.actityNumber}></IconLeft>
                              }}
                   />
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}
function Fff(props) {
    return(
        <FlatList data={props.array}

                  renderItem={({item}) => <IconLeft icon={item.valInfo} valInfo={item.valInfo} ></IconLeft>}/>
    )
}
function IconLeft(props) {

    return(
        <View style={[style_.row,{marginTop:15}]}>
            <View style={[style_.center,{width:16,height:16,backgroundColor:props.color}]}>
                <Text style={{color:'#fff',fontSize:13}}>{props.icon}</Text>
            </View>
            <View style={{flex:1,marginLeft:10}}><Text numberOfLines={1} ellipsizeMode='tail'>
                <Text style={{fontSize:14,color:'#333'}}>{props.valInfo}</Text>
            </Text>
            </View>
            <View style={{marginLeft:10}} >
                <Text style={{marginRight:20,fontSize:12,color:'#999'}}>{props.actityNumber}个活动</Text>
            </View>
        </View>
    )
}
function Star1(props) {
    if(props.index==1){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }if(props.index==2){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==3){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==4){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(props.index==5){
        return(<View style={[style_.row,{marginTop:13}]}>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../img/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
}

export default class MY_PAGE extends Component {
     goDetail() {
        // this.props.navigation.navigate('Detail',{ name: 'two' });
    }
    //初始化赋值
    constructor(props){
        super(props);
        this.state = {
            ListItem:[{
                key:"1",
                img:"red",
                tittle:"家园东北烧烤",
                range:"350米",
                starNumber:1,
                infoList:[{key: '减',valInfo:"减价啦,快来买是不是傻啊"},
                    {key: '折',valInfo:"打折啦,快来买是不是傻啊"},
                    {key: '银',valInfo:"银行啦,快来买是不是傻啊"},
                    {key: '赠',valInfo:"赠品啦,快来买是不是傻啊"},
                    {key: '首',valInfo:"首付啦,快来买是不是傻啊"}],
                actityNumber:2
            },{
                key:"2",
                img:"blue",
                tittle:"家园东南烧烤",
                range:"320米",
                starNumber:2,
                infoList:[{key: '减',valInfo:"真的减价啦,快来买是不是傻啊"},
                    {key: '折',valInfo:"打折啦,快来买是不是傻啊"},
                    {key: '银',valInfo:"银行啦,快来买是不是傻啊"},
                    {key: '赠',valInfo:"赠品啦,快来买是不是傻啊"},
                    {key: '首',valInfo:"首付啦,快来买是不是傻啊"}],
                actityNumber:3
            },{
                key:"3",
                img:"green",
                tittle:"家园西南烧烤",
                range:"360米",
                starNumber:3,
                infoList:[{key: '减',valInfo:"假的减价啦,快来买是不是傻啊"},
                    {key: '折',valInfo:"打折啦,快来买是不是傻啊"},
                    {key: '银',valInfo:"银行啦,快来买是不是傻啊"},
                    {key: '赠',valInfo:"赠品啦,快来买是不是傻啊"},
                    {key: '首',valInfo:"首付啦,快来买是不是傻啊"}],
                actityNumber:4
            },{
                key:"4",
                img:"pink",
                tittle:"家园西北烧烤",
                range:"370米",
                starNumber:4,
                infoList:[{key: '减',valInfo:"虚的减价啦,快来买是不是傻啊"},
                    {key: '折',valInfo:"打折啦,快来买是不是傻啊"},
                    {key: '银',valInfo:"银行啦,快来买是不是傻啊"},
                    {key: '赠',valInfo:"赠品啦,快来买是不是傻啊"},
                    {key: '首',valInfo:"首付啦,快来买是不是傻啊"}],

                actityNumber:5
            },{
                key:"5",
                img:"#e5eaf6",
                tittle:"家园西北烧烤",
                range:"390米",
                starNumber:5,
                infoList:[{key: '减',valInfo:"实的减价啦,快来买是不是傻啊"},
                    {key: '折',valInfo:"打折啦,快来买是不是傻啊"},
                    {key: '银',valInfo:"银行啦,快来买是不是傻啊"},
                    {key: '赠',valInfo:"赠品啦,快来买是不是傻啊"},
                    {key: '首',valInfo:"首付啦,快来买是不是傻啊"}],
                actityNumber:6
            }

            ]
        };
    }
    goBack(){
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View>
                <View style={[style_.center,{backgroundColor:'#fff',height:39}]}>
                    <View style={{width:40,height:39,position:'absolute',left:15,top:0,justifyContent:'center'}}>
                        <Text>返回</Text>
                    </View>
                    <View style={[style_.center,{backgroundColor:"#eee",width:250,borderRadius:16,overflow:'hidden',height:29}]}>

                            <TextInput style={{width:200,height:29,textAlign:'center',fontSize:12,color:"#333"}}
                                       placeholder={"搜索"}
                            ></TextInput>
                    </View>
                </View>
                <View style={{height:100,backgroundColor:'pink'}}>

                </View>
                <View style={[{height:39,backgroundColor:'#fff',flexDirection:"row",borderBottomWidth:1,borderBottomColor:"#999",marginTop:10},style_.center]}>

                    <View style={[{flex:1,height:15,borderRightWidth:1,borderRightColor:"#999"},style_.center]}>
                        <Text style={{fontSize:13,color:"#333"}}>全部</Text>
                    </View>
                    <View style={[{flex:1,height:15,borderRightWidth:1,borderRightColor:"#999"},style_.center]}>
                        <Text style={{fontSize:13,color:"#333"}}>距离最近</Text>
                    </View>
                    <View style={[{flex:1,height:15,borderRightWidth:1,borderRightColor:"#999"},style_.center]}>
                        <Text style={{fontSize:13,color:"#333"}}>评价最高</Text>
                    </View>
                    <View style={[{flex:1,height:15},style_.center]}>
                        <Text style={{fontSize:13,color:"#333"}}>智能排序</Text>
                    </View>
                </View>
            <ScrollView style={{width:dim.width,height:dim.height-210}}>
                <FlatList
                    data={this.state.ListItem}
                    renderItem={({item}) =><MerchantList infoArray={this.state.ListItem}
                                                         infoList={item.infoList}
                                                         img={item.img}
                                                         tittle={item.tittle}
                                                         range={item.range}
                                                         starNumber={item.starNumber}
                                                         actityNumber={item.actityNumber}></MerchantList> }
                />

            </ScrollView>
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

