/**
 * Created by ztb-libin on 2017/9/26.
 *
 */

import React from 'react';
import { TouchableOpacity , Image , StyleSheet } from 'react-native';
import { Carousel } from 'antd-mobile';
import color from '../../../utils/color'
import { width } from '../../../utils/screen'
const styles = StyleSheet.create({
    topImg:{
        width:width,
        height:131
    },
    dotStyle:{
        backgroundColor:color.white
    },
    dotActiveStyle:{
        width:15,
        backgroundColor:color.theme
    }
});

const MyCarousel = (props) =>  {
    const { onPress } = props;
    return (
        <Carousel
            autoplayTimeout={.5}
            autoplay
            infinite
            dotStyle={styles.dotStyle}
            dotActiveStyle={styles.dotActiveStyle}
        >
            <TouchableOpacity style={{ backgroundColor: 'red' }} onPress={ () => onPress(1)} >
                <Image source={require('../../../img/aaaaa.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity style={ { backgroundColor: 'blue' }} onPress={ () => onPress(2)} >
                <Image source={require('../../../img/aaaaa.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity style={ { backgroundColor: 'yellow' }} onPress={ () => onPress(3)} >
                <Image source={require('../../../img/aaaaa.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity style={ { backgroundColor: 'black' }} onPress={ () => onPress(4)} >
                <Image source={require('../../../img/aaaaa.png')} style={styles.topImg} />
            </TouchableOpacity>

        </Carousel>
    );
}


export default MyCarousel





