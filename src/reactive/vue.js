const compile = new Compile();

/** main **/
function Vue(options) {
	const vm = this;
	vm.data = options.data;
	const id = options.el;
	new Observer(vm.data, vm);
	const idElement = document.getElementById(id);
	const dom = compile.nodeToFragment(idElement, vm)
	idElement.appendChild(dom);
}
