/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';



import Allachievement  from './component/achievement_all'
import Bestachievement  from './component/achievement_best'
import Middleachievement  from './component/achievement_middle'
import Lowachievement  from './component/achievement_low'

import { Tabs , ActivityIndicator }  from 'antd-mobile'
//const TabPane = Tabs.TabPane
const tabs2 = [
    { title: '全部', sub: '1' },
    { title: '好评', sub: '2' },
    { title: '中评', sub: '3' },
    { title: '差评', sub: '4' },
];
export default class HeiMingDan extends Component {
    state = {
        key:'1',
        animating:true
    };

    componentDidMount() {

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
    });
    render() {
        let tab1=3,tab2=3,tab3=0,tab4=0;
        return (
            <View style={[styles.container,{marginTop:10}]}>
                <StatusBar barStyle="dark-content"/>

                <Tabs tabs={tabs2}
                    initialPage={0}
                    //tabBarPosition="bottom"
                    renderTab={tab => <Text>{tab.title}</Text>}
                >
                    <Allachievement
                        navigation={this.props.navigation}
                        id={this.props.navigation.state.params.id}
                    />

                    <Bestachievement
                        navigation={this.props.navigation}
                        id={this.props.navigation.state.params.id}
                    />
                    <Middleachievement
                        navigation={this.props.navigation}
                        id={this.props.navigation.state.params.id}
                    />

                    <Lowachievement
                        navigation={this.props.navigation}
                        id={this.props.navigation.state.params.id}
                    />

                </Tabs>

                {/*<Tabs*/}
                    {/*activeKey={this.state.key}*/}
                    {/*defaultActiveKey='1'*/}
                    {/*onChange={(key)=> this.setState ({ key })}*/}
                    {/*animated={true}*/}
                    {/*textColor='#999999'*/}
                    {/*activeTextColor='#1aa0f7'*/}
                    {/*activeUnderlineColor='#1aa0f7'*/}
                {/*>*/}
                    {/*<TabPane tab={"全部"} key="1">*/}
                        {/*<Allachievement*/}
                            {/*navigation={this.props.navigation}*/}
                            {/*id={this.props.navigation.state.params.id}*/}
                        {/*/>*/}
                    {/*</TabPane>*/}

                    {/*<TabPane tab={"好评"} key="2">*/}
                        {/*<Bestachievement*/}
                            {/*navigation={this.props.navigation}*/}
                            {/*id={this.props.navigation.state.params.id}*/}
                        {/*/>*/}
                    {/*</TabPane>*/}

                    {/*<TabPane tab={"中评"} key="3">*/}
                        {/*<Middleachievement*/}
                            {/*navigation={this.props.navigation}*/}
                            {/*id={this.props.navigation.state.params.id}*/}
                        {/*/>*/}
                    {/*</TabPane>*/}

                    {/*<TabPane tab={"差评"} key="4">*/}
                        {/*<Lowachievement*/}
                            {/*navigation={this.props.navigation}*/}
                            {/*id={this.props.navigation.state.params.id}*/}
                        {/*/>*/}
                    {/*</TabPane>*/}
                {/*</Tabs>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});