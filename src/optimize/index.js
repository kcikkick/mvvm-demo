const Observer = require('./Observer');
const Watcher = require('./Watcher');

const user = new Observer({
  name: 'nick1',
  age: 18
});

new Watcher(user, 'type', () => {
  return user.age > 18 ? '成年' : '未成年';
}, (val) => {
  console.log(`我是个${val}人`);
});
console.log(`我是个${user.type}`);
user.age = 20;
// console.log(`我是个${user.type}`);