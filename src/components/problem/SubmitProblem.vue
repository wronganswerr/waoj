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
    <SubmissionPage
      v-if="submition_diglog_vis"
      :language="lange"
      :code="submition_diglog_code"
      :one_submition_detil="one_submition_detil"
    />
  </el-dialog>
</template>
<script setup lang="ts">
import SubmissionPage from "./SubmissionPage.vue";
import { SubmitionInfo } from "./SubmissionPage.vue";
import { ref, defineProps, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { validateResponse } from "../../utils/utils";
import { url } from "@/api";
import { defineEmits } from "vue";

const emit = defineEmits(["childEvent"]);

const code = ref("");
const submition_diglog_code = ref<string>("");
const buts = ref(false);
const lange = ref("cpp");
const props = defineProps<{ problemid: string; oj_form: string }>();
const store = useStore(); //store.state.user.username
const options = ["cpp", "python"];
const submition_diglog_vis = ref<boolean>(false);
const one_submition_detil = ref<Array<SubmitionInfo>>([]);

// 内容为空时禁用
watch(code, (newcode) => {
  if (newcode != "" || newcode.length >= 5000) {
    buts.value = false;
  } else {
    buts.value = true;
  }
});

function check_user(): boolean {
  if (store.state.user.role === 0) {
    return false;
  }
  return true;
}

function sendMessageToParent(message) {
  emit("childEvent", message);
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

    let data = {
      code: code.value,
      language: lange.value,
      problem_id: props.problemid,
      online_oj_choose: "waoj",
    };

    submition_diglog_code.value = code.value;
    axios
      .post(url.SUBMIT_PROBLEM, JSON.stringify(data), config)
      .then((response) => {
        if (!validateResponse(response)) {
          // 服务端错误时需要跳转至home
          alert("serve is error please report to developer");
          return;
        }
        let payload = response.data.payload;
        if (payload.state === 0) {
          alert(payload.message);
        } else {
          // router.push("/status");
          let message_obj = JSON.parse(payload.message);
          console.log(message_obj);
          console.log(message_obj.hash_id);

          one_submition_detil.value = [
            {
              message: message_obj.message,
              runtime: 0,
              memory: 0,
              verdict: message_obj.verdict,
              hash_id: message_obj.hash_id,
            },
          ];
          console.log(one_submition_detil.value);
          sendMessageToParent(one_submition_detil.value);
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
<style scoped>
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
