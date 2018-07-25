// 在book文件夹下，新建book_detail.js文件：
// 图书详情：
// 实现功能：展示图书详情，包括：图书信息、图书简介、作者简介
// 包含组件：基本组件、BookItem(图书信息使用BookItem展示)

// 需要使用的字段：
//     image:图书缩略图
//     title:图书名称
//     publisher：出版社
//     author：作者
//     price：价格
//     pages：图书总页数
//     summary：图书简介
//     author_intro：作者简介

import React, { Component } from 'react';
import {
    StyleSheet,
    WebView,
    ScrollView,
    View,
    } from 'react-native';

import Dimensions from 'Dimensions';
import Header from './../common/header'; 

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default class BookDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url:this.props.BookUrl,
            title:this.props.BookTitle           
        }
    }

    
    render(){
        return (
            <ScrollView style={styles.container}>
                <View 
                        style={{zIndex:1}}>
                    <Header
                        initObj={{barTitle:this.state.title}}
                        navigator={this.props.navigator}/>
                </View>
                <View 
                        // 隐藏豆瓣自己的头部
                        style={{top:-160,bottom:-200}}>
                    <WebView
                        style={{height:height,width:width}}
                        source={{uri:this.state.url}}
                        // 是否显示加载这个状态
                        stateInLoadingState={true}
                    ></WebView>
                </View>
            </ScrollView>
        );
    } 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});