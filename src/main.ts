import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import cpp from "highlight.js/lib/languages/cpp";
import python from "highlight.js/lib/languages/python";
import hljsVuePlugin from "@highlightjs/vue-plugin";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("python", python);

const app = createApp(App);
app.use(store);
app.use(mavonEditor);
app.use(ElementPlus);
app.use(router);
app.provide("store", store);

app.use(hljsVuePlugin);
app.mount("#app");
