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

export default class MovieDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url:this.props.MovieUrl,
            title:this.props.MovieTitle           
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
                        style={{top:-160,bottom:-200}}>
                    <WebView
                    // style={{height:height,width:width}}
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