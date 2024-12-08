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
            background-color: rgb(142, 230, 142);
          "
        ></div>
        <h4 style="margin-block-start: 0em">solve</h4>
      </div>
      <div style="display: flex; margin-top: 20px; margin-left: 20px">
        <div style="height: 25px; width: 25px; background-color: #ecf5ff"></div>
        <h4 style="margin-block-start: 0em">unsolve</h4>
      </div>
    </div>
    <div style="background-color: white; height: 100%">
      <!-- <el-scrollbar height="400px">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
          {{ item }}
        </p>
      </el-scrollbar> -->
      <div>
        <li v-for="(i, index) in problem_list" :key="index" :class="i.solve">
          <div class="inline">{{ i.problem_title }}</div>
          <div class="inline">
            <el-button type="primary" @click="looktopro(i.problem_id)"
              >Look</el-button
            >
            <!-- <router-link target="_blank" to="/aproblempage">look</router-link> -->
          </div>
          <!-- 只有当前用户为管理员时显示 -->
          <div class="inline" v-if="store.state.user.role == 1">
            <el-button type="primary" @click="changetopro(i.problem_id)"
              >Change</el-button
            >
          </div>
          <div class="inline" v-if="store.state.user.role == 1">
            <el-button type="primary" @click="deletetopro(i.problem_id, index)"
              >Delete</el-button
            >
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { validateResponse } from "@/utils/utils";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(); //访问全局变量
const problem_list = ref<ProblemInfo[]>([]);
const problem_id_index_map = new Map<string, number>();

interface ProblemInfo {
  problem_id: string;
  problem_title: string;
  solve: string;
}

onMounted(() => {
  if (store.state.user.role != 1) {
    router.push("home");
    return;
  }
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
    const all_problem_request = axios.get(
      `${store.state.behindip.onlineip}${store.state.behindip.get_all_problem}`,
      config
    );
    const user_problem_request = axios.get(
      `${store.state.behindip.onlineip}${store.state.behindip.get_user_problem_status}`,
      config
    );

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
          problem_list.value.push({
            problem_id: payload_1.content[i]._id,
            problem_title: payload_1.content[i].problemtitle,
            solve: solve,
          });
          problem_id_index_map.set(payload_1.content[i]._id, i);
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
// 重现写一个changeproblem页面传入rid,载入数据
// 与addproblem类似
const changetopro = (problem_id: string) => {
  console.log("change");
  window.open(
    router.resolve({
      path: "/changeproblem",
      query: {
        problem_id: problem_id,
      },
    }).href,
    "_blank"
  );
  // router.push({ path: "/changeproblem", query: { rid: rid } });
};

const deletetopro = (problem_id: string, id: number) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.user.token}`,
    },
  };
  let data = {
    problem_id: problem_id,
  };
  // http://127.0.0.1:8001
  // http://43.143.247.211:8001/
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.delete_problem}`,
      JSON.stringify(data),
      config
    )
    .then((res) => {
      console.log(res);
      // 不刷新页面 更新组件
      problem_list.value.splice(id, 1);
    })
    .catch((error) => {
      console.log(error);
    });

  // const [result1, result2] = await Promise.all([response1, response2]);
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
  height: 50px;
  padding-left: 10px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.beensolved {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 50px;
  padding-left: 10px;
  background-color: rgb(142, 230, 142);
  margin: 10px;
  color: var(--el-color-primary);
}

.inline {
  width: 25%;
  margin-right: 20px;
  margin-left: 20px;
  align-items: center;
}
</style>
