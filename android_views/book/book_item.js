// 图书列表item
// 实现功能：展示图书信息，点击item进入图书详情页面
// 外部传入：
// book：图书对象
// onPress事件处理方法：通过...this.props绑定，需要设置参数，即图书id

// 需要使用的字段：
    // image：图书缩略图
    // title：图书名称
    // publisher：出版社
    // author：作者
    // price：价格
    // pages：图书总页数

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

export default class BookItem extends Component{
    render(){
        var book = this.props.book;
        return (
            <TouchableOpacity style={styles.item} {...this.props} 
                >
                {/* 图书图像 */}
                <View style={styles.imageContainer}>
                    <Image source={{uri:book.value.images.small}} style={styles.image}/>
                </View>
                {/* 图书信息 */}
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1}>{book.value.title}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.publisher_author} numberOfLines={1}>{book.value.publisher}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.publisher_author} numberOfLines={1}>{book.value.author}</Text>
                    </View>
                    <View style={{flexDirection:"row",flex:1,alignItems:"center"}}>
                        <Text style={styles.price}>{book.value.price}</Text>
                        <Text style={styles.pages}>{book.value.pages}页</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        height:120,
        padding:10
    },
    imageContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:80,
        height:100
    },
    contentContainer:{
        flex:1,
        marginLeft:15
    },
    textContainer:{
        flex:1,
        justifyContent:"center"
    },
    publisher_author:{
        color:"#A3A3A3",
        fontSize:13,
    },
    price:{
        color:"#2BB2A3",
        fontSize:15
    },
    pages:{
        marginLeft:10,
        color:"#A7A0A0"
    }
});