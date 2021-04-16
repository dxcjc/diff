import patchVnode from "./patchVnode";
import createElement from "./createElement";

function isSameVnode(node1,node2){
    return node1.sel === node2.sel && node1.key === node2.key
}
export default function updateChildren(parent, oldCh, newCh){
    console.log('精细比较',oldCh,newCh)
    // 新前指针
    let newStartIdx = 0
    // 新后指针
    let newEndIdx = newCh.length-1
    // 旧前指针
    let oldStartIdx = 0
    // 旧后指针
    let oldEndIdx = oldCh.length-1
    // 新前节点
    let newStartVnode = newCh[0]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]
    // 旧前节点
    let oldStartVnode = oldCh[0]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 缓存的key
    let keyMap = null
    // todo: 四指针循环diff
    while(newStartIdx <= newEndIdx && oldStartIdx<= oldEndIdx){
        if(newStartVnode === null || newStartVnode === undefined){

            newStartVnode = newCh[++newStartIdx]

        }
        else if(newEndVnode === null || newEndVnode === undefined){

            newEndVnode = newCh[--newEndIdx]

        }
        else if(oldStartVnode === null || oldStartVnode === undefined){

            oldStartVnode = oldCh[++oldStartIdx]

        }
        else if(oldEndVnode === null || oldEndVnode === undefined){

            oldEndVnode = oldCh[--oldEndIdx]

        }
        //新前旧前命中
        else if(isSameVnode(newStartVnode,oldStartVnode)){
            // diff 子元素
            console.log('新前旧前命中');

            patchVnode(oldStartVnode,newStartVnode)

            newStartVnode = newCh[++newStartIdx]

            oldStartVnode = oldCh[++oldStartIdx]

        }
        // 新后旧后命中
        else if(isSameVnode(newEndVnode,oldEndVnode)){

            console.log('新后旧后命中');

            patchVnode(oldEndVnode,newEndVnode)

            newEndVnode = newCh[--newEndIdx]

            oldEndVnode = oldCh[--oldEndIdx]

        }
        // 新后与旧前命中
        else if(isSameVnode(newEndVnode,oldStartVnode)){

            console.log('新后与旧前命中');

            patchVnode(oldStartVnode,newEndVnode)
            // 新指向的节点，移动到旧后之后(新后指针与旧前指针命中，故可以移动旧前指针到旧后之后)
            parent.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

            newEndVnode = newCh[--newEndIdx]


            oldStartVnode = oldCh[++oldStartIdx]

        }
        // 新前与旧后
        else if(isSameVnode(newStartVnode,oldEndVnode)){

            console.log('新后与旧前命中');

            patchVnode(oldEndVnode,newStartVnode)
            // 新指向的节点，移动到旧后之前(新前指针命中旧后指针，故可以移动旧后指针到旧前之前)
            parent.insertBefore(oldEndVnode.elm, oldStartVnode.elm)

            newStartVnode = newCh[--newStartVnode]

            oldEndVnode = oldCh[++oldEndIdx]

        }
        else {
            if(keyMap === null){

                for (let i = oldStartIdx; i <= oldEndIdx; i++) {

                    keyMap = {}

                    keyMap[oldCh[i].key] = i

                }
            }
            const idxInOld = keyMap[newStartVnode.key]
            // 是新节点
            if(idxInOld === undefined){

                parent.insertBefore(createElement(newStartVnode),oldStartVnode.elm)

            }
            // 是老节点，移动老节点
            else {
                // 需要移动的节点
                const elmToMove = oldCh[idxInOld]

                patchVnode(elmToMove, newStartVnode)

                oldCh[idxInOld] = undefined

                parent.insertBefore(elmToMove.elm,oldStartVnode.elm)

            }

            newStartVnode = newCh[++newStartIdx]
        }
    }
    // 新节点还有剩余, 插入剩余节点
    if(newStartIdx <= newEndIdx){

        // const before = newCh(newEndIdx+1) === null ? null : newCh(newEndIdx+1).elm

        for (let i = newStartIdx; i <= newEndIdx ; i++) {

            parent.insertBefore(createElement(newCh[i]),oldCh[oldStartIdx].elm)

        }

    }
    // 旧节点还有剩余，删除剩余
    else if(oldStartIdx < oldEndIdx){

        for (let i = oldStartIdx; i <= oldEndIdx; i++) {

            parent.removeChild(oldCh[i].elm)

        }

    }

}