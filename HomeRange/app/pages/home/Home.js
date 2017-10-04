/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/9/30 下午1:55
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class Home extends Component {
    goList(){
        this.props.navigation.navigate('MerchantList');
    }
    render() {
        return (
            <TouchableOpacity onPress={()=>this.goList()}>
                <View>
                    <Text>
                        dfff
                    </Text>
                </View>
            </TouchableOpacity>
            // <TouchableOpacity onPress={()=>this.goList()}>
            //     <View style={styles.container}>
            //         <Text style={styles.welcome}>
            //             Welcome to Home!
            //         </Text>
            //     </View>
            // </TouchableOpacity>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});




