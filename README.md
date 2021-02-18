# react-pc-music
study react demo

项目规范:

1.文件夹、文件名 统一小写，多个单词以连接符'-'链接  

2.javascript 变量采用驼峰式命名，常量全部使用大写，组件采用大驼峰命名

3.css采用普通css和styled-component结合来编写(全局采用普通css, 局部采用styled-component)

4.整个项目不再使用class组件，统一使用函数式组件，并且全面拥抱hooks

5.所有的函数式组件，为了避免不必要的渲染，全部使用memo进行包裹

6.组件内部的状态，使用useState,useReducer；业务数据全部放在redux中管理

7.函数组件内部基本按照如下顺序编写代码;

​	组件内部state管理

​	redux的hooks代码

​	其他组件hooks代码

​	其他逻辑代码

​	返回jsx代码		

8.redux代码规范如下

​	每个模块有自己独立的reducer 通过combineReducer进行合并

​	异步请求代码使用redux-thunk，并且写在actionCreators中

​	redux直接采用redux hooks编写，不再使用connect

9.网络请求采用axios

​	对axios二次封装

​	所有的模块请求会放到一个请求文件中单独管理

10.项目使用AntDesign
11. import 顺序
  第三方插件库
  工具类 -- 网络请求 actionCreators utils
  组件
​	

