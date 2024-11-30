<template>
  <div class="bottom">
    <!-- <div style="margin-top: 10px; margin-left: 10px; background-color: white">
      
    </div> -->
    <div id="status">
      <div style="display: flex">
        <h1
          style="
            margin-block-start: 0em;
            margin-block-end: 0.5em;
            margin-right: 20px;
          "
        >
          Status
        </h1>
        <el-switch
          v-model="only_my_self"
          size="large"
          active-text="只看自己的提交"
          style="right: 0"
        />
      </div>
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
          <el-table-column prop="when" label="when" min-width="100">
            <template #default="scope">
              <span>{{ formatDate(scope.row.when) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="problem_title" label="Problem" />
          <el-table-column prop="name" label="who" />
          <el-table-column prop="language" label="lang" />
          <el-table-column prop="verdict" label="Verdict" />
          <!-- <el-table-column
            prop="message"
            label="Message"
            min-width="100"
            show-overflow-tooltip
          /> -->
          <!-- <el-table-column prop="runtime" label="Time(ms)" /> -->
          <!-- <el-table-column prop="memory" label="Memory(KB)" /> -->
          <!-- <el-table-column prop="runmemort" label="Memory" /> -->
          <!-- 对话框显示代码 -->
          <el-table-column label="Code" width="100">
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
    <el-table
      :data="one_submition_detil"
      border
      style="width: 100%"
      :cell-style="cellstyle"
    >
      <el-table-column prop="message" label="Message" min-width="100" />
      <el-table-column prop="runtime" label="Time(ms)" />
      <el-table-column prop="memory" label="Memory(KB)" />
    </el-table>

    <highlightjs :language="language" :code="code" />
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
const language = ref();
// const totalpage = ref();
const page_size = ref<number>(25);
const user_self = ref<boolean>(false);
const one_submition_detil = ref();
const only_my_self = ref<boolean>(false);
let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.state.user.token}`,
  },
};
let all_user_submition_list = [];
const get_status = () => {
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
        all_user_submition_list = payload.content;
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
// watch(only_my_self, (new_value) => {
//   if (new_value) {
//   } else {
//   }
// });
const lookcode = (id: number) => {
  console.log(statusset.value[id].hash_id);
  console.log(statusset.value[id].language);
  one_submition_detil.value = [];
  one_submition_detil.value = [
    {
      message: statusset.value[id].message,
      runtime: statusset.value[id].runtime,
      memory: statusset.value[id].memory,
    },
  ];
  // 后端开放一个api请求url 返回文件
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.get_submition_code}`,
      JSON.stringify({
        hash_id: statusset.value[id].hash_id,
      }),
      config
    )
    .then((response) => {
      // console.log(response.data);
      if (validateResponse(response)) {
        let payload = response.data.payload;
        if (payload.status == "OK") {
          language.value = `${statusset.value[id].language}`;
          code.value = payload.code;
        } else {
          code.value = "unfind";
        }
        vis.value = true;
      } else {
        alert();
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
const formatDate = (dateString) => {
  return dateString.replace("T", " ");
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
