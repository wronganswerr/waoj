<template>
  <div>
    <el-table
      :data="y_one_submition_detil"
      border
      style="width: 100%"
      :cell-style="cellstyle"
    >
      <el-table-column prop="verdict" label="Verdict" />
      <el-table-column prop="runtime" label="Time(ms)" />
      <el-table-column prop="memory" label="Memory(KB)" />
    </el-table>

    <h4>Message</h4>
    <p v-if="y_one_submition_detil.length > 0">
      {{ y_one_submition_detil[0].message }}
    </p>
    <p v-else>No message available.</p>

    <h4>Code</h4>
    <hljsVuePlugin.component
      :language="language"
      :code="submition_diglog_code"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed, watch } from "vue";
import "highlight.js/styles/default.css";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { useStore } from "vuex";
const y_one_submition_detil = ref<SubmitionInfo[]>([]);
const language = ref<string>("");
const submition_diglog_code = ref<string>("");
const store = useStore();
// const message_list = ref<string[]>([]);
const message = computed(() => store.state.socket.msg); // computed 自动跟踪响应式的依赖数据

export interface SubmitionInfo {
  message: string;
  runtime: number;
  memory: number;
  verdict: string;
  hash_id: string;
}

const props = defineProps<{
  code: string;
  language: string;
  one_submition_detil: SubmitionInfo[];
}>();
console.log(props);
onMounted(() => {
  y_one_submition_detil.value = props.one_submition_detil;
  submition_diglog_code.value = props.code;
  language.value = props.language;
});

const cellstyle = ({ row, column }) => {
  // 状态列字体颜色
  if (column.label == "Verdict") {
    if (row.verdict == "ACCEPT") {
      return { color: "green", "font-weight": 800, textAlign: "center" };
    } else if (row.verdict == "WRONG_ANSWER") {
      return { color: "red", "font-weight": 800, textAlign: "center" };
    } else {
      return { color: "#909399", "font-weight": 800, textAlign: "center" };
    }
  } else {
    return { textAlign: "center" };
  }
};

// 在此监听 message 实时更新
watch(message, (newMessage) => {
  // { "type": 2, "content": { "user_id": 1035948731365888, "submition_hash_id": "e89b8f309759a63f0922a18267d35d38", "message": "goooooood" } }

  if (newMessage.type === 2) {
    if (
      newMessage.content.submition_hash_id ===
      y_one_submition_detil.value[0].hash_id
    ) {
      let message_obj = JSON.parse(newMessage.content.message);
      y_one_submition_detil.value[0].message = message_obj.message;
      y_one_submition_detil.value[0].verdict = message_obj.verdict;
      y_one_submition_detil.value[0].runtime = message_obj.runtime;
      y_one_submition_detil.value[0].memory = message_obj.memory;
    }
  }
  // console.log(message_list.value);
});
</script>

<style scoped>
pre {
  font-family: micsoft yahei;
  font-size: 15px;
  color: black;
  /*定义宽度*/
  /*背景色*/
  /*pre文字自动换行*/
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  /*长单词换行下一行*/
  word-wrap: break-word;
  /*两端对齐，最后一样右对齐*/
  text-align: justify;
}
</style>
