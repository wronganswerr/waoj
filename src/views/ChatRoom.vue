<template>
  <div class="bottom">
    <div id="chatroom">
      <h1 style="margin-block-start: 0em; margin-block-end: 0.5em">chatroom</h1>
      <div id="messagebox">
        <li v-for="(i, index) in message_list" :key="index">
          {{ i }}
        </li>
      </div>
      <div id="inputbox"></div>
    </div>
    <button @click="connectWebSocket">Connect WebSocket</button>
    <button @click="sendMessage">Send Message</button>
    <button @click="closeWebSocket">Close WebSocket</button>
  </div>
</template>
<script setup lang="ts">
import { ref, defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const message_list = ref<string[]>([]);
const message = computed(() => store.state.socket.msg); // computed 自动跟踪响应式的依赖数据

watch(message, (newMessage) => {
  if (newMessage) {
    message_list.value.push(newMessage);
    console.log(message_list.value);
  }
});

const connectWebSocket = () => {
  console.log(store.state.socket);
  if (store.state.socket.ws == null || store.state.socket.ws?.readyState == 3) {
    store.dispatch("socket/connection", {
      url: `ws://www.wongansweroj.online:8126/ws/ws/${Math.floor(
        Math.random() * 101
      )}`,
      token: "your-token", //不用
    });
  } else {
    console.log("socket existed");
  }
};

const sendMessage = () => {
  const data = { type: "message", content: "Hello, WebSocket!" };
  store.dispatch("socket/sendMsg", data);
};

const closeWebSocket = () => {
  store.dispatch("socket/closeWs");
};
</script>
<style scoped>
.bottom {
  margin-top: 10px;
  margin: auto;
  /* height: 800px; */
  width: 90%;
  /* background-color: white; */
  overflow: hidden;
}

#chatroom {
  margin: 10px;
  height: 600px;
  /* height: 70%; */
  background-color: white;
  padding: 10px;
}

#messagebox {
  height: 60%;
  padding: 10px;
  background-color: gray;
  overflow: auto;
}

#inputbox {
  height: 20%;
  padding: 10px;
  margin-top: 10px;
  background-color: gray;
}
</style>
