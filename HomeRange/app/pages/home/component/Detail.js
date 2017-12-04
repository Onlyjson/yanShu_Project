import React, { Component } from "react"
import { StyleSheet, Text, View, Image, Dimensions ,ScrollView,TouchableOpacity,TextInput} from "react-native"
function isLast(obj) {
    if(obj=="true"){
        return 0
    }else{
        return 0.5
    }
}

function HeaderImg({headurl}){
    if(headurl==""){
        return(<Image source={require('../../../image/wode/Avatar.png')} style={{width:37,height:37}}></Image>)
    }
    else{
        return(
            <Image source={{uri:`http://39.108.139.245:9001/${headurl}.png`}} style={{width:37,height:37}}></Image>)
    }
}

function Pingjia({headurl,last,time,tittle,stars,text}) {
    return(<View style={{marginTop:15,flexDirection:"row",marginLeft:15,borderBottomWidth:isLast(last),borderBottomColor:"#000",height:80,position:'relative'}}>
        <View style={[{position:'absolute',right:15,top:0,width:100,height:11},styles.center]}>
            <Text>  {time}</Text>
        </View>
        <View style={{width:37,height:37,overflow:'hidden',borderRadius:37}}>
            <HeaderImg headurl={headurl}/>
        </View>
        <View style={{flex:1,marginLeft:10}}>
            <View style={{width:200,height:14}}>
                <Text style={{fontSize:14,color:"#333"}} numberOfLines={1} ellipsizeMode='tail'>{tittle}</Text>
            </View>
            {stars}
            <View style={{marginTop:18}}>
                <Text>
                    {text}
                </Text>
            </View>
        </View>
    </View>)
}
function IconLeft({color,val}) {
    return(<View style={[styles.center,{width:16,height:16,backgroundColor:color,marginLeft:15}]}>
        <Text style={{color:'#fff',fontSize:13}}>{val}</Text>
    </View>)
}

function Star1({index}) {
    if(index==1){
        return(<View style={[styles.row,{marginTop:9}]}>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }if(index==2){
        return(<View style={[styles.row,{marginTop:9}]}>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(index==3){
        return(<View style={[styles.row,{marginTop:9}]}>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(index==4){
        return(<View style={[styles.row,{marginTop:9}]}>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star_1.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }
    if(index==5){
        return(<View style={[styles.row,{marginTop:9}]}>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:5}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
            <Image source={require('../../../image/xiamgqing/star.png')} style={{width:10.5,height:10,marginLeft:2}}/>
        </View>)
    }else {
        return(<View></View>)
    }
}

const styles = StyleSheet.create({
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    row:{
        flexDirection: 'row'
    }
});
export {Pingjia,Star1,IconLeft};