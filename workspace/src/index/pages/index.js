
import React, { Component } from 'react';
import Swiper from "react-native-swiper";

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    PropTypes,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';



const circleImage = require("../../img/circle.png");

import styles from "../style/indexStylesheet";
import ProfileView from "../../ProfileView";

function StoreItem(props){
    return (
        <View style={styles.flexContainer}>
            <View style={styles.cellfixed}>
                <Image source={props.imgsrc} style={{width:60,height:60,marginLeft:10}}/>
            </View>
            <View style={styles.cell}>
                <View style={{flex:1,justifyContent: 'center'}}>
                    <Text>{props.tittle}</Text>
                </View>
                <View style={{flex:1,justifyContent: 'center'}}>
                    <Text style={{fontSize:10}}>{props.des}</Text>
                </View>
                <View style={{flex:1,justifyContent: 'center'}}>
                    <Text style={{fontSize:10}}>{props.actity}</Text>
                </View>
            </View>
        </View>
    )
}
function infoLoad() {
    return require('../../img/suolv.jpg');
}

function iconLoad() {
    return require('../../img/dog.jpg');
}
function IconItem(props){
    return(
        <TouchableOpacity style={styles.icon} onPress={()=>props.onMore()}>
        <View style={styles.icon}>
            <Image source={props.imgsrc} style={{width:30,height:30}}/>
                <Text style={styles.iconText}>
                    {props.name}
                </Text>
        </View>
        </TouchableOpacity>
    )
}
export default class FryScreen extends Component {

    static navigationOptions = {
        tittle:"首页",
        tabBarLabel: '首页',
        tabBarIcon:()=>(
            <Image
                source={circleImage}
                style={{width: 30, height: 30}}
            />
        ),
    };



    onMore(obj){
        if(obj=='list'){
            return this.props.navigation.navigate('IndexDetail');
        }
    }
    render() {
        return (
            <View style={styles.allcontainer}>
                <ScrollView>
              <View style={styles.container}>
                <Swiper
                    style={styles.swiper}
                    height={200}
                    horizontal={true}
                    paginationStyle={{bottom: 10}}
                    showsButtons={false}
                    autoplay={true}
                    >
                    <Image source={require('../../img/001.jpg')} style={styles.img}/>
                    <Image source={require('../../img/002.jpg')} style={styles.img}/>
                    <Image source={require('../../img/001.jpg')} style={styles.img}/>
                </Swiper>
                </View>
                <View style={{height:120}}>
                    <View style={{flex: 1, flexDirection: 'row',height:0}}>
                        <IconItem name="美食" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="酒店住宿" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="休闲娱乐" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="KTV" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="丽人" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <IconItem name="美发" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="汽车美容" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="超市" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="生活服务" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                        <IconItem name="学习培训" imgsrc={iconLoad()} onMore={() => this.onMore('list')}/>
                    </View>
                </View>
                <View style={{marginTop:10,backgroundColor:'#fff'}}>
                    <View style={{height:40}}>
                        <View style={styles.flexCenter}>
                            <Text>
                                热门推荐
                            </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor:'#fff'}}>
                        <StoreItem imgsrc={infoLoad()} tittle={"家园东北烧烤"} des={"人均¥50"} actity={"满500减60；满200减20"}/>
                        <StoreItem imgsrc={infoLoad()} tittle={"家园西南烧烤"} des={"人均¥60"} actity={"满500减60；满200减20"}/>
                        <StoreItem imgsrc={infoLoad()} tittle={"家园西北烧烤"} des={"人均¥70"} actity={"满500减60；满200减20"}/>
                        <StoreItem imgsrc={infoLoad()} tittle={"家园南北烧烤"} des={"人均¥80"} actity={"满500减60；满200减20"}/>
                        <StoreItem imgsrc={infoLoad()} tittle={"家园东南烧烤"} des={"人均¥90"} actity={"满500减60；满200减20"}/>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}


