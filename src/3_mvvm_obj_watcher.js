// Watcher 能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数

const defineReactive = function (data, key, val) {
  Object.defineProperty(data, key, {
    get() {
      console.log(`我的${key}属性被读取了！`);
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      console.log(`我的${key}属性被修改了！`);
      val = newVal;
    }
  });
};

const observer = function (obj) {
  const keys = Object.keys(obj);
  keys.forEach(function (key) {
    defineReactive(obj, key, obj[key]);
  });
};
const obj = {
  name: 'nick1',
  age: 18
};

observer(obj);

console.log('-------Watcher----------');

// 当计算属性的值被跟新时调用
const onComputedUpdate = function (val) {
  console.log(`我是个${val}人`);
};

const watcher = function (obj, key, cb) {
  Object.defineProperty(obj, key, {
    get() {
      const val = cb();
      onComputedUpdate(val);
      return val;
    },
    set() {
      console.error('watch属性不能被修改');
    }
  });
};

// 实现计算属性的监听
watcher(obj, 'type', () => {
  return obj.age > 18 ? '成年' : '未成年';
});

console.log(obj.type);
obj.age = 20;
console.log(obj.type);

