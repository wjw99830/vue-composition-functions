import Vue from 'vue';
import App from './App.vue';
import './plugin';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App, {
    props: {
      name: 'app-name',
      title: 'app-title',
    },
  }),
}).$mount('#app');
