<template>
  <el-container>
    <el-header>
      <h1>排行榜</h1>
    </el-header>
    <el-main>
      <div class="table-container">
        <el-table :data="sortedData" @sort-change="sortData" border>
          <el-table-column prop="rank" label="Rank" width="80">
            <template #default="scope">
              <div :class="getRankClass(scope.row.rank)" class="rank-cell">
                {{ scope.row.rank }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="user_name" label="Name"></el-table-column>
          <el-table-column prop="user_codeforces_name" label="CF Name">
            <template #default="scope">
              <a
                :href="`https://codeforces.com/profile/${scope.row.user_codeforces_name}`"
                target="_blank"
                class="cf-link"
              >
                {{ scope.row.user_codeforces_name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="rating"
            label="Rating"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="solve_problem_today"
            label="Solved Today"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="solve_problem_this_week"
            label="Solved This Week"
            sortable="custom"
          ></el-table-column>
          <el-table-column
            prop="solve_problem_total"
            label="Total Solved"
            sortable="custom"
          ></el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { url } from "@/api";

export default {
  name: "RankingList",
  setup() {
    const data = ref([]);
    const sortKey = ref("rating");
    const sortOrder = ref("descending");

    const sortedData = computed(() => {
      return data.value
        .slice()
        .sort((a, b) => {
          const modifier = sortOrder.value === "ascending" ? 1 : -1;
          return (a[sortKey.value] - b[sortKey.value]) * modifier;
        })
        .map((item, index) => ({ ...item, rank: index + 1 }));
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(url.RANKLIST);
        data.value = response.data.payload.content;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    const sortData = ({ prop, order }) => {
      sortKey.value = prop;
      sortOrder.value = order;
    };

    const getRankClass = (rank) => {
      const total = sortedData.value.length;
      if (rank <= Math.floor(total * 0.1)) {
        return "gold";
      } else if (rank <= Math.floor(total * 0.3)) {
        return "silver";
      } else if (rank <= Math.floor(total * 0.6)) {
        return "bronze";
      } else {
        return "";
      }
    };

    onMounted(fetchData);

    return {
      sortedData,
      sortData,
      getRankClass,
    };
  },
};
</script>

<style scoped>
.gold {
  background-color: gold;
}
.silver {
  background-color: silver;
}
.bronze {
  background-color: #cd7f32; /* 铜色 */
}
.el-container {
  padding: 20px;
}
.el-header {
  margin: 20px 0;
  text-align: center;
}
.el-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
.table-container {
  width: 90%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.rank-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.cf-link {
  text-decoration: none;
  color: inherit;
}
.cf-link:hover {
  color: blue;
  text-decoration: underline;
}
</style>
