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
  <el-dialog v-model="submition_diglog_vis" title="SUBMITION">
    <highlightjs :language="lange" :code="code" />
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { validateResponse } from "../../utils/utils";
// import { checkTagEmits } from "element-plus";
const code = ref("");
const submition_diglog_code = ref<string>("");
const buts = ref(true);
const lange = ref();
const props = defineProps<{ problemid: string; oj_form: string }>();
const store = useStore(); //store.state.user.username
const options = ["cpp", "python"];
const submition_diglog_vis = ref<boolean>(false);
const one_submition_detil = ref([]);
// 内容为空时禁用
watch(code, (newcode) => {
  if (newcode != "" || newcode.length >= 5000) {
    buts.value = false;
  } else {
    buts.value = true;
  }
});

function init_submition_diglog() {
  console.log("hh");
}

watch(submition_diglog_vis, (new_value) => {
  if (new_value) {
    init_submition_diglog();
  } else {
    return;
  }
});

function check_user(): boolean {
  if (store.state.user.role === 0) {
    return false;
  }
  return true;
}

const submit = () => {
  if (!check_user()) {
    alert("注册后可以提交代码");
    return;
  }

  if (props.oj_form != "waoj") {
    alert("第三方OJ提交开发中。。。");
    return;
  } else {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.state.user.token}`,
      },
    };

    buts.value = true; //按钮置为不可用

    // problem_id: str
    // code: str
    // language: str
    // online_oj_choose:str = 'waoj'
    let data = {
      code: code.value,
      language: lange.value,
      problem_id: props.problemid,
      online_oj_choose: "waoj",
    };
    // console.log("submit");
    // 发送axios请求
    // http://127.0.0.1:8001/wronganswer/judgeproblem/
    // http://43.143.247.211:8001/wronganswer/judgeproblem/
    console.log(data);
    axios
      .post(
        `${store.state.behindip.onlineip}${store.state.behindip.submit_problem}`,
        JSON.stringify(data),
        config
      )
      .then((response) => {
        if (!validateResponse(response)) {
          // 服务端错误时需要跳转至home
          alert("serve is error please report to developer");
          return;
        }
        // let info = localStorage.getItem("info");
        let payload = response.data.payload;
        console.log(payload);
        if (payload.state === 0) {
          alert(payload.message);
          console.log(payload);
        } else {
          // router.push("/status");
          submition_diglog_code.value = code.value;
          code.value = "";
          submition_diglog_vis.value = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

watch(
  () => props.problemid,
  (newVal, oldVal) => {
    console.log(`problemid changed from ${oldVal} to ${newVal}`);
  }
);
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
