const Dep = require('./Dep');

class Watcher {
  constructor(obj, key, cb, onComputedUpdate) {
    this.obj = obj;
    this.key = key;
    this.cb = cb;
    this.onComputedUpdate = onComputedUpdate;
    this.defineComputed();
  }

  defineComputed() {
    const self = this;
    const onDepUpdate = () => {
      const val = self.cb();
      self.onComputedUpdate(val);
    };
    Object.defineProperty(this.obj, this.key, {
      get() {
        Dep.target = onDepUpdate;
        const val = self.cb();
        Dep.target = null;
        return val;
      },
      set() {
        console.error('计算属性不能被修改');
      }
    });
  }
}

module.exports =  Watcher;