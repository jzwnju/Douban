import React,{Component}from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class MovieItem extends Component{
    render(){
        var movie = this.props.movie;
        // 提取演员姓名，原始数据中是一个对象，我们只需姓名即可
        // 遍历对象数组，将演员姓名存储在一个新的数组中
        var actors = [];
        for (var i in movie.value.casts){
            actors.push(movie.value.casts[i].name);
        }
        return (
            <TouchableOpacity style={styles.item} {...this.props}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode="contain" source={{uri:movie.value.images.medium}}/>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>名称：{movie.value.title}</Text> 
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>演员：{actors}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>评分：{movie.value.rating.average}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>时间：{movie.value.year}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>类型：{movie.value.genres}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    } 
};

var styles = StyleSheet.create({
    item:{
        flexDirection:"row",
        height:120,
        padding:10,
    },
    imageContainer:{
       justifyContent:"center",
       alignItems:"center" 
    },
    image:{
        width:80,
        height:110
    },
    contentContainer:{
        flex:1,
        marginLeft:15
    },
    textContainer:{
        flex:1,
        justifyContent:"center"
    },
    text:{
        color:"black"
    }
});