import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Animated,
    FlatList
} from 'react-native';


import Util from './../common/util';
import SearchBar from './../common/searchBar';
import ServiceURL from './../common/service';
import MovieItem from './movie_item';
import MovieDetail from './movie_detail';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class MovieList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            dataArray: [],
            // 作用：1.搜索接口需要设置搜索内容。2.点击搜索按钮时，修改关键字内容，重新请求数据，重新渲染
            keywords: '哈利波特'
        };
    }

    _changeText(text){
        this.setState({
            keywords:text
        });
    }

     _searchPress(){
        this.fetchData();
    }

    fetchData() {
        // https: //api.douban.com/v2/movie/search?count=20&q=哈利波特
        var url = ServiceURL.movie_search + "?count=20&q=" + this.state.keywords;

        //这个是js的访问网络的方法
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.subjects;
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
            .done();
    }

    render() {
        return (
            <ScrollView >
                <SearchBar 
                    placeholder="请输入电影的名称"
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
        // 请求数据
        this.fetchData();
    }

    _showDetail(title,url){
        const {navigator} = this.props;
        if(navigator) {
            navigator.push({
                name: 'MovieDetail',
                component: MovieDetail,
                params:{
                    MovieTitle: title,
                    MovieUrl: url
                }
            })
        }
    }

    renderItemView({item}) {
         return <MovieItem movie={item} 
             onPress={() => this._showDetail(item.value.title,item.value.alt)}
         />
    }

    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#CCCCCC' }} key={this.state.dataArray.key}/>;
    }
};

var styles = StyleSheet.create({

});