<template>
  <div class="bottom">
    <div class="contest_brock">
      <h1>Current or upcoming contests</h1>
      <el-table :data="unstart_con_tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="start_time" label="Start Time" width="180" />
        <el-table-column prop="end_time" label="End Time" width="180" />
        <el-table-column prop="length" label="Length" width="180" />
        <el-table-column prop="Writers" label="Writers" />
        <el-table-column label="">
          <template v-slot="scope">
            <el-button link type="primary" @click="enter_contest(scope.$index)"
              >Enter</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="">
          <template v-slot="scope">
            <el-button
              link
              type="primary"
              @click="register_contest(scope.$index)"
              >Register</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="contest_brock">
      <h1>Ongoing contests</h1>
      <el-table :data="ongoing_con_tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="start_time" label="Start Time" width="180" />
        <el-table-column prop="end_time" label="End Time" width="180" />
        <el-table-column prop="length" label="Length" width="180" />
        <el-table-column prop="Writers" label="Writers" />
        <el-table-column label="">
          <template v-slot="scope">
            <el-button link type="primary" @click="enter_contest(scope.$index)"
              >Enter</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="contest_brock">
      <h1>Past contests</h1>
      <el-table :data="past_con_tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="start_time" label="Start Time" width="180" />
        <el-table-column prop="end_time" label="End Time" width="180" />
        <el-table-column prop="length" label="Length" width="180" />
        <el-table-column prop="Writers" label="Writers" />
        <el-table-column label="">
          <template v-slot="scope">
            <el-button link type="primary" @click="enter_contest(scope.$index)"
              >Enter</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const unstart_con_tableData = ref([
  {
    name: "Tom",
    start_time: "2023-10-01 12:00:00",
    end_time: "2023-10-01 12:00:00",
    length: "1:00",
    Writers: "Tom, Jerry",
  },
]);

const ongoing_con_tableData = ref([
  {
    name: "Tom",
    start_time: "2023-10-01 12:00:00",
    end_time: "2023-10-01 12:00:00",
    length: "1:00",
    Writers: "Tom, Jerry",
  },
]);

const past_con_tableData = ref([
  {
    name: "Tom",
    start_time: "2023-10-01 12:00:00",
    end_time: "2023-10-01 12:00:00",
    length: "1:00",
    Writers: "Tom, Jerry",
  },
]);

onMounted(() => {
  console.log("Component mounted");
});

const register_contest = (index: number) => {
  const contest = unstart_con_tableData[index];
  console.log("Registering for contest:", contest.name);
  // 注册，用户token
};

const enter_contest = (index: number) => {
  const contest = unstart_con_tableData[index];
  console.log("Entering contest:", contest.name);
  // 进入比赛，用户token
};
</script>

<style scoped>
.bottom {
  display: flex;
  flex-direction: column; /* 如果要垂直排列 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  padding: 10px;
  background-color: #a19d9d;
  min-height: 500px;
}

.contest_brock {
  width: 90%;
  /* height: 50px; */
  min-height: 200px;
  background-color: white;
  margin: 10px;
  border-radius: 5px;
  /* display: flex; */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 20px;
}
</style>
