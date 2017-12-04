
import React from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, Image,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import AppIntroSlider from 'react-native-app-intro-slider';

//require('../image/yindaoye/3@2x.png')
const slides = [
    {
        key: 'somethun',
        image: require('../app/image/yindaoye/1@2x.png'),
    },
    {
        key: 'somethun1',
        image: require('../app/image/yindaoye/2@2x.png')
    },
    {
        key: 'somethun2',
        image: require('../app/image/yindaoye/3@2x.png')
    },
];

export default class YinDaoYe extends React.Component {
    static navigationOptions=({navigation,screenProps})=>({
        header:null
    })

    _renderItem = props => (
        <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
            <Image source={props.image} style={styles.image}/>
        </View>
    );

    render() {
        return (
            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                bottomButton={false}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                onDone={this._onDone}
            />
        );
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image style={{height:16,width:20}}
                    source={require('../app/image/yindaoye/iconRight@2x.png')} />
            </View>
        );
    }

    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Image style={{height:15,width:20}}  source={require('../app/image/yindaoye/iconDui@2x.png')}/>
            </View>
        );
    }

    _onDone = () => {
        const { navigate }=this.props.navigation
        navigate('Login')
        // User finished the introduction. Show "real" app
    }

}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'space-around',
    },
    image: {
        width: width,
        height: height,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});