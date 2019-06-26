import Vue from 'vue';
export interface WrapperOptions {
  isComputed: boolean;
}
export class Wrapper<T> {
  public value!: T;
  /**
   * use type unknown for raw.value since there is a slight difference between computed and value.
   * type unknown could be asserted to any type with sound type inference.
   */
  private raw: { value: unknown };
  constructor(value: T, opts: Partial<WrapperOptions> = {}) {
    this.raw = Vue.observable({
      value,
    });
    Object.defineProperty(this, 'value', {
      get: () => {
        return opts.isComputed ? (this.raw.value as () => T)() : this.raw.value as T;
      },
      set: (v: T) => {
        this.raw.value = v;
      },
    });
  }
}
