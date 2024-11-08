<template>
  <div class="profile">
    <!-- <h2>{{ profile.name }} 的个人信息</h2> -->
    <ul>
      <li><strong>Name :</strong> {{ profile.codeforces }}</li>
      <li><strong>Rating :</strong> {{ 0 }}</li>
      <li><strong>SolveProblem :</strong> {{ 0 }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.profile {
  /* border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto; */
}

h2 {
  margin-bottom: 16px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
}
</style>
