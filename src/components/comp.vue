<template>
  <div class="comp">
    <span>{{ count }}</span>
    <button @click="count++">Click me!</button>
    <span>{{ propPlus }}</span>
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
    watch(count, (newVal, oldVal) => {
      console.log(newVal, oldVal);
      console.log('count has changed');
    });
    onMounted(() => console.log('mounted'));
    return {
      count,
      propPlus,
    };
  },
};
</script>

