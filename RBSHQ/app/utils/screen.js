/**
 * Created by ztb-libin on 2017/9/26.
 * 工具  获取屏幕的长和宽
 */

import { Dimensions } from 'react-native'
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
export {width, height};