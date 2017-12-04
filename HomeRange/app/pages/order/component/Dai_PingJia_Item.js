/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 下午1:25
 */
import React from 'react';
import { View ,Text,TouchableOpacity,Image ,StyleSheet } from 'react-native';
export default Wait_Order_Item = (props) =>  {
    const {rowData,onPress,buttonOneClick} = props;

    return (
        <TouchableOpacity style={styles.container} onPress={()=>onPress()}>

            <View style={styles.wrap}>
                <View style={styles.left}>
                    <Image source={require('../../../image/buchong/cry.png')} style={styles.image1}/>
                </View>
                <View style={styles.centent}>
                    <Text style={styles.text1}>{rowData.shopinfo.shopname}</Text>
                    <Text numberOfLines={1} style={styles.text2}>下单时间:{rowData.create_time}</Text>
                    <Text numberOfLines={1} style={styles.text3}>实付:￥{rowData.payprice}</Text>
                </View>
                <View style={styles.right}>
                    <View style={styles.button1}>
                        <Text style={styles.text5} onPress={(rowData)=>buttonOneClick(rowData)}>评价</Text>
                    </View>
                </View>
            </View>

            <View style={styles.hairline}/>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        height:80,
        flexDirection:'row',
        alignItems:'center',
    },
    left:{
        width: 80,
        marginTop:20
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
        marginTop:14
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
    text4:{
        fontSize:12,
        color:'#1799f6',
    },
    text5:{
        fontSize:15,
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
    button1:{
        marginRight:20,
        alignItems:'center',
        justifyContent:'center',
        width: 70,
        height: 26,
        borderRadius: 3,
        borderWidth:1,
        borderColor: '#f67017',
    },
});


