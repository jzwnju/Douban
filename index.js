import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from 'react-native-deprecated-custom-components';

import BookList from './android_views/book/book_list';
import MovieList from './android_views/movie/movie_list';

 // 隐藏状态栏
StatusBar.setHidden(true);

export default class Douban extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedTab:"book"
    }
  }

  render() {
    return (
      <TabNavigator tabBarStyle={styles.tabNavigatorContainer}>
        <TabNavigator.Item
            title="图书"
            selectedTitleStyle={styles.selectedTitleStyle}
            selected={this.state.selectedTab==="book"}
            renderIcon={() => <Image source={require('./img/book.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/active-book.png')} />}
            onPress={()=>{
                this.setState({
                    selectedTab:"book"
                })
            }}>
          <Navigator
              initialRoute={{name:'图书',component:BookList}}
              configureScene={(route,navigator)=>{
                return Navigator.SceneConfigs.PushFromRight;
              }}
              renderScene={(route,navigator)=>{
                let Component = route.component;
                return <Component {...route.params} navigator={navigator}/>;
              }}
            />
        </TabNavigator.Item>
        <TabNavigator.Item
            title="电影"
            selectedTitleStyle={styles.selectedTitleStyle}
            selected={this.state.selectedTab==="movie"}
            renderIcon={() => <Image source={require('./img/movie.png')} />}
            renderSelectedIcon={() => <Image source={require('./img/active-movie.png')} />}
            onPress={()=>{
                this.setState({
                    selectedTab:"movie"
                })
            }}>
          <Navigator
            initialRoute={{name:'电影',component:MovieList}}
            configureScene={(route,navigator)=>{
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route,navigator)=>{
              let Component = route.component;
              return <Component {...route.params} navigator={navigator}/>;
            }}
          />
        </TabNavigator.Item>
      </TabNavigator> 
    );
  }
}

const styles = StyleSheet.create({
  tabNavigatorContainer: {
    height: 72
  },
  selectedTitleStyle: {
    color: "#00B51D"
  }
});

AppRegistry.registerComponent('Douban', () => Douban);