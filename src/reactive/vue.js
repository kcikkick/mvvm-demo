class Compile{
    construct(){}
    nodeToFragment(node, vm){
        const documentFragment = document.createDocumentFragment();
        let childElement = null;
        while(childElement = node.firstChild){
            this.compile(childElement, vm);
            documentFragment.appendChild(childElement);
        }
        return documentFragment;
    }
    compile(node, vm){
        if (node.nodeType === 1) {
            //解析{{}}
            if (node.nodeName === "SPAN") {
                const reg = /\{\{(.*)\}\}/;
//                const RegExp = reg.test(node.innerText);
                if (reg.test(node.innerText)) {
                     const name = RegExp.$1; // 获取匹配到的字符串
                     const  key = name.trim();
                     node.innerText = vm.data[key]
                }
            }
            //解析v-model
            if (node.nodeName === "INPUT") {
                const attributes = node.attributes;
                for (let i = 0; i< attributes.length; i++) {
                    const curAttr = attributes[i];
                    if (curAttr.nodeName === "v-model") {
                        const key = attributes[i].nodeValue;
                        node.value = vm.data[key];
                        node.removeAttribute('v-model');
                    }
                }
            }
        }
    }
}
const compile = new Compile();

function Vue (options) {
        const vm = this;
        vm.data = options.data;
        const id = options.el;
        const idElement = document.getElementById(id);
        const dom = compile.nodeToFragment(idElement, vm)
        idElement.appendChild(dom);
}