/**
 * @author: zhangyh-k@glondon.com
 * @description:
 * @Date: 2017/10/29 下午4:50
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';
import { Toast , ActivityIndicator }  from 'antd-mobile';
import config from '../../../utils/Config'//接口配置
import { netRequest } from '../../../utils/FetchRequest'//网络请求方法
import { NullPage , NoNetPage }from '../../../components/NullPage'
import { NavigationActions } from 'react-navigation';

export default class PingJia extends Component {

    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            });
            return jsonValue;
        });
    }

    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
        headerStyle:{
            backgroundColor:'#fff'
        },
        headerTitle:'评价',
        headerTitleStyle:{
            fontSize:18,
            color:'#333'
        },
        headerBackTitleStyle:{
            color:'#333'
        }
    })

    constructor(props) {
        super(props);
        this.state = {
            starCount: 1,
            text:'',
            orderID:this.props.navigation.state.params.id,
            animating:false,
        };
    }

    componentDidMount(){

    }

    render() {
        const { text, animating }  = this.state
        let num = text?text.length:0
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content"/>

                <View style={styles.hairLine}></View>
                <KeyboardAwareScrollView>
                    <View style={styles.startView}>
                        <Text style={styles.text1}>满意度评价</Text>
                        <StarRating
                            disabled={false}
                            emptyStar={require('../../../image/youhuiquan/Starrating2.png')}
                            fullStar={require('../../../image/youhuiquan/Starrating.png')}
                            maxStars={5}
                            starSize={20}
                            starStyle={{margin:5}}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                    </View>

                    <TextInput
                        style={styles.textInputStyle}
                        multiline={true}
                        maxLength={2000}
                        clearButtonMode="while-editing"
                        value={text}
                        placeholder="说说你的看法吧"
                        placeholderTextColor='rgba(0,0,0,0.2)'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({text})}
                    />

                    <View style={{alignItems:'flex-end',paddingRight:10}}>
                        <Text style={styles.text9}>已输入<Text style={styles.text9}>{num}</Text>/2000个字</Text>
                    </View>

                    <ActivityIndicator
                        toast
                        size='large'
                        text='提交中...'
                        animating={animating}
                    />

                    <TouchableOpacity style={styles.btn} onPress={this._tiJiao}>
                        <Text style={styles.text_white}>提交</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _tiJiao=()=>{

        this.get('userInfo').then(()=>{
            this.setState({ animating:true })
            console.log('userid',this.state.userInfo.id)
            netRequest(
                config.api.base + config.api.add,
                {
                    orderid:this.props.navigation.state.params.id,
                    userid: this.state.userInfo.id,
                    sign: '1',//
                    level:this.state.starCount,
                    content:this.state.text,
                },
                (data)=>{
                    console.log('返回的数据为data---',data)
                    if (data.code=='1'){
                        this.setState({animating:false});
                        if(this.props.navigation.state.params.return_data=="1"){
                            this.props.navigation.state.params.isfinish()
                            this.props.navigation.goBack()
                            // const { dispatch }=this.props.navigation
                            // const myGuide = NavigationActions.reset({
                            //     index: 0,
                            //     actions: [
                            //         NavigationActions.navigate({ routeName: 'MyTab'})
                            //     ]
                            // });
                            // dispatch(myGuide);
                            // this.props.navigation.navigate('Pjsucess');
                            // this.props.navigation.navigate('Order');
                            // this.props.navigation.navigate('Pjsucess',{orderID:this.props.navigation.state.params.id});
                        }else {
                            this.props.navigation.state.params.return_data()
                            this.props.navigation.goBack()
                        }
                        //this.props.navigation.navigate('Pjsucess');
                    }

                },
                (err)=>{
                    this.setState({ animating:false });
                    // console.error(err)
                    Toast.info('请求数据失败',1)
                },
                ()=> {
                    this.setState({ animating:false });
                    Toast.offline('当前网络不可用')
                }
            )
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    hairLine:{
        height:1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    startView:{
        flexDirection:'row',
        alignItems:'center',
        height:40,
        margin:10
    },
    text1:{
        color:'#333',
        fontSize:15,
        marginRight:20
    },
    textInputStyle:{
        marginTop: 15,
        height:200,
        paddingHorizontal:4,
        marginHorizontal:10,
        backgroundColor:'rgba(0,0,0,0.1)',
        borderRadius:5,
        textAlignVertical:'top',
        color:'#888888',
        fontSize:15,
    },
    text9:{
        fontSize:12,
        color:'#999999',
        lineHeight:24,
        paddingHorizontal:15
    },
    btn:{
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
        backgroundColor: '#1aa0f7',
        height: 40,
        width:250,
        borderRadius:20,
        marginHorizontal:(global.SCREEN_WIDTH-250)/2
    },
    text_white:{
        fontSize:16,
        color:'white',
        height:24,
        //paddingHorizontal:15,
        textAlignVertical:'center',
        textAlign:'center',
        paddingTop:3
    }
});




