






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
    // ImageBackground,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
let dim = Dimensions.get('window');


export default class Mine extends Component {
    goHuanbang(){
        this.props.navigation.navigate('Huanbang');
    }
    goPassword() {
        this.props.navigation.navigate('Change');
    }
    goSignup(){
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>this.goHuanbang()}>
                    <View style={{backgroundColor:"#fff",marginTop:10}}>
                        <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                            <View style={{width:100,marginLeft:15}}>
                                <Text style={{textAlign:'left'}}>
                                    头像
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{marginRight:15}}>
                                <View style={[styles.center,{width:40,marginLeft:0,height:40,overflow:'hidden',borderRadius:40,backgroundColor:"pink"}]}>
                                    <Image style={{width:40,height:40,backgroundColor:'pink'}}></Image>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goHuanbang()}>
                    <View style={{backgroundColor:"#fff"}}>
                        <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                            <View style={{width:100,marginLeft:15}}>
                                <Text style={{textAlign:'left'}}>
                                    昵称
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{marginRight:15}}>
                                <Text>
                                    逆风如解意
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goHuanbang()}>
                    <View style={{backgroundColor:"#fff"}}>
                        <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                            <View style={{width:100,marginLeft:15}}>
                                <Text style={{textAlign:'left'}}>
                                    生日
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{marginRight:15}}>
                                <Text>
                                    未设置
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.goHuanbang()}>
                    <View style={{backgroundColor:"#fff"}}>
                        <View style={[{backgroundColor:"#fff",height:50,borderBottomWidth:1,borderBottomColor:'#f1f1f1'},styles.row,styles.center]}>
                            <View style={{width:100,marginLeft:15}}>
                                <Text style={{textAlign:'left'}}>
                                    性别
                                </Text>
                            </View>
                            <View style={{flex:1}}>
                            </View>
                            <View style={{marginRight:15}}>
                                <Text>
                                    未设置
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>



            </View>

        );
    }
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    borderTop:{
        borderTopWidth:1,borderTopColor:"#f1f1f1"
    },
    borderBottom:{
        borderBottomWidth:1,borderBottomColor:"#f1f1f1"
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
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





