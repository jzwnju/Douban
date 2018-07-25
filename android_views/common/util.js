// 在common文件夹下，新建一个文件util.js
// 该文件实现的功能：在项目中使用一些功能，包括：loading组件

import React, { Component } from 'react';
import {
    ActivityIndicator   // loading所需的组件
} from 'react-native';

export default  Util = {
    // loading效果
    loading:<ActivityIndicator style={{marginTop:200}}/>
}