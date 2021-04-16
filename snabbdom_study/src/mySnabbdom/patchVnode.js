import createElement from "./createElement";
import updateChildren from "./updateChildren";

export default function patchVnode(oldVnode,newVnode){

    // 判断新老vnode是否是同一对象
    if(oldVnode === newVnode) return;
    // 判断新节点是否存在text
    else if(newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)){
        // 判断是否是同一对象
        if(newVnode.text !== oldVnode.text) oldVnode.elm.innerText = newVnode.text
    }
    else {
        // 此时新节点的子节点不是字符
        if(oldVnode.children !== undefined && oldVnode.children.length > 0){
            //更新子节点
            updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)

        }else{
            // 清楚老节点的文本，添加新节点的children
            oldVnode.elm.innerHTML = ''
            for (let i = 0; i < newVnode.children.length; i++) {
                let dom = createElement(newVnode.children[i])
                oldVnode.elm.appendChild(dom)
            }
        }
    }

}