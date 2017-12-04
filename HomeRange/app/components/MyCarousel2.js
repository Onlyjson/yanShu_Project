/**
 * @author: zhangyh-k@glondon.com
 * @description:首页轮播图
 * @Date: 2017/10/1 下午7:42
 */
import React from 'react';
import { TouchableOpacity , Image , StyleSheet,View } from 'react-native';
import { Carousel } from 'antd-mobile';

const styles = StyleSheet.create({
    topImg:{
        width:global.SCREEN_WIDTH,
        height:188
    },
    dotStyle:{
        backgroundColor:'white'
    },
    dotActiveStyle:{
        width:8,
        backgroundColor:'red'
    }
});

const MyCarousel = (props) =>  {
    const { onPress,data } = props;
    console.log(data)
    if(data!=undefined) {
        if (data.length == 1) {
            return (
                <Carousel
                    autoplayTimeout={2}
                    autoplay
                    infinite
                    dotStyle={styles.dotStyle}
                    dotActiveStyle={styles.dotActiveStyle}
                >
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[0].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                </Carousel>
            );
        }
        if(data.length==2){
            return (
                <Carousel
                    autoplayTimeout={2}
                    autoplay
                    infinite
                    dotStyle={styles.dotStyle}
                    dotActiveStyle={styles.dotActiveStyle}
                >
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[0].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[1].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                </Carousel>
            );
        }
        if(data.length==3){
            return (
                <Carousel
                    autoplayTimeout={2}
                    autoplay
                    infinite
                    dotStyle={styles.dotStyle}
                    dotActiveStyle={styles.dotActiveStyle}
                >
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[0].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[1].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[2].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                </Carousel>
            );
        }
        if(data.length==4){
            return (
                <Carousel
                    autoplayTimeout={2}
                    autoplay
                    infinite
                    dotStyle={styles.dotStyle}
                    dotActiveStyle={styles.dotActiveStyle}
                >
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[0].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[1].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[2].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={{uri: `http://39.108.139.245:9001/${data[3].mid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                </Carousel>
            );
        }
    }

    return (
        <Carousel
            autoplayTimeout={2}
            autoplay
            infinite
            dotStyle={styles.dotStyle}
            dotActiveStyle={styles.dotActiveStyle}
        >
            <TouchableOpacity  onPress={ () => onPress(1)} >
                <Image source={require('../image/buchong/picture@2x.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={ () => onPress(2)} >
                <Image source={require('../image/buchong/picture@2x.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={ () => onPress(3)} >
                <Image source={require('../image/buchong/picture@2x.png')} style={styles.topImg} />
            </TouchableOpacity>

            <TouchableOpacity  onPress={ () => onPress(4)} >
                <Image source={require('../image/buchong/picture@2x.png')} style={styles.topImg} />
            </TouchableOpacity>
        </Carousel>
    );
}


export default MyCarousel





