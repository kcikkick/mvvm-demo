class Watcher {
	constructor(vm, node, name, nodeType) {
		Dep.target = this;
		this.name = name;
		this.node = node;
		this.vm = vm;
		this.nodeType = nodeType;
		this.update();
		Dep.target = null;
	}
	update() {
			this.get();
			if (this.nodeType == 'text') {
				this.node.innerText = this.value;
			}
			if (this.nodeType == 'input') {
				this.node.value = this.value;
			}
		}
		// 获取 data 中的属性值
	get() {
		this.value = this.vm.data[this.name]; // 触发相应属性的 get
	}
}
