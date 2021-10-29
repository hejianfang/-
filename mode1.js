class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    const index = this.observers.findIndex((e) => e === observer);
    index > -1 && this.observers.splice(index, 1);
  }
  notify() {
    for (let observer of this.observers) {
      observer.update();
    }
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`目标者通知我更新了，我是：${this.name}`);
  }
}
const subject = new Subject();
const ob1 = new Observer("diyige1");
const ob2 = new Observer("diyige2");

subject.add(ob1);
subject.add(ob2);

subject.notify();

// 发布订阅模式

class PubSub {
  constructor() {
    this.list = {};
  }
  subscribe(key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  }
  publish(key, ...arg) {
    for (let fn of this.list[key]) {
      fn(...arg);
    }
  }
  unSubscribe(key, fn) {
    let fnList = this.list[key];
    if (!fnList) return false;
    if (!fn) {
      fnList && (fnList.length = 0);
    } else {
      fnList.forEach((item, index) => {
        if (item === fn) {
          fnList.splice(index, 1);
        }
      });
    }
  }
}
const pubSub = new PubSub();
pubSub.subscribe("onwork", (time) => {
  console.log(`上班了：${time}`);
});
pubSub.subscribe("offwork", (...arg) => {
  console.log(`下班了：${arg}`);
});
pubSub.subscribe("launch", (time) => {
  console.log(`吃饭了：${time}`);
});

// 发布
pubSub.publish("offwork", "18:00:00", "123");
pubSub.publish("launch", "12:00:00");
pubSub.unSubscribe("onwork");
