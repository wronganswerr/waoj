<template>
  <div class="bottom">
    <!-- <div style="margin-top: 10px; margin-left: 10px; background-color: white">
      
    </div> -->
    <div id="status">
      <h1 style="margin-block-start: 0em; margin-block-end: 0.5em">Status</h1>
      <!-- #code
    # submituser
    # submitwhen
    # submitlang
    # submitproblemid
    # submitproblemtitle
    # runtime
    # runmemort
    # verdict -->
      <div style="overflow: auto">
        <el-table
          :data="statusset"
          border
          style="width: 100%"
          :cell-style="cellstyle"
        >
          <el-table-column
            prop="when"
            label="when"
            min-width="100"
            show-overflow-tooltip
          />
          <el-table-column
            prop="problem_title"
            label="Problem"
            show-overflow-tooltip
          />
          <el-table-column prop="name" label="who" show-overflow-tooltip />
          <el-table-column prop="language" label="lang" />
          <el-table-column prop="verdict" label="Verdict" width="320" />
          <el-table-column
            prop="message"
            label="Message"
            min-width="100"
            show-overflow-tooltip
          />
          <el-table-column prop="runtime" label="Time(ms)" />
          <el-table-column prop="memory" label="Memory(KB)" />
          <!-- <el-table-column prop="runmemort" label="Memory" /> -->
          <!-- 对话框显示代码 -->
          <el-table-column label="Code">
            <template v-slot="scope">
              <el-button link type="primary" @click="lookcode(scope.$index)"
                >Code</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <!-- 通过监听当前页向后端重新请求信息 -->
        <el-pagination
          style="margin: 10px"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="page_size"
          v-model:current-page="now_page"
        />
      </div>
    </div>
  </div>
  <el-dialog v-model="vis" title="Code">
    <!-- <p>{{ code }}</p> -->
    <pre>{{ code }}</pre>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { validateResponse } from "@/utils/utils";
const store = useStore();
const statusset = ref(); //向后端发送请求 只请求前10条信息
const total = ref(0);
const now_page = ref(1);
const vis = ref(false);
const code = ref();
// const totalpage = ref();
const page_size = ref<number>(25);
const user_self = ref<boolean>(false);

const get_status = () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.user.token}`,
    },
  };
  let data = {
    user_self: user_self.value,
    page_size: page_size.value,
    now_page: now_page.value,
  };
  console.log(data);
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.get_status}`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      console.log(response.data);
      if (validateResponse(response)) {
        let payload = response.data.payload;
        statusset.value = payload.content;
        total.value = payload.size;
      } else {
        alert();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  get_status();
});
// 监听变量
watch(now_page, (newpage) => {
  console.log(`now_page is ${newpage}`);
  // console.log(now_page.value);
  get_status();
});
const lookcode = (id: number) => {
  console.log(statusset.value[id].code);
  // 后端开放一个api请求url 返回文件
  vis.value = true;
  code.value = statusset.value[id].code;
  // 对话框
};
const cellstyle = ({ row, column }) => {
  // 状态列字体颜色
  // console.log(columnIndex);
  if (column.label == "Verdict") {
    // console.log(row.verdict);
    if (row.verdict == "ACCEPT") {
      return { color: "green", "font-weight": 800 };
    } else {
      return { color: "red", "font-weight": 800 };
    }
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
#status {
  margin: 10px;
  min-height: 600px;
  /* height: 70%; */
  background-color: white;
  padding: 10px;
}
.inline {
  /* width: 250px; */
  margin-right: 10px;
  margin-left: 10px;
  align-items: center;
}
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
