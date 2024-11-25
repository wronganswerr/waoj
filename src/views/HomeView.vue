<template>
  <div class="bottom">
    <!-- HELLO -->
    <!-- <img :src="url" alt="loding img failed" /> -->
    <p>这是问题集合，点击即可查看</p>
    <ProblemView />
  </div>
</template>
<!-- 随机图片 ../assets/1.jpg -->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ProblemView from "@/views/ProblemView.vue";

const url = ref("");
onMounted(async () => {
  url.value = require("../assets/" + "1.jpg");
});
</script>
<style scoped>
.bottom {
  width: 100%;
  /* height: 100%; */
  height: 90vh;
  /* background-color: black; */
  /* overflow: hidden; */
  text-align: center;
}
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
