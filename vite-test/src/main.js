import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Vant from 'vant'
import "vant/lib/index.css";
import chalk from '@alita/chalk';
window.alitadebug = true;
// import "@/assets/style/style.css";
import router from "@/router";
import store from "@/store";
import VConsole from 'vconsole';
// import {initPlugin} from 'vue-vconsole-devtools';//加入vue调试工具
// initPlugin(new VConsole());
// createApp(App).component('vueFloating', vueFloating)
createApp(App).use(router).use(store).use(Vant).mount('#app')
