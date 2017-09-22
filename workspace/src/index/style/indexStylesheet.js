import {
    Dimensions,
} from 'react-native';


export default styles1 = {

    allcontainer:{
        width:Dimensions.get('window').width
    },
    container:{
        backgroundColor:"#fff",
        height:200,
        width:Dimensions.get('window').width
    },
    swiper: {},
    img: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    iconline:{

    },
    icon:{
        flex:1, height: 60, backgroundColor: '#fff',justifyContent: 'center',
        alignItems: 'center'
    },
    iconText:{
        fontSize:12,marginTop:5
    },
    flexCenter:{
        height:40,
        width:Dimensions.get('window').width,
        flex:1, backgroundColor: '#fff',justifyContent: 'center',
        alignItems: 'center'
    },
    flexContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        marginTop:10
    },
    cell: {
        flex: 1,
        height: 60
    },
    cellfixed: {
        height: 60,
        width: 80,
        backgroundColor: '#fefefe'
    }
}