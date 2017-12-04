/**
 * desc：启动页
 * author：李焱舒
 * date： 2017-11-24
 */
import React, {PropTypes, Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    Dimensions
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
const { width, height } = Dimensions.get('window');
export default class FirstPage extends React.Component {

    static navigationOptions = ({navigation}) => ({
        header:null
    });

    constructor(props) {
        super(props);
        this.state={
        }
    }

    // 保存
    async save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                firstSign:jsonValue
            })
            return jsonValue;
        });
    }
    // 获取
    async getLogininfo(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            });
            return jsonValue;
        });
    }

    componentDidMount() {
        SplashScreen.hide();//关闭启动屏幕
        this.get("firstSign").then(()=>this.wheretogo())
    }

    wheretogo(){

        const { dispatch }=this.props.navigation
        const myGuide = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: '引导页'})
            ]
        });
        const Home = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'MyTab'})
            ]
        });
        const Login = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'})
            ]
        });
        if(this.state.firstSign!=null){
            if(this.state.firstSign.val=="true"){
                this.getLogininfo("userInfo").then(()=>{

                    if(this.state.userInfo==null){
                        dispatch(Login)
                    }else {
                        dispatch(Home)
                    }
                });
            }
        }else {
            this.save("firstSign",{val:'true'})
            dispatch(myGuide)
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>

            </View>
        );
    }
}

const styles = StyleSheet.create({});
