import { DefaultProps } from 'vue/types/options';
import Vue, { VNode } from 'vue';
import { value } from './apis';
import { Wrapper } from './wrapper';

declare module 'vue/types' {
  type DefaultAttrs = Record<string, string>;
  type DefaultSlots = Record<string, VNode>;
  type RenderFunction = (props: DefaultProps, attrs: DefaultAttrs, slots: DefaultSlots, vnode: VNode) => VNode;
  interface ComponentOptions<V extends Vue> {
    setup?(props: DefaultProps): object | void | RenderFunction;
  }
}
export let renderingInstance: Vue | null = null;
export const setRenderingInstance = (ins: Vue) => renderingInstance = ins;

const { set, get } = Reflect;
function _setup(this: Vue) {
  setRenderingInstance(this);
  const { setup } = this.$options;
  if (!setup) { return; }
  const renderOrState = setup.call(this, this.$props);
  if (typeof renderOrState === 'object') {
    for (const [key, initVal] of Object.entries(renderOrState)) {
      if (typeof initVal !== 'function' && !(initVal instanceof Wrapper)) {
        set(renderOrState, key, value(initVal));
      }
    }
    for (const key of Object.keys(renderOrState)) {
      Object.defineProperty(this, key, {
        get: () => {
          const reactiveData = get(renderOrState, key);
          return typeof reactiveData === 'function' ? reactiveData.bind(this) : reactiveData.value;
        },
        set(v: any) {
          const reactiveData = get(renderOrState, key);
          if (typeof reactiveData !== 'function') {
            reactiveData.value = v;
          } else {
            set(renderOrState, key, v);
          }
        },
      });
    }
  } else if (typeof renderOrState === 'function') {
    // todo render
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
