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


console.log(obj.name);
console.log(obj.age);
obj.age = 20;



