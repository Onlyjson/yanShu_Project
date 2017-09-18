import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import React, { Component } from 'react';
const styles1 = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        height:200,
        width:Dimensions.get('window').width
    },
    swiper: {},
    img: {
        width: Dimensions.get('window').width,
        height: 200,
    }
});


export default class styles extends styles1 {
}