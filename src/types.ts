import { DefaultProps } from 'vue/types/options';
import Vue, { VNode } from 'vue';

declare module 'vue/types' {
  type DefaultAttrs = Record<string, string>;
  type DefaultSlots = Record<string, VNode>;
  type RenderFunction = (props: DefaultProps, attrs: DefaultAttrs, slots: DefaultSlots, vnode: VNode) => VNode;

  interface ComponentOptions<V extends Vue> {
    setup?(props: DefaultProps): object | void | RenderFunction;
  }
}