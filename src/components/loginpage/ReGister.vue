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
    <el-row :gutter="20">
      <el-col :span="4">
        <p>手机号(作为找回密码的凭证)</p>
      </el-col>
      <el-col :span="20"
        ><el-input
          class="input"
          v-model="phone_number"
          placeholder="Please input phone number"
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
import { validateResponse } from "../../utils/utils";
import { url } from "@/api";
const accout = ref<string>("");
const password = ref<string>("");
const phone_number = ref<string>("");

const store = useStore();

function isNumeric(str: string): boolean {
  const regex = /^\d+$/;
  return regex.test(str);
}

const check_data = () => {
  if (
    accout.value.includes(" ") ||
    password.value.includes(" ") ||
    phone_number.value.includes(" ")
  ) {
    alert("用户名或密码或电话号码存在空格");
    return false;
  }

  if (password.value.length < 6) {
    alert("密码长度小于6");
    return false;
  }

  if (phone_number.value.length < "18257963947".length) {
    alert("电话号码长度不正确");
    return false;
  }

  if (!isNumeric(phone_number.value)) {
    alert("电话号码不允许出现数字以外的其他字符");
    return false;
  }

  return true;
};

const chlick = () => {
  let config = {
    headers: { "Content-Type": "application/json" },
  };

  if (!check_data()) {
    return;
  }
  let data = {
    user_name: accout.value,
    pass_word: password.value,
    phone_number: phone_number.value,
  };
  axios
    .post(url.USER_REGISTER, JSON.stringify(data), config)
    .then((response) => {
      if (!validateResponse(response)) {
        return;
      }
      let payload = response.data.payload;
      console.log(payload);
      if (payload.state === 0) {
        // console.log(response.data); //成功直接登录
        let user_info = {
          name: payload.user_info.user_name,
          role: payload.user_info.role,
          token: payload.token,
          user_id: payload.user_info.user_id,
        };
        store.dispatch("user/getuserinfo", user_info);
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
