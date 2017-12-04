/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/9 上午11:08
 */

import React from 'react';
import { Image, View } from 'react-native';

//无数据
export const NullPage = () =>  {
    return (
        <View style={{alignItems:'center',paddingTop:160,flex:1}}>
            <Image source={require('../image/buchong/nodata.png')} style={{width:140,height:140}} />
        </View>
    );
}

//无网
export const NoNetPage = () =>  {
    return (
        <View style={{alignItems:'center',paddingTop:160,flex:1}}>
            <Image source={require('../image/buchong/nodata.png')} style={{width:140,height:140}} />
        </View>
    );
}

