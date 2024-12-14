<template>
  <!-- 后台API获取数据 v-for渲染  -->
  <div class="bottom">
    <div style="display: flex">
      <h1 style="margin-block-start: 0em">problem</h1>
      <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div
          style="height: 25px; width: 25px; background-color: rgb(0, 114, 0)"
        ></div>
        <h4 style="margin-block-start: 0em">solve</h4>
      </div>
      <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div
          style="
            height: 25px;
            width: 25px;
            background-color: rgb(221.7, 222.6, 224.4);
          "
        ></div>
        <h4 style="margin-block-start: 0em">unsolve</h4>
      </div>
    </div>
    <div
      style="
        background-color: white;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      "
    >
      <div v-for="(i, index) in problem_list" :key="index" :class="i.solve">
        <div class="inline" @click="looktopro(i.problem_id)">
          {{ i.problem_title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { url } from "@/api";
import { validateResponse } from "@/utils/utils";
import axios from "axios";
import { ref, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(); //访问全局变量
const problem_list = ref<ProblemInfo[]>([]);
const problem_id_index_map = new Map<string, number>();
// const route = useRoute();

// const oj_name = route.query.oj_name;

const props = defineProps<{ oj_name: string; problem_total_number: number }>();
interface ProblemInfo {
  problem_id: string;
  problem_title: string;
  solve: string;
  oj_from: string;
}

onMounted(() => {
  console.log(props);
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
        "Content-Type": "application/json, charset=UTF-8",
        Authorization: `Bearer ${store.state.user.token}`,
      },
    };
    const all_problem_request = axios.get(url.GET_ALL_PROBLEM, config);
    const user_problem_request = axios.get(url.GET_USER_PROBLEM_STATUS, config);

    // 使用 Promise.all 等待两个请求都完成
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
const looktopro = (problem_id: string) => {
  window.open(
    router.resolve({
      path: "/aproblempage",
      query: {
        problem_id: problem_id,
      },
    }).href,
    "_blank"
  );
};
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
</style>
