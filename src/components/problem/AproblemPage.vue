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
        <SubmitProblem :problemid="down_problemid" />
      </div>
    </div>
    <el-affix style="margin-left: 10px; width: 20%" :offset="60">
      <div id="Lastsubmissions">
        <h3>Last submissions</h3>
        <p v-if="store.state.user.userrole == -1">登录后查看</p>
        <p v-else>{{ store.state.user.username }}</p>
        <!-- 你好 xxx -->
        <div>
          <el-table :data="theprosta" style="width: 100%">
            <el-table-column
              prop="when"
              label="when"
              show-overflow-tooltip
              min-width="100%"
            />
            <el-table-column prop="verdict" label="verdict" />
          </el-table>
        </div>
      </div>
    </el-affix>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import SubmitProblem from "@/components/problem/SubmitProblem.vue";
import { validateResponse, anotherUtilityFunction } from "../../utils/utils";
import router from "@/router";
import { da } from "element-plus/es/locale";

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
// const text = ref("$a$");
let problem_id = route.query.problem_id;
// console.log(route.query.rid);

const down_problemid = ref("1");

onMounted(() => {
  down_problemid.value = String(problem_id);
  console.log(`problem_id ${down_problemid.value}`);
  let config = {
    headers: { "Content-Type": "application/json" },
  };
  let data = {
    problem_id: problem_id,
  };
  console.log(data);
  // 这里的异步请求需要改成同步的
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.get_problem_detile}`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      if (!validateResponse(response)) {
        // 服务端错误时需要跳转至home
        router.push("/");
        return;
      }
      let payload = response.data.payload;
      console.log(payload);
      problemtitle.value = payload.problemtitle;
      problemmain.value = payload.problemmain;
      inputdescribe.value = payload.inputdescribe;
      outputdescribe.value = payload.outputdescribe;
      timelimit.value = payload.timelimit;
      memorylimit.value = payload.memorylimit;
      example.value = payload.example;
    })
    .catch((error) => {
      console.log(error);
    });

  if (store.state.user.role > -1) {
    let data = {
      user_id: store.state.user.user_id,
      problem_id: problem_id?.toString(),
    };
    // axios
    //   .post(
    //     `${store.state.behindip.onlineip}${store.state.behindip.get_user_problem_status}`,
    //     JSON.stringify(data),
    //     config
    //   )
    //   .then((response) => {
    //     if (validateResponse(response)) {
    //       let content = response.data.content;
    //       let payload = content.payload;
    //       let sta = payload.solve_id_list; //array 取出solve的problem的id
    //       // console.log(sta);
    //       theprosta.value = sta;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
});
</script>
<style>
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
  text-align: center;
  overflow: auto;
}
</style>
