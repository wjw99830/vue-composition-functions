<template>
  <div class="comp">
    <div>{{ msg }}</div>
    <span>{{ count }}</span>
    <button @click="count++">Click me!</button>
    <span>{{ propPlus }}</span>
    <button @click="msg += '-msg'">long msg</button>
  </div>
</template>
<script>
import Vue from 'vue';
import { value, computed, watch, onMounted } from '../plugin';
export default {
  props: ['prop1', 'prop2'],
  setup(props) {
    const count = value(0);
    const propPlus = computed(() => props.prop1 + '-plus');
    watch(count, (newVal, oldVal) => {});
    onMounted(() => console.log(propPlus.value));
    return {
      msg: 'hello',
      count,
      propPlus,
    };
  },
};
</script>

