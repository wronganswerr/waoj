<template>
  <div id="bottom">
    <!-- <ProblemSet /> -->
    <h1>Problem Set</h1>
    <div id="ps">
      <el-card class="problem_set" @click="go_to_problem_set('waoj')">
        <template #header
          >WAOJ problem set({{ oj_problem_number?.waoj }})</template
        >
        <img src="../assets/waoj_logo.jpg" style="width: 100%" />
      </el-card>
      <el-card class="problem_set" @click="go_to_problem_set('codeforces')">
        <template #header
          >codeforces problem set({{ oj_problem_number?.codeforces }})</template
        >
        <img src="../assets/cf_logo.png" style="width: 100%" />
      </el-card>
      <el-card class="problem_set" @click="go_to_problem_set('atcoder')">
        <template #header
          >atcoder problem set({{ oj_problem_number?.atcoder }})</template
        >
        <img src="../assets/atcoder_logo.png" style="width: 100%" />
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { validateResponse } from "@/utils/utils";
import { url } from "@/api";
const router = useRouter();
const store = useStore();

interface OjProblemNumber {
  waoj: number;
  codeforces: number;
  atcoder: number;
}

const oj_problem_number = ref<OjProblemNumber>();
let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.state.user.token}`,
  },
};

onMounted(() => {
  axios.get(url.GET_PROBLEM_NUMBER, config).then((response) => {
    if (validateResponse(response)) {
      let content = response.data;
      if (content.code != 0) {
        if (content.code == 41001) {
          console.log(content);
        } else {
          alert("serve error");
        }
        return;
      } else {
        let payload = content.payload;
        oj_problem_number.value = payload.content[0];
      }
    }
  });
});

const go_to_problem_set = (name: keyof OjProblemNumber) => {
  if (oj_problem_number.value) {
    router.push({
      name: "problem_set",
      params: {
        oj_name: name,
        problem_total_number: oj_problem_number.value[name],
      },
    });
  }
};
</script>
<style scoped>
#bottom {
  text-align: center;
  /* height: 1000px; */
  /* align-items: center; */
  /* justify-content: center; */
  align-items: center;
  height: 80vh;
}

img {
  max-width: 100%;
  height: auto;
}

#ps {
  background-color: white;
  /* width: 1000px; */
  /* padding: 10px; */
  height: 100%;
  display: flex;
  align-items: center;
  /* 垂直居中对齐内容 */
  justify-content: center;
  /* 水平居中对齐内容 */
  justify-content: space-evenly;
  align-content: space-around;
  /* margin-top: 100px; */
}

.problem_set {
  width: 20%;
  height: 60%;
  /* height: 50vh; */
}
</style>
