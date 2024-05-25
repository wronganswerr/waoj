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
        <li v-for="(i, index) in problemset" :key="index" :class="i.solve">
          <div class="inline">{{ i.problemtitle }}</div>
          <div class="inline">
            <el-button type="primary" @click="looktopro(i.rid)">Look</el-button>
            <!-- <router-link target="_blank" to="/aproblempage">look</router-link> -->
          </div>
          <!-- 只有当前用户为管理员时显示 -->
          <div class="inline" v-if="store.state.user.user.userrole == 0">
            <el-button type="primary" @click="changetopro(i.rid)"
              >Change</el-button
            >
          </div>
          <div class="inline" v-if="store.state.user.user.userrole == 0">
            <el-button type="primary" @click="deletetopro(i.rid, i.id)"
              >Delete</el-button
            >
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore(); //访问全局变量
const problemset = ref();
let solve = new Set();
onMounted(() => {
  let data = {
    user_id: store.state.user.user.id,
  };
  let config = {
    headers: { "Content-Type": "multipart/json, charset=UTF-8" },
  };
  axios
    .post(
      store.state.behindip.onlineip + "/wronganswer/getproblem/",
      JSON.stringify(data),
      config
    )
    .then((response) => {
      console.log(response);
      if (response.data.state == "Fail") {
        alert("登录后可以查看问题");
      }

      // console.log(problemset.value);
      // problemslitle.value = response.problemset;
      if (store.state.user.user.userrole != -1) {
        problemset.value = response.data.problemset;
        for (let i = 0; i < response.data.problemset.length; i++) {
          problemset.value[i].solve = "unsolve";
        }
        axios
          .get(
            store.state.behindip.onlineip +
              "/wronganswer/getuserstatus?user_id=" +
              store.state.user.user.id
          )
          .then((response) => {
            // console.log(response);
            let sta = response.data.Status; //array 取出solve的problem的id
            // console.log(sta.length);
            for (let i = 0; i < sta.length; i++) {
              if (sta[i]["verdict_id"] == 0) {
                console.log(sta[i]["problem_id"]);
                solve.add(sta[i]["problem_id"]);
              }
            }
            // console.log(solve);
            let tmp = problemset.value;
            for (let i = 0; i < tmp.length; i++) {
              // console.log(toRaw(tmp[i]).rid);
              let rid = toRaw(tmp[i]).rid;
              console.log(rid + " " + solve.has(rid));
              if (solve.has(rid)) {
                // console.log(rid);
                tmp[i].solve = "solve";
              }
            }
            problemset.value = tmp;
          });
      }
    });
  //返回所有该用户的提交，给前端处理
});
const router = useRouter();
const looktopro = (rid: string) => {
  window.open(
    router.resolve({
      path: "/aproblempage",
      query: {
        rid: rid,
      },
    }).href,
    "_blank"
  );
};
// 重现写一个changeproblem页面传入rid,载入数据
// 与addproblem类似
const changetopro = (rid: string) => {
  console.log("change");
  window.open(
    router.resolve({
      path: "/changeproblem",
      query: {
        rid: rid,
      },
    }).href,
    "_blank"
  );
  // router.push({ path: "/changeproblem", query: { rid: rid } });
};
const deletetopro = (rid: string, id: number) => {
  console.log("delete");
  let config = {
    headers: { "Content-Type": "multipart/json, charset=UTF-8" },
  };
  let data = {
    problemid: rid,
  };
  // http://127.0.0.1:8001
  // http://43.143.247.211:8001/
  axios
    .post(
      store.state.behindip.onlineip + "/wronganswer/deletetoproblem/",
      JSON.stringify(data),
      config
    )
    .then((res) => {
      console.log(res);
      // 不刷新页面 更新组件
      // console.log(problemset.value);
      // console.log(typeof problemset.value);
      // problemset.value.delete(id);
      problemset.value.splice(id, 1);
      // console.log(id);
      problemset.value.splice(id - 1, 1);
    });
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
.solve {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  height: 50px;
  padding-left: 10px;
  margin: 10px;
  color: var(--el-color-primary);

  background-color: rgb(142, 230, 142);
}
.inline {
  width: 25%;
  margin-right: 20px;
  margin-left: 20px;
  align-items: center;
}
</style>
