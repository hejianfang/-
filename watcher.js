class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    //获取旧的值
    this.get();
  }
  get() {
    Dep.target = this; //将实例赋给target
    let value = this.getVal(this.vm, this.expr);
    Dep.target = null; //
    return value; //将旧值返回
  }
  getVal(vm, expr) {
    expr = expr.split(".");
    return expr.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  }
  // 对外暴露的方法
  update() {
    //值变化时将会触发update，获取新值，旧值已保存在value中
    let newValue = this.getVal(this.vm, this.expr);
    this.cb(newValue); //调用watch的回调函数
  }
}
