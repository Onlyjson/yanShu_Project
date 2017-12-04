/*
*npm install --save react-native-popup-dialog
*
*/
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {List,Button,Modal,Toast,DatePicker } from 'antd-mobile';
const Item = List.Item;
const prompt = Modal.prompt;
import PopupDialog, { DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
import CircleBox from '../common/MyCheckBox';

export default class App extends React.Component {
    date1MinDate = new Date('1900-01-01');
    date1MaxDate: any;
    static navigationOptions=({navigation})=>({
        headerTintColor: "#333",
    headerStyle:{
        backgroundColor:'#fff'
    },
    headerTitle:'个人资料',
    headerTitleStyle:{
        fontSize:18,
        color:'#333'
    },
    //消除黑线
    headerStyle: {
        backgroundColor:'#fff',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0
    },
})

    state = {
        avatarSource: null,
        nikName:null,
        shengRi:null,
        xingBie:null,
        flag:null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.bgView}>
                        <Item  extra={
                            <View>
                                { this.state.avatarSource === null ? <Text style={styles.itemText1}>上传</Text> :
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                }
                            </View>}
                            onClick={()=>this.selectPhotoTapped()} >
                            <Text style={styles.itemText}>头像</Text>
                        </Item>
                    </View>

                    <Item extra={
                        <View>
                            { this.state.nikName === null ? <Text style={styles.itemText1}>编辑</Text> :
                                <Text style={styles.itemText1}>{this.state.nikName}</Text>
                            }
                        </View>}
                        arrow="horizontal" onClick={() => prompt('输入名字', '请编辑你的名字',
                        [
                            { text: '取消' },
                            {
                                text: '确认',
                                onPress: value => this.selectName(value),
                            },
                        ], 'default', null, ['输入名字'])} >
                        <Text style={styles.itemText}>姓名</Text>
                    </Item>

                    <DatePicker
                    mode="date"
                    value={this.state.shengRi}
                    onChange={shengRi => this.setState({ shengRi })}
                    minDate={this.date1MinDate}
                    maxDate={this.date1MaxDate}
                    extra={
                        <View>
                            { this.state.shengRi === null ? <Text style={styles.itemText1}>请选择</Text> :
                                <Text style={styles.itemText}>{new Date(this.state.shengRi)}</Text>
                            }
                        </View>
                    }>
                    <Item arrow="horizontal" >
                        <Text style={styles.itemText}>生日</Text>
                    </Item>
                </DatePicker>

                    <Item extra={
                        <View>
                            { this.state.xingBie === null ? <Text style={styles.itemText1}>请选择</Text> :
                                <Text style={styles.itemText1}>{this.state.xingBie}</Text>
                            }
                        </View>}
                        arrow="horizontal" onClick={()=>this.popupDialog.show()} >
                        <Text style={styles.itemText}>性别</Text>
                    </Item>

                    <PopupDialog
                        dialogTitle={<DialogTitle title="性别选择" />}
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogAnimation={slideAnimation}
                        width={240}
                        height={170}
                    >
                        <View style={{marginTop:20,alignItems:'center',flexDirection:'row',justifyContent:'space-around'}}>
                            <CircleBox id={1} onCheck={this._check_callback}
                                 checked={this.state.flag ===1}
                            />
                            <Text style={styles.itemText2}>男</Text>
                        </View>

                        <View style={{height:1,backgroundColor:'#f5f5f5',marginTop:15}}/>

                        <View style={{marginTop:18,alignItems:'center',flexDirection:'row',justifyContent:'space-around'}}>
                            <CircleBox id={2} onCheck={this._check_callback}
                                checked={this.state.flag ===2}
                            />
                            <Text style={styles.itemText2}>女</Text>
                        </View>

                    </PopupDialog>

                </ScrollView>

            </View>
        );
    }

    //性别
    _check_callback=(obj)=>{
        this.popupDialog.dismiss()
        this.setState({
            flag:obj
        });
        if (obj ===1){
            this.setState({
                xingBie:'男'
            })
            return;
        }
        this.setState({
            xingBie:'女'
        })
    }



    //名字选择
    selectName(value){
        this.setState({
            nikName:value
        })
        console.log('value',value)
    }

    //this.popupDialog.show();
    //this.popupDialog.dismiss();

    //头像选择
    selectPhotoTapped() {
        // 底部弹出框文字
        const options = {
            title: '选择照片',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }



}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    avatar: {
        borderRadius:17,
        width:35,
        height:35,
    },
    itemText:{
        color:'#333',
        fontSize:17,
        marginLeft:10
    },
    itemText1:{
        color:'#888',
        fontSize:17,
        marginLeft:10
    },
    itemText2:{
        color:'#888',
        fontSize:20,
    },
    bgView:{
        marginTop:20,
    },

});

