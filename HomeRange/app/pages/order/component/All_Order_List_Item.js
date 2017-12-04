/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午1:46
 */

import React from 'react';
import { View ,Text,TouchableOpacity,Image ,StyleSheet } from 'react-native';

function RightComponent(props) {
    const {isassess,buttonPingClick,} = props;
    if(isassess==1){
    return(<View style={styles.right}>
        <Image source={require('../../../image/dingdan/complete.png')} style={styles.image2}/>
    </View>)
    }else if(isassess==0){
        return(<View style={styles.right}>
            <Text style={styles.text6}>待评价</Text>
        </View>)
    }else {
        return(<View></View>)
    }
}
function Ddd(props) {
    const {isassess,buttonPingClick,buttonOneClick} = props;
    if(isassess==1){
        return( <View style={[styles.button1]}>
            <Text numberOfLines={1} style={styles.text4} onPress={()=>buttonOneClick()}>再来一单</Text>
        </View>)
    }else if(isassess==0) {
        return(
            <View style={styles.button00}>
                <View style={styles.button11}>
                    <Text numberOfLines={1} style={styles.text4} onPress={()=>buttonOneClick()}>再来一单</Text>
                </View>
                <View style={styles.button22}>
                    <Text numberOfLines={1} style={styles.text4} onPress={()=>buttonPingClick()}>评价</Text>
                </View>
            </View>
        )
    }else {
        return(<View></View>) ;
    }
}
export default All_Order_Item = ({item,onPress,buttonOneClick,buttonPingClick}) =>  {
    console.log(item);
     // const {rowData,onPress,buttonOneClick,buttonPingClick} = props;
    let height="";
    if(item.tittle==2){
         height=80;
    }else {
        height=100;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={()=>onPress()}>
            <View style={[styles.wrap,{height:height}]}>
                <View style={styles.left}>

                    <Image source={require('../../../image/buchong/cry.png')} style={styles.image1}/>
                </View>
                <View style={styles.centent}>
                    <Text style={styles.text1}>{item.shopinfo.shopname}</Text>
                    <Text numberOfLines={1} style={styles.text2}>下单时间:{item.create_time}</Text>
                    <Text numberOfLines={1} style={styles.text3}>实付:￥{item.payprice}</Text>
                </View>
                <RightComponent isassess={item.isassess} buttonPingClick={buttonPingClick}/>
            </View>
            <Ddd isassess={item.isassess} buttonPingClick={buttonPingClick} buttonOneClick={buttonOneClick}/>
            <View style={styles.hairline}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button00:{
        flexDirection:'row',
        marginLeft:80,
    },
    button11:{
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#1799f6',
    },
    button22:{
        marginLeft:36,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#1799f6',
    },
    wrap: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    },
    left:{
        width: 80,
    },
    centent:{
        flex:1,
    },
    right:{
        //width: 80,
    },
    text1:{
        fontSize:16,
        color:'#333333',
        fontWeight:'bold',
    },
    text2:{
        fontSize:11,
        color:'#666666',
        marginLeft:0,
        marginTop:8
    },
    text3:{
        fontSize:12,
        color:'#333',
        marginLeft:0,
        marginTop:5
    },
    button0:{
        flexDirection:'row',
        marginLeft:80,
    },
    text4:{
        fontSize:12,
        color:'#1799f6',
    },
    text5:{
        fontSize:15,
        color:'#f67017',
    },text6:{
        fontSize:15,
        marginRight:20,
        color:'#f67017',
    },
    hairline:{
        marginTop:15,
        height:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    image1:{
        height: 58,
        width: 58,
        marginLeft:10
    },
    image2:{
        height: 61,
        width: 71,
        marginRight:10
    },
    button1:{
        marginLeft:80,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#1799f6',
    },
    button2:{
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#f67017',
    },
    button2_2:{
        marginLeft:36,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#1799f6',
    }
});





