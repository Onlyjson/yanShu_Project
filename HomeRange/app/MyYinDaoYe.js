
import React, { Component } from 'react';
import { Text,StyleSheet,View, Image,Alert,Dimensions } from 'react-native';
import AppIntro from 'react-native-app-intro';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        //padding: 15,
    },
});

export default class Gank extends Component {
    static navigationOptions=({navigation,screenProps})=>({
        header:null
    })
    render() {
        return (
            <AppIntro
                // onNextBtnClick={this.nextBtnHandle}
                onDoneBtnClick={this.doneBtnHandle}
                onSkipBtnClick={this.onSkipBtnHandle}
                doneBtnLabel={'完成'}
                skipBtnLabel={'跳过'}
            >
                <View style={[styles.slide,{ backgroundColor: 'transparent' }]}>
                    <Image source={require('./image/yindaoye/1@2x.png')} style={{height:height,width:width}} />
                </View>

                <View style={[styles.slide, { backgroundColor: 'transparent' }]}>
                    <Image source={require('./image/yindaoye/2@2x.png')} style={{height:height,width:width}} />
                </View>

                <View style={[styles.slide,{ backgroundColor: 'transparent' }]}>
                    <Image source={require('./image/yindaoye/3@2x.png')} style={{height:height,width:width}} />
                </View>

            </AppIntro>
        );
    }

    onSkipBtnHandle = (index) => {
        const { navigate } = this.props.navigation
        navigate('Login')
    }
    doneBtnHandle = () => {
        const { navigate } = this.props.navigation
        navigate('Login')
    }

    nextBtnHandle = (index) => {
        Alert.alert('Next');
        console.log(index);
    }
}