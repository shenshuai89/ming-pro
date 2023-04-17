<template>
  <!-- search 搜索表单 -->
  <m-search
    :label-width="labelWitdh"
    :options="formOptions"
    ref="formRef"
    :inline="true"
  >
    <template #action="scope">
      <div class="search-button-group" :style="{ marginLeft: labelWitdh }">
        <el-button size="small" type="primary" @click="handleSearch(scope)"
          >搜索</el-button
        >
        <!-- <el-button size="small" type="primary" @click="handleReset(scope)" -->
        <el-button size="small" @click="resetForm(formRef)">重置</el-button>
      </div>
    </template>
  </m-search>

  <!-- table 列表 -->
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
    <!-- <template #name="{ scope }">
      {{ scope.row.name }}
    </template> -->
    <template #age="{ scope }"> {{ scope.row.age }} 岁 </template>
    <template #action="{ scope }">
      <el-button type="primary" size="small" @click="edit(scope)"
        >编辑</el-button
      >
      <el-button type="success" size="small" @click="deleteRow(scope)"
        >删除</el-button
      >
    </template>
    <template #editRow="{ scope }">
      <el-button type="warning" size="small" @click="editConfirm(scope)"
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
import { computed, onMounted, onUpdated, ref, reactive } from 'vue';
import { TableOptions } from '../components/table/src/types';
import { FormInstance, FormOptions } from '../components/form/src/types/types';
import axios from 'axios';
import { ElMessage } from 'element-plus';
interface Scope {
  form: FormInstance;
  model: any;
}
const labelWitdh = ref('120px');
const formRef = ref<FormInstance>();
let formOptions: FormOptions[] = reactive([
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    placeholder: '请输入用户名',
    rules: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 2, max: 10, message: '用户名在2-10位之间', trigger: 'blur' },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    placeholder: '请输入密码',
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 2, max: 6, message: '密码在2-6位之间', trigger: 'blur' },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%',
      },
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change',
      },
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1',
        disabled: true,
      },
      {
        type: 'option',
        label: '主管',
        value: '2',
      },
      {
        type: 'option',
        label: '员工',
        value: '3',
      },
    ],
  },
]);
const handleSearch = (scope: Scope) => {
  if (!scope.form) return;
  scope.form.validate!((valid: any, fields: any) => {
    if (valid) {
      // 校验通过
      console.log(scope.form, scope.model);
      ElMessage.success('submit success');
    } else {
      ElMessage.error('表单有误，请修正后提交');
    }
  });
};
const resetForm = (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  console.log(formRef, 'form');
  formRef.resetForm!();
};

let options: TableOptions[] = [
  {
    prop: 'date',
    label: '日期',
    width: '180',
    align: 'left',
    slot: 'date',
    editable: true,
  },
  {
    prop: 'name',
    label: '姓名',
    width: '150',
    align: 'left',
    slot: 'name',
  },
  {
    prop: 'age',
    label: '年龄',
    width: '80',
    align: 'left',
    slot: 'age',
  },
  {
    prop: 'address',
    label: '地址',
    align: 'center',
    editable: true,
  },
  {
    prop: 'action',
    label: '操作',
    action: true,
    align: 'center',
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
let pageSize = ref<number>(20); // 每页数据条数
let total = ref<number>(0); // 总数
let getData = () => {
  axios
    .post('/api/list', {
      current: current.value,
      pageSize: pageSize.value,
    })
    .then((res: any) => {
      if (res.data.code === '200') {
        setTimeout(() => {
          tableData.value = res.data.data.rows;
          total.value = res.data.data.total;
          console.log(res.data.data);
        }, 3000);
      }
    });
};
onMounted(() => {
  getData();
});
let handleSizeChange = (val: number) => {
  pageSize.value = val;
  getData();
};
let handleCurrentChange = (val: number) => {
  current.value = val;
  getData();
};

// 编辑行标识
let editRowTag = ref<string>('');
const edit = (value: string) => {
  console.log(value);
  editRowTag.value = 'edit';
};
const deleteRow = (value: string) => {
  console.log(value);
  editRowTag.value = 'delete';
};

const editConfirm = (value: string) => {
  console.log('确认编辑的内容');
};

const table = ref(null);
const handleCheck = (value: string) => {
  console.log(value, '父组件处理');
};
const handleClose = (value: string) => {
  console.log(value, '父组件处理');
};
const currentClickCell = ref<string>('');

// 自定义编辑图标的插槽时
const confirm = (value: any) => {
  //   console.log(value, "父组件处理xxx");
  currentClickCell.value = '';
};
const cancel = (value: any) => {
  //   console.log(value, "父组件处理xxx");
  currentClickCell.value = '';
};
const handleEditCell = (value: any) => {
  currentClickCell.value = value;
};
</script>
<style lang="scss" scoped></style>
