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
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const message_list = ref<string[]>([]);
const message = computed(() => store.state.socket.msg); // computed 自动跟踪响应式的依赖数据
const input_text = ref<string>("");

onMounted(() => {
  //绑定监听事件
  window.addEventListener("keydown", keyDown);
});

onUnmounted(() => {
  //销毁事件
  window.removeEventListener("keydown", keyDown, false);
});

watch(message, (newMessage) => {
  if (newMessage.type === 1) {
    message_list.value.push(newMessage.content);
  }
  console.log(message_list.value);
});

const sendMessage = () => {
  if (input_text.value == "") {
    return;
  }
  const data = { type: 1, content: input_text.value };
  store.dispatch("socket/sendMsg", data);
  input_text.value = "";
};

const keyDown = (e) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    sendMessage();
  }
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
