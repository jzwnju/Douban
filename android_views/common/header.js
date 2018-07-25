// 实现功能：封装Header，在头部展示标题和返回按钮

// 外部传入：
// navigator 点击返回按钮返回上一级页面
// initObj(backname、barTitle)  返回按钮的名称、标题

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Icon from './left_icon';

export default class Header extends Component{
    render(){
        // 获取obj对象，包括backname按钮名称、barTitle
        var headerContent = this.props.initObj;
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.left_btn} onPress={this._pop.bind(this)}>
                    <Icon/>
                    <Text style={styles.btn_text}>返回</Text>
                </TouchableOpacity>
                <View style={styles.title_container}>
                    <Text style={styles.title} numberOfLines={1}>{headerContent.barTitle}</Text>
                </View>
            </View>
        );
    }

    // 添加事件处理器，实现点击返回
    _pop(){
        this.props.navigator.pop();
    }
}

var styles = StyleSheet.create({
    header:{
        height:44,
        backgroundColor:"#3497FF",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    left_btn:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    btn_text:{
        color:"#fff",
        fontSize:17,
        fontWeight:"bold"
    },
    title_container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
      color:"#fff",
      fontSize:14,
      fontWeight:"bold",
      lineHeight:20,
      width:200  
    }
});