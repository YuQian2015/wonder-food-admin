import Vue from 'vue'
import ElementUI from 'element-ui';
// 引入vue-amap
import AmapVue from '@amap/amap-vue';
import VueRouter from 'vue-router';
import VueCropper from 'vue-cropper';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueCropper);

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '1202ee25f8c08378ce429a7283076c36';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
