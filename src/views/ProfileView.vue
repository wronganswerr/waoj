<template>
  <div class="main">
    <div style="width: 70%">
      <h1>{{ profileData.name }}</h1>
      <div>
        
      </div>
      <div class="echarts">
        <Echarts></Echarts>
      </div>
    </div>
    <div
      style="
        width: 30%;
        /* background-color: red; */
        padding: 10px;
        display: flex;
        justify-content: center;
      "
    >
      <div
        style="
          max-width: 70%;
          height: 70%;
          border: 1px solid #ccc;
          justify-content: center;
          align-items: center;
          padding: 10px;
        "
      >
        <img src="../assets/1.jpg" alt="loding img failed" />
        <div style="display: flex; height: 5%; justify-content: center">
          <el-link> Change photo </el-link>
          |<el-link> Unset photo </el-link>
        </div>
      </div>
    </div>
  </div>
  <div class="headle">
    <h2>codeforces</h2>
  </div>
  <div class="OneOJProfile">
    <Profile :profile="profileData" />
  </div>
  <div class="headle">
    <h2>VJ</h2>
  </div>
  <div class="OneOJProfile">
    <Profile :profile="profileData" />
  </div>
  <div class="headle">
    <h2>newcode</h2>
  </div>
  <div class="OneOJProfile">
    <Profile :profile="profileData" />
  </div>
  <div class="headle">
    <h2>atcoder</h2>
  </div>
  <div class="OneOJProfile">
    <Profile :profile="profileData" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Profile from "@/components/UserProfile.vue";
import Echarts from "@/components/LineChart.vue";

const profileData = reactive({
  name: "wronganswer",
  niuke: "yrtwd",
  codeforces: "yrtwd",
  waoj: "yrtwd",
  vjudge: "yrtwd",
  atcoder: "byh",
  luogu: "yrtwd_byh",
});
</script>

<style scoped>
.OneOJProfile {
  width: 80%;
  /* 设置宽度为80%，可以根据需要调整 */
  margin: 20px auto;
  /* 上下边距为0，左右边距为auto，使其水平居中 */
  padding: 16px;
  /* 添加一些内边距 */
  /* background-color: #f5f5f5;  */
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.headle {
  width: 80%;
  margin: 0px auto;
}

.main {
  width: 80%;
  margin: 10px auto;
  display: flex;
  /* background-color: red; */
  padding: 16px;
  /* 添加一些内边距 */
  /* background-color: #f5f5f5;  */
  border: 1px solid #ccc;
  height: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 100%;
  height: 95%;
  margin: 0px auto;
}

.echarts {
  width: 90%;
  margin: 0px auto;
  margin-top: 40px;

  /* position: absolute; */
  /* bottom: 0; */
}
</style>
