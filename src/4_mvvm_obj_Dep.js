// 3.依赖收集放在哪？

// 依赖收集需要为依赖找一个存储的地方，
// (1)为此我们先创建Dep（收集依赖/删除依赖/向依赖发送消息）
const Dep = {
  // 存储
  target: null
};


// (3)当计算属性的值被跟新时调用
const onComputedUpdate = function (val) {
  console.log(`我是个${val}人`);
};

const watcher = function (obj, key, cb) {
  const onDepUpdate = () => {
    const val = cb();
    onComputedUpdate(val);
  };
  Object.defineProperty(obj, key, {
    get() {
      Dep.target = onDepUpdate;
      const val = cb();
      Dep.target = null;
      return val;
    },
    set() {
      console.error('计算属性不能被修改');
    }
  });
};

watcher(obj, 'type', () => {
  return obj.age > 18 ? '成年' : '未成年';
});


console.log('-------绑定Observer与Dep----------');
// (2)
const defineReactive = function (data, key, val) {
  const deps = [];
  Object.defineProperty(data, key, {
    get() {
      console.log(`我的${key}属性被读取了！`);
      if (Dep.target && deps.indexOf(Dep.target) === -1) {
        deps.push(Dep.target);
      }
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      console.log(`我的${key}属性被修改了！`);
      val = newVal;
      deps.forEach((dep) => {
        dep();
      });
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

console.log('-----------------');