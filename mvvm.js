class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    if (this.$el) {
      new Observer(this);
      new Compile(this.$el, this);
    }
  }
}
