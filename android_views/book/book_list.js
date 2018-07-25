// 图书列表模块：搜索栏、图书列表
// 图书列表的内容：通过调用图书搜索接口获得更多条图书数据
// 图书列表Item是单独封装的

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    Animated
} from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
// 从公共模块导入工具类

import Util from './../common/util';
import SearchBar from './../common/searchBar';
import ServiceURL from './../common/service';
import BookItem from './book_item';
import BookDetail from './book_detail';

export default class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataArray: [],
            // 作用：1.搜索接口需要设置搜索内容。2.点击搜索按钮时，修改关键字内容，重新请求数据，重新渲染
            keywords: 'React'
        };
    }

    //网络请求
    fetchData() {
        // https://api.douban.com/v2/book/search?count=20&q=react
        var url = ServiceURL.book_search + "?count=20&q=" + this.state.keywords;

        //这个是js的访问网络的方法
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.books;
                let dataBlob = [];
                let i = 0;
                // if (!data || data.length == 0) {
                //     return alert("未查询到相关书籍")
                // }else{
                    data.map(function (item) {
                        dataBlob.push({
                            key: i,
                            value: item,
                        })
                        i++;
                    });
                    this.setState({
                        //复制数据源
                        dataArray: dataBlob,
                        isLoading: false,
                    });
                // }               
                data = null;
                dataBlob = null; 
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }

    _searchPress(){
        this.fetchData();
    }

    render() {
        return (
            <ScrollView >
                <SearchBar 
                    placeholder="请输入图书的名称"
                    onPress={this._searchPress.bind(this)}
                    onChangeText={(text)=>{this.setState({keywords:text})}}
                />
                {
                    !this.state.isLoading ?
                    <AnimatedFlatList
                        data={this.state.dataArray}
                        renderItem={this.renderItemView.bind(this)}
                        ItemSeparatorComponent={this._separator}
                        initialNumToRender={6}
                    />
                    : Util.loading
                }
            </ScrollView>
        );
    }

    componentDidMount(){
        //请求数据
        this.fetchData();
    }
    
    _showDetail(title,url){
        const {navigator} = this.props;
        if(navigator) {
            navigator.push({
                name: 'BookDetail',
                component: BookDetail,
                params:{
                    BookTitle: title,
                    BookUrl: url
                }
            })
        }
    }

    // 渲染行
    renderItemView({item}) {
        return  <BookItem book={item}
                    onPress={() => this._showDetail(item.value.title,item.value.alt)}
                />
    }

    // 分割线
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#CCCCCC' }} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    content: {
        fontSize: 15,
        color: 'black',
    },

    item: {
            flexDirection: "row",
            height: 120,
            padding: 10
        },
        imageContainer: {
            justifyContent: "center",
            alignItems: "center"
        },
        image: {
            width: 80,
            height: 100
        },
        contentContainer: {
            flex: 1,
            marginLeft: 15
        },
        textContainer: {
            flex: 1,
            justifyContent: "center"
        },
        publisher_author: {
            color: "#A3A3A3",
            fontSize: 13,
        },
        price: {
            color: "#2BB2A3",
            fontSize: 15
        },
        pages: {
            marginLeft: 10,
            color: "#A7A0A0"
        }
});