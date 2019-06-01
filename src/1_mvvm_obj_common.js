// 依赖是指当属性发生变化的时候，需要通知谁。

// 1.如何追踪依赖变化
const obj = {
  name: 'nick1'
};
let value = obj.name;

Object.defineProperty(obj, 'name', {
  // 2.如何收集依赖？Getter中收集依赖，Setter中触发依赖
  get() {
    console.log('我的name属性被读取了！');
    return value;
  },
  set(newVal) {
    console.log('我的name属性被修改了！');
    value = newVal;
  }
});

console.log(obj.name);
obj.name = 'nick2';
