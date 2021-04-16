/*
 * @Author: your name
 * @Date: 2021-04-10 16:23:37
 * @LastEditTime: 2021-04-10 16:55:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \原理探究\diff和虚拟节点\snabbdom_study\src\mySnabbdom\h.js
 */
import vnode from './vnode'

export default function (sel, data, c) {

    if (arguments.length !== 3)

        throw new Error('传递的参数不对,必须是三个参数')

    if (typeof c == 'string' || typeof c == 'number')

        return vnode(sel, data, undefined, c, undefined)

    else if (Array.isArray(c)) {

        let children = []

        let length = c.length

        for (let i = 0; i < length; i++) {

            if (!(typeof c[i] == 'object' && c[i].hasOwnProperty('sel')))

                throw new Error('第三个数组参数某项的类型不正确')

            children.push(c[i])

        }

        return vnode(sel, data, children, undefined, undefined)

    } else if (typeof c == 'object' && c.hasOwnProperty('sel'))

        return vnode(sel, data, [c], undefined, undefined)

    else

        throw new Error('传递的参数不对必须是三个参数')
}