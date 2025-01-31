<template>
  <!-- 后台API获取数据 v-for渲染  -->
  <div class="bottom">
    <div style="display: flex">
      <h1 style="margin-block-start: 0em">problem</h1>
      <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div
          style="
            height: 25px;
            width: 25px;
            background-color: var(--el-color-success-light-9);
          "
        ></div>
        <h4 style="margin-block-start: 0em">solve</h4>
      </div>
      <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div
          style="
            height: 25px;
            width: 25px;
            background-color: var(--el-color-warning-light-9);
          "
        ></div>
        <h4 style="margin-block-start: 0em">attempted</h4>
      </div>
      <!-- <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div style="height: 25px; width: 25px; background-color: #a8abb2"></div>
        <h4 style="margin-block-start: 0em">uncommitted</h4>
      </div> -->
    </div>

    <div
      style="
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      "
    >
      <el-table
        :data="problem_list"
        style="width: 90%"
        :row-style="tableRowStyle"
      >
        <el-table-column
          prop="problem_title"
          label="title"
          width="600"
          align="center"
        >
          <template v-slot="scope">
            <el-text
              class="title"
              type="info"
              size="large"
              @click="looktopro(scope.row)"
            >
              {{ scope.row.problem_title }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="author/source" align="right" />
        <el-table-column prop="created_at" label="created_at" align="right" />
      </el-table>
      <!-- 通过监听当前页向后端重新请求信息 -->
      <div style="display: flex; margin-top: 5px">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="page_size"
          v-model:current-page="page_index"
        />
        <el-select
          v-model="page_size"
          class="m-2"
          size="small"
          style="width: 80px"
        >
          <el-option
            v-for="item in page_size_options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { url } from "@/api";
import { validateResponse } from "@/utils/utils";
import axios from "axios";
import { ref, onMounted, defineProps, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(); //访问全局变量
const problem_list = ref<ProblemInfo[]>([]);
const problem_id_index_map = new Map<string, number>();
// const route = useRoute();

// const oj_name = route.query.oj_name;

const page_index = ref<number>(1);
const page_size = ref<number>(20);

const reverse = ref<boolean>(false); // 此字段暂时不修改，默认倒序排序
const titel_search = ref<string>("");

const props = defineProps<{ oj_name: string; problem_total_number: number }>();
const total = ref<number>(0);
const page_size_options = [10, 20, 30];
interface ProblemInfo {
  problem_id: string;
  problem_title: string;
  solve: string;
  oj_from: string;
  created_at: string;
  source: string;
}

const tableRowStyle = ({
  row,
  rowIndex,
}: {
  row: ProblemInfo;
  rowIndex: number;
}) => {
  // console.log(row.solve);
  if (row.solve === "unsolve") {
    return "";
  } else if (row.solve === "beensolved") {
    return { background: "var(--el-color-success-light-9)" };
  }
  return "";
};

onMounted(() => {
  console.log(props);

  total.value = Number(props.problem_total_number);
  console.log(total.value);
  fetchData()
    .then(() => {
      console.log("fetch data finish");
    })
    .catch((error) => {
      console.log(error);
    });
});

const fetchData = async () => {
  try {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.state.user.token}`,
      },
    };
    const all_problem_request = axios.post(
      url.GET_PROBLEM_TITEL,
      JSON.stringify({
        oj_from: props.oj_name,
        page_size: page_size.value,
        page_index: page_index.value,
        reverse: reverse.value,
        titel_search: titel_search.value,
      }),
      config
    );
    const user_problem_request = axios.get(url.GET_USER_PROBLEM_STATUS, config);

    // 使用 Promise.all 等待两个请求都完成
    problem_list.value.length = 0;
    problem_id_index_map.clear();
    let result_1, result_2, payload_1, payload_2;
    try {
      result_1 = await all_problem_request;
    } catch (error) {
      console.log(`all_problem_request ${error}`);
    } finally {
      if (validateResponse(result_1)) {
        payload_1 = result_1.data.payload;
        console.log(payload_1);
        for (let i = 0; i < payload_1.content.length; i++) {
          let solve = "unsolve";
          if (payload_1.content[i].oj_from == undefined) {
            payload_1.content[i].oj_from = "waoj";
          }
          if (payload_1.content[i].oj_from == props.oj_name) {
            problem_list.value.push({
              problem_id: payload_1.content[i]._id,
              problem_title: payload_1.content[i].problemtitle,
              solve: solve,
              oj_from: payload_1.content[i].oj_from,
              created_at: payload_1.content[i].created_at.slice(
                0,
                "2024-12-15".length
              ),
              source: payload_1.content[i].source,
            });
            problem_id_index_map.set(payload_1.content[i]._id, i);
          }
        }
      }
    }

    try {
      result_2 = await user_problem_request;
    } catch (error) {
      console.log(`all_problem_request ${error}`);
    } finally {
      if (validateResponse(result_2)) {
        payload_2 = result_2.data.payload;
        console.log(payload_2);
        for (let i = 0; i < payload_2.content.length; i++) {
          let solve = "beensolved";
          let problem_index: number =
            problem_id_index_map.get(payload_2.content[i]) ?? -1;
          if (problem_index == -1) {
            continue;
          }
          problem_list.value[problem_index].solve = solve;
        }
      }
    }
  } catch (error) {
    // 处理请求错误
    console.error("请求失败：", error);
  }
};

const router = useRouter();
const looktopro = (problem: ProblemInfo) => {
  // window.open(
  //   router.resolve({
  //     path: "/aproblempage",
  //     query: {
  //       problem_id: problem_id,
  //     },
  //   }).href,
  //   "_blank"
  // );
  let problem_id = problem.problem_id;
  console.log(problem_id);
  router.push({
    name: "aproblempage",
    params: {
      problem_id: problem_id,
    },
  });
};

watch(page_index, (newpage) => {
  console.log(`now_page is ${newpage}`);
  // console.log(now_page.value);
  // get_status();
  fetchData();
});
watch(page_size, (newpagesize) => {
  console.log(`now_page is ${newpagesize}`);
  // console.log(now_page.value);
  // get_status();
  page_index.value = 1;
  fetchData();
});
</script>
<style scoped>
.bottom {
  margin: 10px;
  padding: 10px;
  /* height: 600px; */
  background-color: white;
  /* border-style: solid; */
}

.infinite-list {
  /* height: 550px; */
  height: 85%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.unsolve {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 100px;
  width: 20%;
  padding-left: 10px;
  background: rgb(221.7, 222.6, 224.4);
  margin: 10px;
  color: #303133;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.beensolved {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 20%;
  height: 100px;
  padding-left: 10px;
  background-color: rgb(0, 114, 0);
  margin: 10px;
  color: var(--el-color-primary);
  border: 1px solid #ccc;
  border-radius: 8px;
  color: rgb(0, 0, 0);
}

.inline {
  width: 100%;
  height: 100%;
  /* margin-right: 20px;
  margin-left: 20px; */
  text-align: center;
  /* 水平居中对齐文本 */
  display: flex;
  align-items: center;
  /* 垂直居中对齐内容 */
  justify-content: center;
  /* 水平居中对齐内容 */
}

.unsolve:hover {
  background-color: rgb(0, 114, 0);
  /* 悬停时改变背景颜色 */
  transform: scale(1.05);
  /* 悬停时稍微放大 */
  color: rgb(0, 0, 0);
  /* border-color: #007bff; 悬停时改变边框颜色 */
}

.title {
  /* color: blue; */
}
.title:hover {
  color: rgb(179, 224.5, 156.5);
}
</style>
