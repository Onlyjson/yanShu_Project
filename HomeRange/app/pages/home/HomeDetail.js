/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/9/30 下午5:31
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import headerText from '../../common/HeaderRightStyle';
export default class Gank extends Component {

    static navigationOptions=({navigation})=>({
        //header : null,
        headerTitle:'详情',
        headerTitleStyle:{
            color:'white',
            fontSize:20
        },
        headerRight:
            <Text style={headerText.text} onPress={() => navigation.state.params.handleSave()}>    清空    </Text>,
        headerStyle:{
            backgroundColor:'#1aa0f7'
        }
    })

    state = {
        isLoading:false,
        animating:true,
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this._clear.bind(this) })
    }

    _clear(){
       alert(111)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Gank!
                </Text>
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




