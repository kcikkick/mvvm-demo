class Dep {
  constructor() {
    this.subs = [];
  }

  depend() {
    if (Dep.target && this.subs.indexOf(Dep.target) === -1) {
      this.subs.push(Dep.target);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i]();
    }
  }
}

Dep.target = null;


module.exports =  Dep;