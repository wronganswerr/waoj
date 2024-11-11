import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import VueNativeSock from "vue-native-websocket-vue3";
const app = createApp(App);
app.use(store);
app.use(mavonEditor);
app.use(ElementPlus);
app.use(router);
app.use(VueNativeSock, "http://www.wongansweroj.online:8126/ws/ws", {
  format: "json", // 默认值
  reconnection: true, // 自动重连
  reconnectionAttempts: 5, // 最大重连次数
  reconnectionDelay: 3000, // 重连间隔时间
});
app.provide("store", store);

// app.use(VueNativeSock, "ws://localhost:8000/ws/your_user_id", {
//   format: "json",
// });

app.mount("#app");
