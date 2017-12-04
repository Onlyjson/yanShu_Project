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
        height:131
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
    const { onPress,ads,navigation } = props;
    console.log(ads)
    if(ads!=null){
        if(ads.length>0) {
            if(ads.length==1){
                return(
                    <TouchableOpacity>
                        <Image source={{uri:`http://39.108.139.245:9001/${ads[0].imgid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                )
            }
            var newArray=[];
            for(let i=0;i<ads.length;i++){
                newArray.push(
                    // alert(ads[i].shopid)
                    <TouchableOpacity key={i} onPress={()=>navigation.navigate('Detail',{id:ads[i].shopid,long:"",lati:""})}>
                        <Image source={{uri:`http://39.108.139.245:9001/${ads[i].imgid}.png`}} style={styles.topImg}/>
                    </TouchableOpacity>
                )
            }
            return (
                <Carousel
                    autoplayTimeout={2}
                    autoplay
                    infinite
                    dotStyle={styles.dotStyle}
                    dotActiveStyle={styles.dotActiveStyle}
                >
                    {newArray}

                </Carousel>
            );
        }else {
            return(
                <TouchableOpacity>
                    <Image source={require('../image/buchong/picture.png')} style={styles.topImg}/>
                </TouchableOpacity>
            )
        }
    }
    else {
        return(
            <View>

            </View>
        )
    }
}


export default MyCarousel





