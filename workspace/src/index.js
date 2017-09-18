
import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import ProfileView from "./ProfileView";

const circleImage = require("./circle.png");

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
                <Text >
                    我的
                </Text>

                {/*<ProfileView name="啦啦啦你瞅啥"*/}
                             {/*imageUrl="https://www.walldevil.com/wallpapers/a89/fry-philip-j.-fry-futurama.jpg"*/}
                             {/*onMore={() => this.onMore()}/>*/}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
