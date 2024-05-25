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
            prop="id"
            label="id"
            show-overflow-tooltip
            min-width="20%"
          />
          <el-table-column prop="submitwhen" label="when" min-width="90%" />
          <el-table-column prop="submitproblemtitle" label="Problem" />
          <el-table-column prop="submituser" label="who" />
          <el-table-column prop="submitlang" label="lang" />
          <el-table-column prop="verdict" label="Verdict" />
          <el-table-column prop="message" label="Message" min-width="100" />
          <el-table-column prop="runtime" label="Time" />
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
          :page-size="10"
          v-model:current-page="nowpage"
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
const store = useStore();
const statusset = ref(); //向后端发送请求 只请求前10条信息
const total = ref(0);
const nowpage = ref(1);
const vis = ref(false);
const code = ref();
// const totalpage = ref();
onMounted(() => {
  // 发送axios请求 post
  // http://127.0.0.1:8001/wronganswer/getstatus/
  // http://43.143.247.211:8001/wronganswer/getstatus/
  axios
    .get(
      store.state.behindip.onlineip +
        "/wronganswer/getstatus?page=" +
        nowpage.value.toString()
    )
    .then((response) => {
      console.log(response.data);
      statusset.value = response.data.statusset; //数组类型
      total.value = response.data.total;
      // console.log(total.value);
      // console.log(statusset.value.length);
    });
});
// 监听变量 或者 调用分页组件的方法
watch(nowpage, (newpage) => {
  console.log(`nowpage is ${newpage}`);
  // console.log(nowpage.value);
  axios
    .get(
      store.state.behindip.onlineip +
        "/wronganswer/getstatus?page=" +
        nowpage.value.toString()
    )
    .then((response) => {
      // console.log(response);
      statusset.value = response.data.statusset; //数组类型
      total.value = response.data.total;
      // console.log(statusset.value.length);
      // problemslitle.value = response.problemset;
    });
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
    if (row.verdict == "Accept") {
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
