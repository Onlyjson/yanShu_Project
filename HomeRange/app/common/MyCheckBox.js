/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/11/16 下午4:27
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

export default class MyCheckBox extends Component {
    state = {
        bgc:'#1aa0f7',
    };

    render() {
        let color = this.props.checked?this.state.bgc:"#fff";
        return (
            <View style={{justifyContent:'center',alignItems:"center"}}>

                <TouchableOpacity
                    onPress={()=>this._pressedBox()}
                    style={{backgroundColor:color,width:24,height:24,
                        borderRadius:12,borderColor:"#d9d9d9",borderWidth:1
                    }}
                >
                </TouchableOpacity>
            </View>
        );
    }

    _pressedBox(){
        let {id,onCheck} = this.props;
        onCheck(id);
    }

}





