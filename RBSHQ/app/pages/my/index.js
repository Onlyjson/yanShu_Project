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
    ImageBackground,
    Image,
    Dimensions,
    PixelRatio
} from 'react-native';

function isMargin(val){
    if(val=="客服中心"||val=="设置"){
        return 15
    }
    else{
        return 0
    }
}
function ListItem(props) {

    return(<View style={[{height:44,backgroundColor:"#fff",flexDirection:"row",marginTop:isMargin(props.tittle)},props.torb]}>
        <View style={[{width:44,height:44},styles.center]}>
            <Image source={props.loadIcon} style={{width:14,height:13.5}}/>
        </View>
        <View style={{flex:1,justifyContent:"center"}}>
            <Text>{props.tittle}</Text>
        </View>
    </View>)
}

function loadIcon(val){
    if(val=="收藏"){
        return require("../../img/collect.png");
    }if(val=="优惠"){
        return require("../../img/coupon.png");
    }if(val=="会员"){
        return require("../../img/vip.png");
    }if(val=="客服"){
        return require("../../img/telephone.png");
    }if(val=="商务"){
        return require("../../img/cooperation.png");
    }if(val=="关于"){
        return require("../../img/about_us.png");
    }if(val=="设置"){
        return require("../../img/site.png");
    }
}
export default class MY_PAGE extends Component {

    render() {
        return (
           <View>
                <View style={{height:139,backgroundColor:"#1aa0f7",position:'relative'}}>

                    <View style={[{height:68,backgroundColor:"#fff",position:"absolute",top:81,width:Dimensions.get('window').width},styles.center]}>
                        <Text style={{marginTop:9,fontSize:13,color:'#333'}}>逆风如解意</Text>
                    </View>
                    <ImageBackground style={{position:"absolute",top:34.5,left:Dimensions.get('window').width/2,width:71,marginLeft:-35.5,height:71,overflow:'hidden',borderRadius:71,backgroundColor:"pink"}}>

                    </ImageBackground>
                    <Image source={require("../../img/Female.png")} style={{width:16,height:16,position:'absolute',left:Dimensions.get('window').width/2+15,bottom:31}}/>
                </View>
               <ListItem tittle="我的收藏" loadIcon={loadIcon("收藏")} torb={styles.borderTop}></ListItem>
               <ListItem tittle="我的优惠券" loadIcon={loadIcon("优惠")} torb={styles.borderTop}></ListItem>
               <ListItem tittle="会员中心" loadIcon={loadIcon("会员")} torb={styles.borderTop}></ListItem>
               <ListItem tittle="客服中心" loadIcon={loadIcon("客服")} torb={styles.borderBottom}></ListItem>
               <ListItem tittle="商务合作" loadIcon={loadIcon("商务")} torb={styles.borderBottom}></ListItem>
               <ListItem tittle="关于" loadIcon={loadIcon("关于")}></ListItem>
               <ListItem tittle="设置" loadIcon={loadIcon("设置")} torb={styles.borderBottom}></ListItem>
               <View style={{height:600,backgroundColor:"#fff"}}>

               </View>
           </View>

        );
    }
}

const styles = StyleSheet.create({
    borderTop:{
        borderTopWidth:1,borderTopColor:"#f1f1f1"
    },
    borderBottom:{
        borderBottomWidth:1,borderBottomColor:"#f1f1f1"
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
});

