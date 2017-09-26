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
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import MyCarousel from './cell/MyCarousel'
import MyGrid from './cell/MyGrid'
import gridData from './gridData';

export default class HOME_PAGE extends Component {
    render() {
        return (
            <ScrollView style={{flex:1}}>

                <MyCarousel
                    onPress={ (index) => alert(index) }
                />

                <MyGrid
                    data={gridData}
                    onPress={(title) => this.onPress(title) }
                />

            </ScrollView>
        );
    }






    onPress(title){
        const { navigate } = this.props.navigation;
        alert(title)
        // switch (title) {
        //     case '地主推荐':
        //         break;
        //     case '早点小吃':
        //         break;
        //     case '外卖':
        //         break;
        //     case '烧烤火锅':
        //         break;
        //     case '自助餐':
        //         break;
        //     case '餐厅':
        //         break;
        //     case '统计分析':
        //         break;
        //     default :
        //         break;
        // }

    }
}
