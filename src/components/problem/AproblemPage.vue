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
      <SubmitProblem
        :submitproblemid="problemid"
        :submitproblemtitle="problemtitle"
      />
    </div>
    <el-affix style="margin-left: 10px; width: 20%" :offset="60">
      <div id="Lastsubmissions">
        <h3>Last submissions</h3>
        <p v-if="store.state.user.user.userrole == -1">登录后查看</p>
        <p v-else>{{ store.state.user.user.username }}</p>
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
// 父组件向子组件传参？路由跳转时传参
const route = useRoute();
const problemid = ref("");
const problemtitle = ref("");
const problemmain = ref("");
const timelimit = ref(1);
const memorylimit = ref(256);
const inputdescribe = ref("");
const outputdescribe = ref("");
const example = ref();
const theprosta = ref();
const store = useStore(); //store.state.user.user.username
// const text = ref("$a$");
let rid = route.query.rid;
// console.log(route.query.rid);
onMounted(() => {
  let config = {
    headers: { "Content-Type": "multipart/json, charset=UTF-8" },
  };
  let data = {
    rid: rid,
  };
  // http://127.0.0.1:8001
  // http://43.143.247.211:8001/
  axios
    .post(
      store.state.behindip.onlineip + "/wronganswer/ridgetproblem/",
      JSON.stringify(data),
      config
    )
    .then((res) => {
      //   console.log(res);
      //   problem.value = res.data; //数据接收完成
      //   console.log(problem.value);
      problemid.value = res.data.rid;
      problemtitle.value = res.data.problemtitle;
      problemmain.value = res.data.problemmain;
      inputdescribe.value = res.data.inputdescribe;
      outputdescribe.value = res.data.outputdescribe;
      timelimit.value = res.data.timelimit;
      memorylimit.value = res.data.memorylimit;
      example.value = res.data.example;
    });
  // 后端聚合搜索
  if (store.state.user.user.userrole > -1) {
    let data = {
      user_id: store.state.user.user.id,
      problem_id: rid?.toString(),
    };
    console.log(store.state.user.user.id);
    console.log(data);
    axios
      .post(
        store.state.behindip.onlineip + "/wronganswer/getuserprostatus/",
        JSON.stringify(data),
        config
      )
      .then((response) => {
        console.log(response);
        let sta = response.data.Status; //array 取出solve的problem的id
        // console.log(sta);
        theprosta.value = sta;
        // 然后使用v-if进行逻辑判断
      });
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
