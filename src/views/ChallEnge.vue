<template>
  <div class="bottom">
    <div>challenge</div>
    <div>user info(name,rating)</div>
    <div>可以挑战的人</div>
    <div>等待响应的挑战</div>
    <div>可以响应的挑战</div>
    <div>正在进行的挑战</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import axios from "axios";
onMounted(() => {
  // 向后端请求信息 userid 索引是否能加快数据库的检索？
});
</script>
<style>
.bottom {
  height: 95%;
  background-color: white;
  border-right: none;
}
</style>
