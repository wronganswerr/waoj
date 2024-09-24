<template>
  <div>
    <el-menu id="1" mode="horizontal" :default-active="selectedkeys.toString()">
      <div style="padding: 10px">
        <p style="font-size: 20px; font-weight: 900; margin: 10px">WAOJ</p>
      </div>
      <el-menu-item index="/">
        <router-link to="/" class="no-underline">Home</router-link>
      </el-menu-item>
      <el-menu-item index="/problem">
        <router-link to="/problem" class="no-underline">Problem</router-link>
      </el-menu-item>
      <el-menu-item index="/status">
        <router-link to="/status" class="no-underline">Status</router-link>
      </el-menu-item>
      <el-menu-item index="/contest">
        <router-link to="/contest" class="no-underline">Contest</router-link>
      </el-menu-item>
      <el-menu-item index="/challenge">
        <router-link to="/challenge" class="no-underline"
          >Challenge</router-link
        >
      </el-menu-item>
      <el-menu-item index="/chatroom">
        <router-link to="/chatroom" class="no-underline">ChatRoom</router-link>
      </el-menu-item>
      <el-menu-item index="/addproblem" v-if="store.state.user.role > 0">
        <router-link to="/addproblem" class="no-underline"
          >Addproblem</router-link
        >
      </el-menu-item>
      <!-- 控制组件渲染 来展示登录的用户 -->
      <div class="log" v-if="store.state.user.user_id == 0">
        <el-button type="primary" plain @click="chlicklogin">Login</el-button>
        <el-button type="primary" plain @click="chlickregister"
          >Register</el-button
        >
      </div>
      <div class="log" v-else>
        <p style="font-size: 23px">
          {{ store.state.user.name }}
        </p>
        <el-button
          type="primary"
          plain
          style="margin-left: 8px"
          @click="chlicklogout"
          >Logout</el-button
        >
      </div>
    </el-menu>
  </div>
  <el-dialog
    v-model="dialogTableVisiblelogin"
    title="LOGIN"
    center
    width="30%"
    v-if="store.state.user.user_id == 0"
  >
    <LoGin />
  </el-dialog>
  <el-dialog
    v-model="dialogTableVisibleregister"
    title="REGISTER"
    center
    width="30%"
    v-if="store.state.user.user_id == 0"
  >
    <ReGister />
  </el-dialog>
  <div id="buttom">
    <router-view />
  </div>
  <div id="foot">
    <el-link href="https://beian.miit.gov.cn/" target="_blank"
      >浙ICP备2024093265号-1</el-link
    >
  </div>
</template>
<script lang="ts" setup>
import { createLogger, useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";
import LoGin from "./components/loginpage/LoGin.vue";
import ReGister from "./components/loginpage/ReGister.vue";
import { clear_local_user_info, validateResponse } from "./utils/utils";

const dialogTableVisiblelogin = ref(false);
const dialogTableVisibleregister = ref(false);
const store = useStore(); //访问全局变量
const selectedkeys = ref(["/"]);
const router = useRouter();
router.afterEach((to) => {
  selectedkeys.value = [to.path];
});

onMounted(() => {
  document.title = "个人技术学习-WAOJ";
  //组件挂载完后执行
  let info = localStorage.getItem("info"); //取出字符串
  console.log(info);
  if (info == null) return;
  // 发送请求验证token
  store.dispatch("user/getuserinfo", JSON.parse(info as string));
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.user.token}`,
    },
  };
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.check_token}`,
      JSON.stringify({
        user_id: store.state.user.user_id,
      }),
      config
    )
    .then((response) => {
      if (validateResponse(response)) {
        let content = response.data;
        if (content.code != 0) {
          if (content.code == 41001) {
            console.log(content);
            clear_local_user_info(store);
          } else {
            alert("serve error");
          }
          return;
        } else {
          let user_info = {
            name: content.payload.user_info.user_name,
            role: content.payload.user_info.role,
            token: content.payload.token,
            user_id: content.payload.user_info.user_id,
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
        }
      } else {
        store.dispatch("user/getuserinfo", {
          name: "",
          role: 0,
          token: "visitor",
          user_id: 0,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      clear_local_user_info(store);
    });
});

const chlicklogin = () => {
  // 显示一个上浮的登录窗口
  dialogTableVisiblelogin.value = true;
};
const chlickregister = () => {
  // 显示一个上浮的注册窗口
  dialogTableVisibleregister.value = true;
};
const chlicklogout = () => {
  localStorage.clear();
  store.dispatch("user/getuserinfo", {
    name: "",
    role: 0,
    user_id: 0,
    token: "",
  });
  router.push("/");
};
// console.log(store.state.user.name);
</script>
<style>
.log {
  /* margin: 14px 12px 10px 10px; */
  padding: 12px;
  display: flex;
  /* margin: 10px; */
  /* float: right; */
  position: absolute;
  right: 0;
  /* background-color: gray; */
}

.log p {
  margin: 0px;
}

#buttom {
  /* position: relative; */
  margin-top: 8px;
  /* width: 100%; */
  /* height: 80%; */
  min-height: 95vh;
  /* height: 100%; */
  background-color: white;
  display: block;
}

.no-underline {
  text-decoration: none;
  font-size: large;
}

/* .app {
  height: 90%;
} */
body {
  height: 30%;
}

#foot {
  text-align: center;
  bottom: 0px;
}
</style>
