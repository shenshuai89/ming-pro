<template>
  <div>
    <m-form
      label-width="80px"
      :options="options"
      ref="form"
      @on-change="handleChange"
      @before-upload="handleBeforeUpload"
      @on-preview="handlePreview"
      @on-remove="handleRemove"
      @before-remove="beforeRemove"
      @on-success="handleSuccess"
      @on-exceed="handleExceed"
    >
      <template #uploadArea>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500kb
        </div>
      </template>
      <template #action="scope">
        <el-button size="small" type="primary" @click="handleSubmut(scope)"
          >提交</el-button
        >
        <!-- <el-button size="small" type="primary" @click="handleReset(scope)" -->
        <el-button size="small" type="primary" @click="resetForm"
          >重置</el-button
        >
      </template>
    </m-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormOptions } from "../components/form/src/types/types";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref } from "vue";
interface Scope {
  form: FormInstance;
  model: any;
}
let form = ref();

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "username",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      { min: 2, max: 10, message: "用户名在2-10位之间", trigger: "blur" },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "",
    label: "password",
    prop: "password",
    placeholder: "请输入密码",
    rules: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 2, max: 6, message: "密码在2-6位之间", trigger: "blur" },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "",
    placeholder: "请选择职位",
    prop: "role",
    label: "职位",
    attrs: {
      style: {
        width: "100%",
      },
    },
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
        disabled: true,
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "checkbox-group",
    value: ["足球"],
    prop: "like",
    label: "爱好",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "篮球",
        value: "2",
      },
      {
        type: "checkbox",
        label: "排球",
        value: "3",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    prop: "gender",
    label: "性别",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "male",
      },
      {
        type: "radio",
        label: "女",
        value: "female",
      },
      {
        type: "radio",
        label: "保密",
        value: "not",
      },
    ],
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    uploadAttrs: {
      action: "http://jsonplaceholder.typicode.com/posts/",
      multiple: true,
      limit: 3,
    },
    rules: [
      {
        required: true,
        message: "图片不能为空",
        trigger: "blur",
      },
    ],
  },
  {
    type: "editor",
    value: "123",
    prop: "desc",
    label: "描述",
    placeholder: "请输入描述",
    rules: [
      {
        required: true,
        message: "描述不能为空",
        trigger: "blur",
      },
    ],
  },
];

const handleSubmut = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
      // 校验通过
      console.log(scope.form, scope.model);
      ElMessage.success("submit success");
    } else {
      ElMessage.error("表单有误，请修正后提交");
    }
  });
};
const handleReset = ({ form }: Scope) => {
  form.resetFields();
};

// 重置表单
// 使用通过expose封装的方法，重置form表单和editor富文本编辑
let resetForm = () => {
  form.value.resetForm();
};

// 处理上传的方法
let handleRemove = (file: any, fileList: any) => {
  console.log("handleRemove");
  console.log(file, fileList);
};
let handlePreview = (file: any) => {
  console.log("handlePreview");
  console.log(file);
};
let beforeRemove = (val: any) => {
  console.log("beforeRemove");
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`);
};
let handleExceed = (val: any) => {
  console.log("handleExceed", val);
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  );
};
let handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};
let handleChange = (val: any) => {
  console.log("change");
  console.log(val);
};
let handleBeforeUpload = (val: any) => {
  console.log("handleBeforeUpload");
  console.log(val);
};
</script>
<style lang="scss" scoped></style>
