/**
 * Created by ztb-libin on 2017/9/26.
 *
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { Grid } from 'antd-mobile';
const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },

    topView: {
        height: 39,
        justifyContent: 'center',
        paddingLeft: 15,

    },
    title: {
        fontSize: 13,
        color: '#333333',
    },

    grid: {
        backgroundColor: 'white',
    },


    cellViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImaeStyle: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    buttonTitleStyle: {
        fontSize: 13,
        color: '#666666',
        margin: 2,
        textAlign: 'center',
        marginTop: 10,
    },
});


const MyGrid = (props) =>  {
    const { data , onPress } =props
    return (
            <View style={styles.grid}>
                <Grid
                    data={data}
                    columnNum={5}
                    hasLine={false}
                    onClick={(el) => {onPress(el.title)}}
                    renderItem={(dataItem, index) => (
                        <View style={styles.cellViewStyle}>
                            <Image source={`${dataItem.image}`} style={styles.buttonImaeStyle}/>
                            <Text style={styles.buttonTitleStyle}>{dataItem.title}</Text>
                        </View>
                    )}
                />
            </View>
    );







}





export default MyGrid



