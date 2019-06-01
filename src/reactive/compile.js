class Compile {
	construct() {}
	nodeToFragment(node, vm) {
		const documentFragment = document.createDocumentFragment();
		let childElement = null;
		while (childElement = node.firstChild) {
			this.compile(childElement, vm);
			documentFragment.appendChild(childElement);
		}
		return documentFragment;
	}
	compile(node, vm) {
		if (node.nodeType === 1) {
			//解析{{}}
			if (node.nodeName === "SPAN") {
				const reg = /\{\{(.*)\}\}/;
				if (reg.test(node.innerText)) {
					const name = RegExp.$1; // 获取匹配到的字符串
					const key = name.trim();
					node.innerText = vm.data[key];
					new Watcher(vm, node, name, 'text');
				}
			}
			//解析v-model 
			if (node.nodeName === "INPUT") {
				const attributes = node.attributes;
				let key = null;
				for (let i = 0; i < attributes.length; i++) {
					const curAttr = attributes[i];
					if (curAttr.nodeName === "v-model") {
						key = attributes[i].nodeValue;
						node.addEventListener('input', function (e) {
							vm.data[key] = e.target.value;
						});
						node.value = vm.data[key];
						node.removeAttribute('v-model');
					}
				}
				new Watcher(vm, node, key, 'input'); //生成一个新的Watcher,标记为input
			}
		}
	}
}
