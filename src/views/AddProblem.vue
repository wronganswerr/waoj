<template>
  <div id="bottom">
    <div style="width: 70%">
      <div class="ed">
        <el-scrollbar>
          <div style="display: flex; height: 80px">
            <div style="width: 50px; text-align: center">
              <p style="font-size: 20px; margin-top: 25px">标题:</p>
            </div>
            <el-input
              style="margin-top: 20px; margin-bottom: 20px; width: 200px"
              v-model="problemtitle"
              placeholder="Please input"
            />
            <div style="width: 100px; text-align: center">
              <p style="font-size: 20px; margin-top: 25px">时间限制:</p>
            </div>
            <el-select
              v-model="timelimit"
              class="m-2"
              placeholder="Select"
              style="margin-top: 20px; margin-bottom: 20px; width: 100px"
            >
              <el-option key="1" label="1s" :value="1" />
              <el-option key="2" label="2s" :value="2" />
            </el-select>
            <div style="width: 100px; text-align: center">
              <p style="font-size: 20px; margin-top: 25px">空间限制:</p>
            </div>
            <el-select
              v-model="memorylimit"
              class="m-2"
              placeholder="Select"
              style="margin-top: 20px; margin-bottom: 20px; width: 100px"
            >
              <el-option key="1" label="256M" :value="256" />
              <el-option key="2" label="512M" :value="512" />
            </el-select>
            <div style="margin-left: 5%; margin-top: 1%">
              <el-switch
                v-model="is_hide"
                size="large"
                active-text="hide form visitor"
                inactive-text="show to visitor"
              />
            </div>
          </div>
          <mavon-editor
            :toolbars="toolbars"
            v-model="problemmain"
            style="height: 500px; margin: 10px"
          />
          <h4>输入描述</h4>
          <mavon-editor
            :toolbars="toolbars"
            v-model="inputdescribe"
            style="height: 50px; margin: 10px"
          />
          <h4>输出描述</h4>
          <mavon-editor
            :toolbars="toolbars"
            v-model="outputdescribe"
            style="height: 50px; margin: 10px"
          />
        </el-scrollbar>
      </div>
      <div id="example">
        <div style="display: flex; margin-left: 5px">
          <div>
            <h3>已有{{ exnum }}组样例</h3>
          </div>
          <el-button
            style="margin: 10px"
            type="primary"
            @click="dialogFormVisible = true"
            >新增展示样例</el-button
          >
          <el-button
            style="margin: 10px"
            type="primary"
            @click="delexpect()"
            :disabled="exnum == 0"
            >删除最近添加</el-button
          >
        </div>
        <div
          style="
            overflow: auto;
            height: 250px;
            white-space: pre-line;
            padding: 10px;
          "
        >
          <div
            v-for="(i, index) in example"
            :key="index"
            style="margin: 10px; margin: 0px"
          >
            <p style="margin: 0px; background-color: wheat">{{ i.input }}</p>
            <p style="margin: 0px; background-color: white">{{ i.output }}</p>
          </div>
        </div>
        <!-- <el-button text @click="dialogFormVisible = true">
          open a Form nested Dialog
        </el-button> -->
        <el-dialog v-model="dialogFormVisible" title="Add a example">
          <el-input
            v-model="exinput"
            placeholder="Input"
            autosize
            type="textarea"
          />
          <el-input
            v-model="exoutput"
            placeholder="Output"
            autosize
            type="textarea"
          />
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="addexpect()">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
    <div id="gg">
      <div id="txtontp">
        <el-scrollbar>
          <p>在第一个markdown编辑器内编辑题目标题</p>
          <p>在第二个markdown编辑器描述题目</p>
          <p>
            输入输出文件放到一个zip压缩包里面,输入文件使用".in"后缀,输出文件使用".out"结尾。
            输入输出文件不超过一百个且一一对应。
          </p>
          <p>单个输入输出文件大小不得超过16MB,过大的文件会被忽略</p>
          <p>语言只支持C++</p>
          <p>若要改变数据请全部整体上传,暂时不支持单条数据的增删改查</p>
        </el-scrollbar>
      </div>
      <!-- <div style="text-align: center">
        <h5>{{ mes }}</h5>
        <h5>已载入{{ datanum }}组数据</h5>
      </div> -->
      <div class="tpdata">
        <el-upload
          ref="upload"
          class="upload-demo"
          accept=".zip"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="onchange"
          :auto-upload="false"
          :show-file-list="false"
        >
          <template #trigger>
            <el-button style="margin: 10px" size="large" type="primary"
              >选择压缩包</el-button
            >
          </template>
          <el-button
            style="margin: 10px"
            size="large"
            type="primary"
            @click="addprobelm"
            :disabled="datanum == 0"
            >添加到题库</el-button
          >
        </el-upload>
        <!-- 用v-for 渲染数据预览区域 -->
        <div
          style="
            height: 90%;
            overflow: auto;
            /* background-color: brown; */
            margin: 5px;
          "
        >
          <div class="text" v-for="item in data" :key="item.ind">
            <p
              style="
                background-color: rgb(222, 225, 200);
                margin: 5px;
                max-height: 80px;
                overflow: hidden;
              "
            >
              {{ item.input.slice(0, 100) }}
            </p>
            <p
              style="
                background-color: rgb(249, 238, 152);
                margin: 5px;
                max-height: 80px;
                overflow: hidden;
              "
            >
              {{ item.output.slice(0, 100) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import axios from "axios";
import JSZip from "jszip";

import store from "@/store";
import { ElLoading } from "element-plus";
import router from "@/router";
import { validateResponse } from "@/utils/utils";
// import vue_markdown from "vue-markdown";
const dialogFormVisible = ref(false);
const problemtitle = ref("");
const problemmain = ref("");
const timelimit = ref(1);
const memorylimit = ref(256);
const inputdescribe = ref("");
const outputdescribe = ref("");
const mes = ref("等待数据");
const datanum = ref(0);
const is_hide = ref<boolean>(false);
const toolbars = ref({
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  link: true, // 链接
  code: true, // code
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
});
const upload = ref<UploadInstance>(); //指代组件？
const fileUpload = ref(); //文件容器
// 响应式变量展示出处理后的内容
const data = ref();
//fail改变时候调用

const handleExceed: UploadProps["onExceed"] = (files) => {
  // console.log(upload.value);
  upload.value?.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value?.handleStart(file);
};

const example = ref();
const exnum = ref(0);
const exinput = ref("");
const exoutput = ref("");
let exampletmp = new Array(0);

onMounted(() => {
  if (store.state.user.role != 1) {
    // 非管理员 跳转路由
    router.push("/");
  }
});

const addexpect = () => {
  // 对话框的形式
  // example.value = [{ input: "1", output: "1" }];
  // example.value?.push({ input: "1", output: "1" });
  if (exinput.value != "" && exoutput.value != "") {
    exampletmp.push({ input: exinput.value, output: exoutput.value });
    example.value = exampletmp;
    exnum.value++;
  }
  dialogFormVisible.value = false;
  exinput.value = "";
  exoutput.value = "";
  // console.log(exampletmp);
  // console.log(example.value);
};
const delexpect = () => {
  exampletmp.pop();
  example.value = exampletmp;
  exnum.value--;
};

const onchange = (file: object) => {
  fileUpload.value = file;
  let zipfile = fileUpload.value.raw;
  const loading = ElLoading.service({
    lock: true,
    text: "LOADING DATA",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const zipf = new JSZip();
  let indata: string[] = new Array(101);
  let outdata: string[] = new Array(101);
  let st = new Array(101);
  // let temp: any[] = new Array(101);
  // console.log(indata[0]);
  mes.value = "开始处理数据";
  zipf
    .loadAsync(zipfile)
    .then(async (zip) => {
      // let dataa: object[];
      let dataa: object[] = new Array(0);
      for (let i = 1; i <= 100; i++) {
        st[i] = 0;
        // console.log(i.toString() + ".in");
        let input = zip.file(i.toString() + ".in")?.async("string");
        let output = zip.file(i.toString() + ".out")?.async("string");
        if (input instanceof Promise && output instanceof Promise) {
          // console.log(i);
          loading.text.value = `正在加载第 ${i.toString()} 个测试数据`;
          await input
            .then((content) => {
              // console.log(content); // 在控制台打印文件内容
              indata[i] = content;
            })
            .finally(() => {
              console.log("endin " + i.toString());
              st[i] += 1;
              if (st[i] == 2) {
                dataa.push({ input: indata[i], output: outdata[i] });
                data.value = dataa;
                datanum.value++;
              }
            });
          await output
            .then((content) => {
              // console.log(content); // 在控制台打印文件内容
              outdata[i] = content;
            })
            .finally(() => {
              // console.log("endout " + i.toString());
              st[i] += 1;
              if (st[i] == 2) {
                dataa.push({ input: indata[i], output: outdata[i] });
                data.value = dataa;
                datanum.value++;
              }
            });
        }
      }
    })
    .finally(() => {
      // console.log(data);
      setTimeout(() => {
        loading.close();
      }, 2000);
    });
};

const addprobelm = () => {
  // console.log("add problem");
  let problem = {
    problem_title: problemtitle.value,
    time_limit: timelimit.value,
    memory_limit: memorylimit.value,
    problem_main: problemmain.value,
    input_describe: inputdescribe.value,
    output_describe: outputdescribe.value,
    example: exampletmp,
    is_hide: is_hide.value,
    data: JSON.parse(JSON.stringify(data.value)),
  };

  console.log(JSON.stringify(problem));
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.state.user.token}`,
    },
  };
  axios
    .post(
      `${store.state.behindip.onlineip}${store.state.behindip.add_problem}`,
      JSON.stringify(problem),
      config
    )
    .then((response) => {
      // console.log(response);
      if (validateResponse(response)) {
        let paylod = response.data.payload;
        if (paylod.state === 0) {
          alert("success add a problem");
          return;
        }
      }
      alert("file add a problem");
    });
};
</script>
<style scoped>
#bottom {
  /* width: 1000px; */
  margin-top: 10px;
  /* padding: 100px; */
  /* height: 100%; */
  background-color: white;
  background-size: 100% 100%;
  overflow: hidden;
  display: flex;
}

.ed {
  /* height: auto; */
  width: 100%;
  /* height: 1500px; */
  margin: 10px;
  /* background-color: red; */
}

.tpdata {
  background-color: white;
  margin: 10px;
  height: 62%;
  margin-top: 10px;
  margin-bottom: 10px;
  /* overflow: hidden; */
  /* margin-bottom: 10px; */
}

.text {
  display: "block";
  white-space: pre-line;
}

#txtontp p {
  margin: 5px;
}

#gg {
  background-color: rgb(225, 225, 225);
  margin: 10px;
  width: 30%;
  /* height: 600px; */
}

#txtontp {
  background-color: white;
  margin: 10px;
  height: 600px;
}

#addbut {
  margin: 10px;
}

#example {
  background-color: rgb(243, 246, 231);
  margin: 20px;
  height: 320px;
}
</style>
