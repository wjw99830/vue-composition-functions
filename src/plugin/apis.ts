import Vue from 'vue';
import { renderingInstance } from '.';
import { Wrapper } from './wrapper';
export type AnyFunction = (...rest: any[]) => any;

/**
 * Detect the context when api called.
 * @param {string} name apiName
 */
function detectContext(name: string) {
  if (!renderingInstance) {
    throw new Error(`Please call ${name} in setup function.`);
  }
}

export const value = <T>(initValue: T): Wrapper<T> => {
  const wrapper = new Wrapper(initValue);
  return wrapper;
};
export const computed = <T>(getter: () => T) => {
  const wrapper = new Wrapper(getter, { isComputed: true });
  return wrapper;
};
export const watch = <T>(dep: Wrapper<T> | (() => T), cb: (newVal: T, oldValue: T) => any) => {
  detectContext('watch');
  const expOrFn = typeof dep === 'object' ? () => dep.value : dep;
  return renderingInstance!.$watch(expOrFn, cb);
};
export const onBeforeCreate = (handler: AnyFunction) => {
  detectContext('onBeforeCreate');
  addHook(renderingInstance!, 'beforeCreate', handler);
};
export const onCreated = (handler: AnyFunction) => {
  detectContext('onCreated');
  addHook(renderingInstance!, 'created', handler);
};
export const onBeforeMount = (handler: AnyFunction) => {
  detectContext('onBeforeMount');
  addHook(renderingInstance!, 'beforeMount', handler);
};
export const onMounted = (handler: AnyFunction) => {
  detectContext('onMounted');
  addHook(renderingInstance!, 'mounted', handler);
};
export const onBeforeUpdate = (handler: AnyFunction) => {
  detectContext('onBeforeUpdate');
  addHook(renderingInstance!, 'beforeUpdate', handler);
};
export const onUpdated = (handler: AnyFunction) => {
  detectContext('onUpdated');
  addHook(renderingInstance!, 'updated', handler);
};
export const onBeforeDestroy = (handler: AnyFunction) => {
  detectContext('onBeforeDestroy');
  addHook(renderingInstance!, 'beforeDestroy', handler);
};
export const onDestroyed = (handler: AnyFunction) => {
  detectContext('onDestroyed');
  addHook(renderingInstance!, 'destroyed', handler);
};
function addHook(vm: Vue, hook: string, handler: AnyFunction) {
  const options = vm.$options as Record<string, any>;
  const hooks = options[hook];
  if (!hooks) {
    options[hook] = [handler];
  } else {
    options[hook].push(handler);
  }
}
