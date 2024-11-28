<template>
  <div class="bottom">
    <div id="chatroom">
      <h1 style="margin-block-start: 0em; margin-block-end: 0.5em">chatroom</h1>
      <div id="messagebox">
        <li v-for="(i, index) in message_list" :key="index">
          {{ i }}
        </li>
      </div>
      <div id="inputbox">
        <el-input
          v-model="input_text"
          style="width: 100%; height: 80%"
          type="textarea"
          placeholder="Please input"
          :rows="3"
        />
        <div>
          <button @click="sendMessage">Send Message</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const message_list = ref<string[]>([]);
const message = computed(() => store.state.socket.msg); // computed 自动跟踪响应式的依赖数据
const input_text = ref<string>("");

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
      url: `wss://www.wongansweroj.online:8126/api/ws/ws/${Math.floor(
        Math.random() * 101
      )}`,
    });
  } else {
    console.log("socket existed");
  }
};

const sendMessage = () => {
  if (input_text.value == "") {
    return;
  }
  const data = { type: 1, content: input_text.value };
  store.dispatch("socket/sendMsg", data);
  input_text.value = "";
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
  text-align: center;
}
</style>
