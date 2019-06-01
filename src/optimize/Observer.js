const Dep = require('./Dep');

class Observer {
  constructor(obj) {
    return this.walk(obj);
  }

  walk(obj) {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      this.defineReactive(obj, key, obj[key]);
    });
    return obj;
  }

  defineReactive(obj, key, val) {
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        console.log(`我的${key}属性被读取了！`);
        dep.depend();
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        console.log(`我的${key}属性被修改了！`);
        val = newVal;
        dep.notify();
      }
    });
    return obj;
  }
}

module.exports = Observer;