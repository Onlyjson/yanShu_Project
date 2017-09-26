/**
 * Created by ztb-libin on 2017/9/26.
 * 首页样式
 */


import { StyleSheet } from 'react-native';
import { width } from '../../utils/screen'
import color from '../../utils/color'
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
export default styles
