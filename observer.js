/**
 * 利用Object.defineProerty来劫持数据，结合观察者模式来响应数据变化。
 */
class Observer {
  constructor(vm) {
    this.deepProxy(vm);
  }
  deepProxy(data) {
    if (!data || typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach((item) => {
      if (typeof data[item] === "object") {
        this.deepProxy(data[item]);
        data[item] = this.defineReactive(data[item]);
      }
    });
  }
  defineReactive(obj) {
    let dep = new Dep();
    return new Proxy(obj, {
      get(target, propKey, receiver) {
        const ret = Reflect.get(target, propKey, receiver);
        Dep.target && dep.addSub(Dep.target);
        return ret;
      },
      set(target, propKey, value, receiver) {
        const ret = Reflect.set(target, propKey, value, receiver);
        dep.notify();
        return ret;
      },
    });
  }
}
class Dep {
  constructor() {
    //订阅的数组
    this.subs = [];
  }
  //添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    //调用watcher的更新方法
    this.subs.forEach((watcher) => watcher.update());
  }
}
