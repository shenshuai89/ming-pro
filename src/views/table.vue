<template>
  <m-table
    :options="options"
    :data="tableData"
    :element-loading-svg="svg"
    element-loading-text="加载中..."
    element-loading-background="rgba(0,0,0,.6)"
    element-loading-svg-view-box="-10, -10, 50, 50"
    :currentClickCell="currentClickCell"
    :isEditRow="true"
    :pagination="true"
    :total="total"
    :currentPage="current"
    :pageSize="pageSize"
    v-model:editRowTag="editRowTag"
    ref="table"
    @check="handleCheck"
    @close="handleClose"
    @editCell="handleEditCell"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
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
      <el-button type="success" size="small" @click="deleteRow(scope.scope)"
        >删除</el-button
      >
    </template>
    <template #editRow="scope">
      <el-button type="warning" size="small" @click="editConfirm(scope.scope)"
        >确认</el-button
      >
      <el-button type="info" size="small">取消</el-button>
    </template>

    <!-- 点击编辑图标，时的插槽 -->
    <!-- <template #editSlot="{ scope }">
      <el-button size="small" type="primary" @click="confirm(scope)"
        >确认</el-button
      >
      <el-button size="small" @click="cancel(scope)">取消</el-button>
    </template> -->
  </m-table>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import { TableOptions } from "../components/table/src/types";
import axios from "axios";
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
  /* tableData.value = [
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
  ]; */
}, 0);
// }, 3000);
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

// 分页，设置
let current = ref<number>(1); //当前页
let pageSize = ref<number>(6); // 每页数据条数
let total = ref<number>(0); // 总数
let getData = () => {
  axios
    .post("/api/list", {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      if (res.data.code === "200") {
        tableData.value = res.data.data.rows;
        total.value = res.data.data.total;
        console.log(res.data.data);
      }
    });
};
onMounted(() => {
  getData();
});
let handleSizeChange = (val: number) => {
  pageSize.value = val
  getData()
}
let handleCurrentChange = (val: number) => {
  current.value = val
  getData()
}

// 编辑行标识
let editRowTag = ref<string>("");
const edit = (value: string) => {
  console.log(value);
  editRowTag.value = "edit";
};
const deleteRow = (value: string) => {
  console.log(value);
  editRowTag.value = "delete";
};

const editConfirm = () => {
  console.log("确认编辑的内容");
};

const table = ref(null);
const handleCheck = (value: string) => {
  console.log(value, "父组件处理");
};
const handleClose = (value: string) => {
  console.log(value, "父组件处理");
};
const currentClickCell = ref<string>("");

// 自定义编辑图标的插槽时
const confirm = (value: any) => {
  //   console.log(value, "父组件处理xxx");
  currentClickCell.value = "";
};
const cancel = (value: any) => {
  //   console.log(value, "父组件处理xxx");
  currentClickCell.value = "";
};
const handleEditCell = (value: any) => {
  currentClickCell.value = value;
};
</script>
<style lang="scss" scoped></style>
