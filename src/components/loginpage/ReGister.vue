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
    @click="chlick"
    style="display: block; margin: 0 auto"
    >Register</el-button
  >
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { validateResponse, anotherUtilityFunction } from "../../utils/utils";
import { vLoading } from "element-plus";
const accout = ref();
const password = ref();
const store = useStore();

const chlick = () => {
  //获取用户名和密码,请求服务器登录
  // console.log(accout.value);
  // console.log(password.value);
  // axios.defaults.baseURL = "/proxy_url";
  //http://43.143.247.211:8001/ 服务器公网IP 带端口号
  //http://127.0.0.1:8001/
  let config = {
    headers: { "Content-Type": "application/json, charset=UTF-8" },
  };
  let data = {
    user_name: accout.value,
    pass_word: password.value,
  };

  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.user_register}`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (!validateResponse(response)) {
        return;
      }
      let content = response.data.content;
      if (content.code === 0) {
        // console.log(response.data); //成功直接登录
        store.dispatch("user/getuserinfo", content.payload);
        localStorage.setItem(
          "info",
          JSON.stringify({
            role: store.state.user.role,
            name: store.state.user.name,
            user_id: store.state.user.user_id,
            token: store.state.user.token,
          })
        );
      } else {
        // 登录失败则清空内容;提示
        alert("用户名重复或密码为空");
        accout.value = "";
        password.value = "";
      }
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
