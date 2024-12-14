import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import hljsVuePlugin from "@highlightjs/vue-plugin";
// import "highlight.js/styles/stackoverflow-light.css";

const app = createApp(App);
app.use(store);
app.use(mavonEditor);
app.use(ElementPlus);
app.use(router);
app.provide("store", store);
// mavonEditor.markdownIt.set({
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return (
//           '<pre class="hljs"><code>' +
//           hljs.highlight(str, { language: lang }).value +
//           "</code></pre>"
//         );
//       } catch (__) {}
//     }
//     return (
//       '<pre class="hljs"><code>' +
//       mavonEditor.utils.escapeHtml(str) +
//       "</code></pre>"
//     );
//   },
// });
// app.directive("highlight", {
//   mounted(el) {
//     const blocks = el.querySelectorAll("pre code");
//     blocks.forEach((block) => {
//       hljs.highlightElement(block);
//     });
//   },
// });
app.use(hljsVuePlugin);
app.mount("#app");
