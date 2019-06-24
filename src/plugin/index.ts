import Vue from 'vue';

export let renderingInstance: Vue | null = null;
export const setRenderingInstance = (ins: Vue) => renderingInstance = ins;

function _setup(this: Vue) {
  setRenderingInstance(this);
  const { setup } = this.$options;
  if (!setup) { return; }
  const renderOrState = setup.call(this, this.$props);
  if (typeof renderOrState === 'object') {
    for (const key of Object.keys(renderOrState)) {
      Object.defineProperty(this, key, {
        get() {
          const reactiveData = Reflect.get(renderOrState, key);
          return typeof reactiveData === 'function' ? reactiveData : reactiveData.value;
        },
        set(v: any) {
          const reactiveData = Reflect.get(renderOrState, key);
          if (typeof reactiveData !== 'function') {
            reactiveData.value = v;
          } else {
            Reflect.set(renderOrState, key, v);
          }
        },
      });
    }
  } else if (typeof renderOrState === 'function') {
    console.log(this);
  }
}
Vue.mixin({
  beforeCreate(this: Vue & Record<string, any>) {
    const _render = this._render;
    let isSetup = false;
    this._render = function() {
      if (!isSetup) {
        _setup.call(this);
        isSetup = true;
      }
      return _render.apply(this, arguments);
    };
  },
});
export * from './apis';
