<template>
  <div id="bottom">
    <!-- <ProblemSet /> -->
    <h1>Problem Set</h1>
    <div id="ps">
      <el-card class="problem_set" @click="go_to_problem_set('waoj')">
        <template #header>WAOJ problem set</template>
        <img src="../assets/waoj_logo.jpg" style="width: 100%" />
      </el-card>
      <el-card class="problem_set" @click="go_to_problem_set('codeforces')">
        <template #header>codeforces problem set</template>
        <img src="../assets/cf_logo.png" style="width: 100%" />
      </el-card>
      <el-card class="problem_set" @click="go_to_problem_set('atcoders')">
        <template #header>atcoder problem set</template>
        <img src="../assets/atcoder_logo.png" style="width: 100%" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const go_to_problem_set = (name: string) => {
  console.log(name);
  router.push({ name: "problem_set", params: { oj_name: name } });
};
</script>
<style scoped>
#bottom {
  text-align: center;
  min-height: 100%;
  align-items: center;
}
#ps {
  background-color: white;
  /* width: 1000px; */
  /* padding: 10px; */
  /* height: 100%; */
  display: flex;
  align-items: center; /* 垂直居中对齐内容 */
  justify-content: center; /* 水平居中对齐内容 */
  justify-content: space-evenly;
  align-content: space-around;
}
.problem_set {
  width: 20%;
  height: 400px;
}
</style>
