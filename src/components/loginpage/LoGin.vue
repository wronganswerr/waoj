<template>
  <div id="breakgd">
    <el-row :gutter="20">
      <el-col :span="4">
        <p>用户名</p>
      </el-col>
      <el-col :span="20"
        ><el-input
          class="input"
          v-model="accout"
          placeholder="Please input accout"
      /></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <p>密码</p>
      </el-col>
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
import { validateResponse, anotherUtilityFunction } from "../../utils/utils";

const accout = ref<number>();
const password = ref<string>();
const store = useStore();
const chlicklogin = () => {
  //获取用户名和密码,请求服务区器登录
  // console.log(accout.value);
  // console.log(password.value);
  //http://43.143.247.211:8001/ 服务器公网IP
  //http://127.0.0.1:8001/本地地址
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let data = {
    user_id: Number(accout.value),
    pass_word: String(password.value),
  };
  console.log(data);
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.user_login}`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      console.log(response);
      if (validateResponse(response)) {
        let content = response.data;
        if (content.code != 0) {
          alert(`serve error ${response.data.content.error_message}`);
          return;
        }
        if (content.payload.state != 0) {
          alert("用户名或者密码错误");
          return;
        }
        let user_info = {
          name: content.payload.user_info.user_name,
          role: content.payload.user_info.role,
          token: content.payload.token,
          user_id: content.payload.user_info.user_id,
        };
        store.dispatch("user/getuserinfo", user_info);
        // 持久化到本地
        localStorage.setItem(
          "info",
          JSON.stringify({
            role: store.state.user.role,
            name: store.state.user.name,
            user_id: store.state.user.user_id,
            token: store.state.user.token,
          })
        );
        location.reload();
      } else {
        console.log(response);
        alert("serve error");
      }
    })
    .catch((error) => {
      // console.log(error);
      alert("serve error" + error);
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
