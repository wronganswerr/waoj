<template>
  <div id="breakgd">
    <el-row :gutter="20">
      <el-col :span="4"><p>用户名</p></el-col>
      <el-col :span="20"
        ><el-input
          class="input"
          v-model="accout"
          placeholder="Please input accout"
      /></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><p>密码</p></el-col>
      <el-col :span="20"
        ><el-input
          class="input"
          v-model="password"
          placeholder="Please input password"
      /></el-col>
    </el-row>
  </div>
  <el-button
    type="primary"
    @click="chlicklogin"
    style="display: block; margin: 0 auto"
    >Login</el-button
  >
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
const accout = ref();
const password = ref();
const store = useStore();
const chlicklogin = () => {
  //获取用户名和密码,请求服务区器登录
  // console.log(accout.value);
  // console.log(password.value);
  //http://43.143.247.211:8001/ 服务器公网IP
  //http://127.0.0.1:8001/本地地址
  let config = {
    headers: { "Content-Type": "multipart/json, charset=UTF-8" },
  };
  let data = {
    name: accout.value,
    password: password.value,
  };
  axios
    .post(
      store.state.behindip.onlineip + "/wronganswer/login/",
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (response.data.state === "OK") {
        // console.log(response.data);
        // 返回userid
        store.dispatch("user/getuserinfo", response.data);
        localStorage.setItem(
          "info",
          JSON.stringify({
            role: response.data.role,
            name: accout.value,
            id: response.data.id,
          })
        );
        // let info = localStorage.getItem("info");
        // console.log(info);
        location.reload();
      } else {
        // 登录失败则清空内容;
        accout.value = "";
        password.value = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<style>
.input {
  margin: 10px;
  padding: 0px;
}
#breakgd {
  padding: 10px;
}
</style>
