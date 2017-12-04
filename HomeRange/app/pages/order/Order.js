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
    TouchableOpacity
} from 'react-native';

import { Tabs , ActivityIndicator }  from 'antd-mobile'
import AllOrder  from './component/All_Order'
import DaiPingJia  from './component/Dai_PingJia'

//const TabPane = Tabs.TabPane
const tabs2 = [
    { title: '全部', sub: '1' },
    { title: '待评价', sub: '2' },
];

export default class HeiMingDan extends Component {

    static navigationOptions=({navigation})=>({
        headerTitle:'订单',
        headerTitleStyle:{
            fontSize:18,
            color:'white'
        },
    })

    state = {
        key:'1',
        animating:false
    };

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.container}>



                <Tabs tabs={tabs2}
                    initialPage={0}
                    //tabBarPosition="bottom"
                    renderTab={tab => <Text>{tab.title}</Text>}
                >
                    <AllOrder
                        navigation={this.props.navigation}
                    />

                    <DaiPingJia
                        navigation={this.props.navigation}
                    />
                </Tabs>




                {/*<Tabs*/}
                    {/*activeKey={this.state.key}*/}
                    {/*defaultActiveKey='1'*/}
                    {/*onChange={(key)=> this.setState ({ key })}*/}
                    {/*animated={true}*/}
                    {/*textColor='#999999'*/}
                    {/*// style={borderWidth:1}*/}
                    {/*activeTextColor='#1aa0f7'*/}
                    {/*activeUn='#1aa0f7'*/}
                {/*>*/}
                    {/*<TabPane tab="全部" key="1">*/}
                        {/*<AllOrder*/}
                            {/*navigation={this.props.navigation}*/}
                        {/*/>*/}
                    {/*</TabPane>*/}

                    {/*<TabPane tab="待评价" key="2">*/}
                        {/*<DaiPingJia*/}
                            {/*navigation={this.props.navigation}*/}
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