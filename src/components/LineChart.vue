<template>
  <v-chart :option="chartOptions" style="height: 400px"></v-chart>
</template>

<script setup>
import { ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
]);

const chartOptions = ref({
  title: {
    text: "ECharts Line Chart",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Data One"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["January", "February", "March", "April", "May", "June", "July"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Data One",
      type: "line",
      stack: "Total",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
});
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>
