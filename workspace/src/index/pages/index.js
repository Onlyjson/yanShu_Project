
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
} from 'react-native';

const circleImage = require("../../img/circle.png");

import styles from "../style/indexStylesheet";

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



    onMore() {
        this.props.navigation.navigate('IndexDetail');
    }

    render() {
        return (
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

                {/*<ProfileView name="啦啦啦你瞅啥"*/}
                             {/*imageUrl="https://www.walldevil.com/wallpapers/a89/fry-philip-j.-fry-futurama.jpg"*/}
                             {/*onMore={() => this.onMore()}/>*/}

            </View>
        );
    }
}


