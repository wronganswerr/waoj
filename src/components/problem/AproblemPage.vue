<template>
  <div style="display: flex">
    <div id="backgroud">
      <div id="title">
        <h1
          style="margin-block-start: 0em; margin-block-end: 0em; font-size: 2em"
        >
          {{ problemtitle }}
        </h1>
        <h5>timelimit:{{ timelimit }}S</h5>
        <h5>memorylimit:{{ memorylimit }}MB</h5>
      </div>
      <div id="main">
        <mavon-editor
          style="min-height: auto"
          v-model="problemmain"
          :subfield="false"
          :defaultOpen="'preview'"
          :editable="false"
          :toolbarsFlag="false"
        >
        </mavon-editor>
      </div>
      <h3
        style="
          margin-left: 10px;
          margin-block-start: 0em;
          margin-block-end: 0em;
        "
      >
        Input
      </h3>
      <div id="inputd">
        <mavon-editor
          style="min-height: auto"
          v-model="inputdescribe"
          :subfield="false"
          :defaultOpen="'preview'"
          :editable="false"
          :toolbarsFlag="false"
        >
        </mavon-editor>
      </div>
      <h3
        style="
          margin-left: 10px;
          margin-block-start: 0em;
          margin-block-end: 0em;
        "
      >
        Output
      </h3>
      <div id="outputd">
        <mavon-editor
          style="min-height: auto"
          v-model="outputdescribe"
          :subfield="false"
          :defaultOpen="'preview'"
          :editable="false"
          :toolbarsFlag="false"
        >
        </mavon-editor>
      </div>
      <h3
        style="
          margin-left: 10px;
          margin-block-start: 0em;
          margin-block-end: 0em;
        "
      >
        Example
      </h3>
      <div id="sample">
        <div id="text" v-for="(i, index) in example" :key="index">
          <p style="margin: 2px">input</p>
          <p style="background-color: rgb(222, 225, 200); margin: 5px">
            {{ i["input"] }}
          </p>
          <p style="margin: 2px">output</p>
          <p style="margin: 5px; background-color: rgb(222, 225, 200)">
            {{ i["output"] }}
          </p>
        </div>
        <div></div>
      </div>
      <div>
        <SubmitProblem
          :problemid="down_problemid"
          :oj_form="oj_from"
          @childEvent="handleChildEvent"
        />
      </div>
    </div>
    <el-affix style="margin-left: 10px; width: 20%" :offset="60">
      <div id="Lastsubmissions">
        <h3>Last submissions</h3>
        <p v-if="store.state.user.userrole == -1">登录后查看</p>
        <p v-else>{{ store.state.user.username }}</p>
        <!-- 你好 xxx -->
        <div>
          <el-table
            :data="theprosta"
            style="width: 100%; text-align: center"
            :cell-style="cellstyle"
            :header-cell-style="headerCellStyle"
            border
          >
            <el-table-column prop="verdict" label="Verdict">
              <template v-slot="scope">
                <a @click="lookcode(scope.$index)">
                  {{ scope.row.verdict }}
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-affix>
  </div>
  <el-dialog v-model="vis" title="Submission">
    <SubmissionPage
      v-if="vis"
      :code="code"
      :language="language"
      :one_submition_detil="one_submition_detil"
    />
  </el-dialog>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import SubmitProblem from "@/components/problem/SubmitProblem.vue";
import { validateResponse } from "../../utils/utils";
import router from "@/router";
import { url } from "@/api";
import SubmissionPage from "./SubmissionPage.vue";

// 父组件向子组件传参？路由跳转时传参
const route = useRoute();

const problemtitle = ref("");
const problemmain = ref("");
const timelimit = ref(1);
const memorylimit = ref(256);
const inputdescribe = ref("");
const outputdescribe = ref("");
const example = ref();
const theprosta = ref();
const store = useStore(); //store.state.user.username
const oj_from = ref("waoj");
// const text = ref("$a$");
let problem_id = route.query.problem_id;
// console.log(route.query.rid);

const down_problemid = ref("1");

const language = ref();
const vis = ref(false);
const code = ref(`cout<<"WELCOME TO WAOJ"<<"\\n"`);
const one_submition_detil = ref();

let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.state.user.token}`,
  },
};

onMounted(() => {
  down_problemid.value = String(problem_id);
  console.log(`problem_id ${down_problemid.value}`);

  let data = {
    problem_id: problem_id,
  };
  axios
    .post(url.GET_PROBLEM_DETAIL, JSON.stringify(data), config)
    .then((response) => {
      if (!validateResponse(response)) {
        // 服务端错误时需要跳转至home
        router.push("/");
        return;
      }
      let payload = response.data.payload;
      problemtitle.value = payload.problemtitle;
      problemmain.value = payload.problemmain;
      inputdescribe.value = payload.inputdescribe;
      outputdescribe.value = payload.outputdescribe;
      timelimit.value = payload.timelimit;
      memorylimit.value = payload.memorylimit;
      example.value = payload.example;
      oj_from.value = payload.oj_from;
    })
    .catch((error) => {
      console.log(error);
    });
  if (store.state.user.role > 0) {
    let data = {
      problem_id: problem_id?.toString(),
    };
    axios
      .post(url.GET_USER_A_PROBLEM_STATUS, JSON.stringify(data), config)
      .then((response) => {
        if (validateResponse(response)) {
          let payload = response.data.payload;
          // 展示最近10条提交
          console.log(payload.content.slice(0, 10));
          theprosta.value = payload.content.slice(0, 10);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
const cellstyle = ({ row, column }) => {
  // 状态列字体颜色
  // console.log(columnIndex);
  if (column.label == "Verdict") {
    // console.log(row.verdict);
    if (row.verdict == "ACCEPT") {
      return { color: "green", "font-weight": 800, textAlign: "center" };
    } else {
      return { color: "red", "font-weight": 800, textAlign: "center" };
    }
  } else {
    return { textAlign: "center" };
  }
};
const headerCellStyle = () => {
  return {
    textAlign: "center",
  };
};

function handleChildEvent(message) {
  theprosta.value.unshift(...message);
  if (theprosta.value.length > 10) {
    theprosta.value = theprosta.value.slice(0, 10);
  }
}

const lookcode = (id: number) => {
  console.log(theprosta.value[id].hash_id);
  console.log(theprosta.value[id].language);
  one_submition_detil.value = [
    {
      message: theprosta.value[id].message,
      runtime: theprosta.value[id].runtime,
      memory: theprosta.value[id].memory,
      verdict: theprosta.value[id].verdict,
    },
  ];
  axios
    .post(
      url.GET_SUBMISSION_CODE,
      JSON.stringify({
        hash_id: theprosta.value[id].hash_id,
      }),
      config
    )
    .then((response) => {
      // console.log(response.data);
      if (validateResponse(response)) {
        let payload = response.data.payload;
        if (payload.status == "OK") {
          language.value = `${theprosta.value[id].language}`;
          code.value = payload.code;
        } else {
          code.value = "unfind";
        }
        vis.value = true;
      } else {
        alert();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  // 对话框
};
</script>
<style scoped>
#title {
  margin: 10px;
  background-color: white;
  padding: 10px;
  /* display: flex; */
  text-align: center;
}

#title h5 {
  margin-block-start: 0em;
  margin-block-end: 0em;
}

#main {
  margin: 10px;
  height: auto;
  background-color: white;
  padding: 2px;
}

#inputd {
  margin: 10px;
  background-color: white;
  padding: 2px;
}

#outputd {
  margin: 10px;
  background-color: white;
  padding: 2px;
}

#sample {
  margin: 10px;
  background-color: white;
  padding: 5px;
}

#text {
  display: "block";
  white-space: pre-line;
  border-style: solid;
  margin-bottom: 10px;
}

#backgroud {
  /* background-color: red; */
  width: 80%;
}

#Lastsubmissions {
  background-color: white;
  height: 600px;
  margin-top: 10px;
  margin-right: 20px;
  text-align: center;
  overflow: auto;
}
a:hover {
  color: black; /* 更改为你想要的颜色 */
  text-decoration: none; /* 去掉下划线 */
}
</style>
