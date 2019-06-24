<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <comp :prop1="p1"></comp>
    <button @click="long">long prop1</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Comp from './components/comp.vue';
import { value } from './plugin';
const App = Vue.extend({
  name: 'app',
  components: { Comp },
  props: ['name', 'title'],
  setup() {
    const p1 = value('prop1-value');
    function long() {
      p1.value += '-long';
    }
    return {
      p1,
      long,
    };
  },
});
export default App;
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
