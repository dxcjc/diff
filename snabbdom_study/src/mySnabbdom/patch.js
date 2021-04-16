import vnode from "./vnode";
import createElement from './createElement'
import patchVnode from "./patchVnode";
export default function(oldVnode,newVnode){
    // 判断 oldVnode 是不是虚拟dom
    if(oldVnode.sel === '' || oldVnode.sel === undefined)
        // 将oldVnode包装成虚拟dom
        oldVnode = vnode(oldVnode.tagName.toUpperCase(),{},[],undefined,oldVnode)
    // 判断是否是同一节点
    if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel){

        patchVnode(oldVnode,newVnode)

    }
    else {
        // 创建新节点
        let newDom = createElement(newVnode)
        // 将新节点插入到老节点之前
        if(oldVnode.elm.parentNode && newDom)

            oldVnode.elm.parentNode.insertBefore(newDom, oldVnode.elm)
        // 移除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }

}
