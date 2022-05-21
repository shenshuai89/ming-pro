<template>
  <m-table
    :options="options"
    :data="tableData"
    :element-loading-svg="svg"
    element-loading-text="加载中..."
    element-loading-background="rgba(0,0,0,.6)"
    element-loading-svg-view-box="-10, -10, 50, 50"
  >
    <template #date="scope">
      <el-icon><icon-timer /></el-icon>
      {{ scope.scope.row.date }}
    </template>
    <template #name="{ scope }">
      {{ scope.row.name }}
    </template>
    <template #action="scope">
      <el-button type="primary" size="small" @click="edit(scope.scope)"
        >编辑</el-button
      >
      <el-button type="success" size="small">删除</el-button>
    </template>
  </m-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TableOptions } from "../components/table/src/types";
let options: TableOptions[] = [
  {
    prop: "date",
    label: "日期",
    width: "180",
    align: "center",
    slot: "date",
    editable: true,
  },
  {
    prop: "name",
    label: "姓名",
    width: "100",
    align: "center",
    slot: "name",
  },
  {
    prop: "address",
    label: "地址",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    action: true,
    align: "center",
  },
];
const tableData = ref<{ date: string; name: string; address: string }[]>([]);
setTimeout(() => {
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom1",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom2",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-04",
      name: "Tom3",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-01",
      name: "Tom4",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
}, 3000);
let svg = `
    <path class="path" d="
        M 30 15
        L 28 17
        M 25.61 25.61
        A 15 15, 0, 0, 1, 15 30
        A 15 15, 0, 1, 1, 27.99 7.5
        L 15 15
    " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
    `;
const edit = (value: string) => {
  console.log(value);
};
</script>
<style lang="scss" scoped></style>
