/*
 * @Author: your name
 * @Date: 2021-04-10 16:38:40
 * @LastEditTime: 2021-04-10 16:39:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \原理探究\diff和虚拟节点\snabbdom_study\src\mySnabbdom\vnode.js
 */

export default function(sel,data,children,text,elm){
    let { key } = data
    return {
        sel,data,children,text,elm,key
    }
}
