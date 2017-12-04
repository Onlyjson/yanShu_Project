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
    AsyncStorage,
    // ImageBackground,
    Image,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    StatusBar,
    DeviceEventEmitter
} from 'react-native';
import request from '../../utils/Request'
import config from '../../utils/Config'

import ImagePicker from 'react-native-image-picker';
import {List,Button,Modal,Toast,DatePicker } from 'antd-mobile';
const Item = List.Item;
const prompt = Modal.prompt;
import PopupDialog, { DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
const slideAnimation = new SlideAnimation({slideFrom: 'bottom'});
import CircleBox from '../../common/MyCheckBox';
let dim = Dimensions.get('window');

export default class Mine extends Component {

    date1MinDate = new Date('1900-01-01');
    date1MinDate : any;
    //date1MinDate:{moment('1955-01-01', 'YYYY-MM-DD')};
    //date1MaxDate: any;
    // 获取
    async get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            this.setState({
                userInfo:jsonValue
            })
            return jsonValue;
        });
    }
    // 将要离开页面的时候触发
    componentWillUnmount(){
            DeviceEventEmitter.emit('changeImage', {url:this.state.fileId,nicheng:this.state.nicheng});
    }

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
    })
//名字选择
    selectName(value){
        this.setState({
            nikName:value
        })
        this.settingName(value);
        console.log('value',value)
    }
    //初始化赋值
    constructor(props){
        super(props);
        this.state={
            avatarSource: null,
            nikName:null,
            shengRi:null,
            xingBie:null,
            flag:null,

            videoSource: null,
            nicheng:"",
            birthday:"",
            sex:"",
            headurl:"",
            fileid:"",
        }
    }

    selectPhotoTapped() {
        const options = {
            title:'请选择',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            allowsEditing:true,
            noData:false,
            storageOptions: {
                skipBackup: true,
                path:'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                // console.log('User cancelled photo picker');
            }
            else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log(response.uri);
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    headurl: source
                });
                this.get("userInfo").then(()=>this.uploadImg())
            }
        });
    }
    //初始化赋值
    componentDidMount(){
        this.get('userInfo').then(()=>this.getuser());
    }
    getuser(){
        let body = {
            userid: this.state.userInfo.id,
            sign:"1"
        };
        let url = config.api.base + config.api.getuser;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    this.setState({
                        nikName:data.data.nickname,
                        nicheng:data.data.nickname,
                        // shengRi:data.data.birthday,
                        birthday:data.data.birthday,
                        xingBie:data.data.sex,
                        sex:data.data.sex,
                        headurl:data.data.headurl,
                        fileId:data.data.headurl
                    })
                    console.log(data.data.headurl);
                    //TODO
                    //Toast.success('获取用户信息成功',1)
                } else {
                    //TODO
                    Toast.fail('获取用户信息失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    settingBirthday(obj){
        let body = {
            id: this.state.userInfo.id,
            birthday:obj,
            sign:"1"
        };
        let url = config.api.base + config.api.update;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    // this.setState({
                    //     shengRi:data.data.birthday,
                    // });
                    //TODO
                    //Toast.success('更新生日成功',1)
                } else {
                    //TODO
                    //Toast.success('更新生日失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    settingName(val){
        let body = {
            id: this.state.userInfo.id,
            nickname:val,
            sign:"1"
        };
        let url = config.api.base + config.api.update;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    this.setState({
                        nicheng:data.data.nickname,
                    })
                    //TODO
                    //Toast.success('更新昵称成功',1)
                } else {
                    //TODO
                    //Toast.success('更新昵称失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    uploadImg(){
        let formData = new FormData();
        let params ={
            "userid":this.state.userInfo.id,
            "fileType":1,
            "sign":"1"
        }

        for (var key in params) {
            formData.append(key, params[key]);
        }
        let file = {uri: this.state.headurl.uri, type: 'multipart/form-data', name: 'image/jpeg'};//这里的key(uri和type和name)不能改变,
        formData.append("file", file);
        let uploadfile = {userid: this.state.userInfo.id, fileType:1, file:this.state.headurl.uri, sign:"1"}
        formData.append('uploadfile',JSON.stringify(uploadfile));
        fetch('http://120.77.180.2:9999/borapi/file/upload.do', {
            method: 'POST',
            headers: {
                'Content-Type': 'form/data'
            },
            body: formData
        }).then((response) => response.json())
            .then((data) => {
                if (data.code =='1') {

                    this.setState({
                        fileId:data.data.fileId,
                    });

                    {this.settingHeadurl(data.data.fileId)}
                    console.log(data.data.fileId);
                                //TODO
                                // Toast.success('上传图片成功',1)
                            } else {
                                //TODO
                                Toast.fail('上传图片失败',1)
                            }
            })
            .catch((error) => {
                alert(error);
            }).done()
    }
    settingHeadurl(id){
        let body = {
            id: this.state.userInfo.id,
            headurl:id,
            sign:"1"
        };
        let url = config.api.base + config.api.update;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {

                    //TODO
                    //Toast.success('更新头像成功',1)
                } else {
                    //TODO
                    //Toast.success('更新头像失败',1)
                }
                // http://114.215.93.127/mid.png
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    settingSex(obj){
        let bie="";
        if(obj==1){
            bie="男"
        }else {
            bie="女"
        }
        let body = {
            id: this.state.userInfo.id,
            sex:bie,
            sign:"1"
        };
        let url = config.api.base + config.api.update;
        request.post(url, body).then(
            (data) => {
                if (data.code =='1') {
                    //TODO
                    //Toast.success('更新性别成功',1)
                } else {
                    //TODO
                    //Toast.success('更新性别失败',1)
                }
            }
        ).catch((err) => {
            alert(err);
        }).done();
    }
    goHuanbang(){
        this.props.navigation.navigate('Huanbang');
    }
    goPassword() {
        this.props.navigation.navigate('Change');
    }
    goSignup(){
        this.props.navigation.navigate('Login');
    }
    componentDidMount(){
        this.get("userInfo").then(()=>this.getuser())
    }
    setshengRi({shengRi}){
        console.log(new Date(this.state.shengRi))
        this.setState({shengRi},console.log(new Date(this.state.shengRi)));

        this.settingBirthday(shengRi)
    }
    //性别
    _check_callback=(obj)=>{
        this.popupDialog.dismiss()
        this.setState({
            flag:obj
        });
        this.settingSex(obj);
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
    render() {
        return (
            <View>
                <StatusBar barStyle="dark-content"/>

                <View style={styles.bgView}>
                    <Item  extra={
                        <View>
                            {
                                <View style={[styles.avatar, styles.avatarContainer]}>
                                    { this.state.fileId == "" ? <Text style={{color:'#999'}}>上传</Text> :
                                        <Image style={{width:40,height:40,borderRadius:20}} source={{uri:`http://39.108.139.245:9001/${this.state.fileId}.png`}} />
                                    }
                                </View>
                            }
                        </View>}
                           onClick={this.selectPhotoTapped.bind(this)} >
                        <Text style={styles.itemText}>头像</Text>
                    </Item>
                </View>

                    <View style={{backgroundColor:"#fff"}}>
                        <Item extra={
                            <View>
                                { this.state.nikName === null ? <Text style={styles.itemText1}>编辑</Text> :
                                    <Text style={styles.itemText1}>{this.state.nikName}</Text>
                                }
                            </View>}
                              arrow="horizontal" onClick={() => prompt('输入昵称', '请编辑你的昵称',
                            [
                                { text: '取消' },
                                {
                                    text: '确认',
                                    onPress: value => this.get("userInfo").then(this.selectName(value)),
                                },
                            ], 'default', null, ['输入昵称'])} >
                            <Text style={styles.itemText}>昵称</Text>
                        </Item>
                    </View>
                <DatePicker
                     mode="date"
                     value={this.state.shengRi}
                     //onChange={shengRi => this.setState({ shengRi })}
                     onChange={shengRi => this.setState({ shengRi },(shengRi)=>{
                         let time = new Date(this.state.shengRi)
                         time=time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
                         this.get("userInfo").then(()=>this.settingBirthday(time))
                     })}
                    minDate={this.date1MinDate}
                    maxDate={this.date1MaxDate}
                    extra={
                        <View>
                            { this.state.birthday === null ? <Text style={styles.itemText1}>请选择</Text> :
                                <Text style={styles.itemText}>{this.state.birthday}</Text>
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

            </View>

        );
    }

}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    borderTop:{
        borderTopWidth:1,borderTopColor:"#f1f1f1"
    },
    borderBottom:{
        borderBottomWidth:1,borderBottomColor:"#f1f1f1"
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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





