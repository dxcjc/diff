/*
 * @Author: your name
 * @Date: 2021-04-10 13:52:46
 * @LastEditTime: 2021-04-10 16:56:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \原理探究\diff和虚拟节点\snabbdom_study\src\index.js
 */
// import { init } from 'snabbdom/init';
// import {classModule} from 'snabbdom/modules/class'
// import {propsModule}  from 'snabbdom/modules/props'
// import {styleModule}  from 'snabbdom/modules/style'
// import {eventListenersModule} from 'snabbdom/modules/eventlisteners'
// // h 是一个生成vnode的包装函数
// import {h} from 'snabbdom/h';
import h from './mySnabbdom/h'
import patch from "./mySnabbdom/patch";
const app = document.getElementById('app')
const btn = document.getElementById('btn')
const vnode = h('div', {}, [
    h('div', {key:'a'}, 'a'),
    h('div', {key:'b'}, 'b'),
    h('div', {key:'c'}, 'c'),
])
patch(app,vnode)
const newVnode = h('div', {}, [
    h('div', {key:'a'}, 'a'),
    h('div', {key:'b'}, 'b'),
    h('div', {key:'c'}, 'c'),
    h('div', {key:'d'}, 'd'),
    h('div', {key:'e'}, 'e'),
])

btn.addEventListener('click',(e) => {
    patch(vnode,newVnode)
})
