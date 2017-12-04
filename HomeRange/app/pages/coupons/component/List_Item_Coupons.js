/**
 * @author: zhangyh-k@glondon.com
 * @description:优惠券item
 * @Date: 2017/10/9 上午10:56
 */

import React from 'react';
import { View ,Text,TouchableOpacity,Image ,StyleSheet } from 'react-native';
export default Coupons_Item = (props) =>  {
    const {rowData,onPress} = props;
    // slice(0, -1)
    return (
        <TouchableOpacity style={styles.container} onPress={()=>onPress()}>

            <View style={styles.container1}>
                <Text numberOfLines={1} style={styles.text1}>{rowData.couponname}</Text>
                <Text numberOfLines={1} style={styles.text2}>￥<Text style={styles.text3}>{rowData.smoney}</Text></Text>

            </View>

            <View style={styles.container2}>
                <Text numberOfLines={1} style={styles.text4}>有效期至{rowData.validityday.slice(0,-10)}</Text>
                <Text numberOfLines={1} style={styles.text5}>满{rowData.fmoney}可用</Text>
            </View>

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        paddingBottom:10,
        marginHorizontal:10,
        backgroundColor: 'white',
    },
    container1: {
        flexDirection:'row',
        height:60,
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'space-between'
    },
    container2: {
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        justifyContent:'space-between'
    },
    text1:{
        fontSize:16,
        color:'#333333'
    },
    text2:{
        fontSize:20,
        color:'#ff6300'
    },
    text3:{
        fontSize:30,
        color:'#ff6300'
    },
    text4:{
        fontSize:12,
        color:'#666666',
    },
    text5:{
        fontSize:12,
        color:'#666666',
    }

});





