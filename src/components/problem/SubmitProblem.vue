<template>
  <!-- <h1>提交区域</h1> -->
  <div id="input">
    <div id="head">
      <h3>Language</h3>
      <el-select
        v-model="lange"
        class="m-2"
        placeholder="Select language"
        style="width: 480px"
      >
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>

    <el-input
      v-model="code"
      :rows="15"
      type="textarea"
      placeholder="Please input code"
    />
    <div style="align-items: center; justify-content: center; display: flex">
      <el-button id="but" type="primary" :disabled="buts" @click="submit"
        >SUBMIT</el-button
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const code = ref("");
const buts = ref(true);
const lange = ref();
const props = defineProps(["submitproblemid", "submitproblemtitle"]);
const store = useStore(); //store.state.user.username
const router = useRouter(); //跳转至提交页面
const options = ["C++", "Python3"];
// 内容为空时禁用
watch(code, (newcode) => {
  console.log(newcode);
  if (newcode != "") {
    buts.value = false;
  } else {
    buts.value = true;
  }
});
const submit = () => {
  let config = {
    headers: { "Content-Type": "multipart/json, charset=UTF-8" },
  };
  buts.value = true; //按钮置为不可用
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let data = {
    code: code.value,
    user_id: store.state.user.id,
    submitwhen:
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds,
    submitlang: lange.value,
    submitproblemid: props.submitproblemid,
    submitproblemtitle: props.submitproblemtitle,
    runtime: 0,
    runmemort: 0,
    verdict: "in queue",
  };
  // console.log("submit");
  // 发送axios请求
  // http://127.0.0.1:8001/wronganswer/judgeproblem/
  // http://43.143.247.211:8001/wronganswer/judgeproblem/
  axios
    .post(
      store.state.behindip.onlineip + "/wronganswer/judgeproblem/",
      JSON.stringify(data),
      config
    )
    .then((response) => {
      // let info = localStorage.getItem("info");
      data = response.data.json();
      console.log(data);
      if (data["state"] == 0) {
        alert(data["mes"]);
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  router.push("/status");
};
</script>
<style>
#head {
  margin-bottom: 10px;
  display: flex;
}
#head h3 {
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-right: 10px;
}
#input {
  /* height: 400px; */
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  margin: 10px;
  background-color: white;
}
#but {
  margin: 10px;
}
</style>
