import Observer from './Observer';
class Vue {
  constructor(options) {
    this.data = options.data;
    new Observer(this.data);
  }
}

export default Vue;