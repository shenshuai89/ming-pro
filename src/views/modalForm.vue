<template>
  <div>
    <el-button type="primary" @click="showModal">显示弹出框</el-button>
    <m-modal-form
      v-model:visible="visible"
      :options="options"
      :isScroll="true"
      title="弹出框"
      width="66%"
    >
      <template #footer="scope">
        <el-button @click="cancel(scope.form)">重置</el-button>
        <el-button type="primary" @click="confirm(scope.form)">确认</el-button>
      </template>
      <template #uploadArea>
        <el-button size="small" type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip>
        <div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </m-modal-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash";
import { ref } from "vue";
import { FormInstance, FormOptions } from "../components/form/src/types/types";
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = !visible.value;
};

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [
      {
        required: true,
        message: "用户名不能为空",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "",
    label: "密码",
    prop: "password",
    placeholder: "请输入密码",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15位之间",
        trigger: "blur",
      },
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
    value: [],
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
      action: "https://jsonplaceholder.typicode.com/posts/",
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
    value: "",
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
const cancel = (form: FormInstance) => {
  form.resetForm!();
};
const confirm = (form: FormInstance) => {
  const validate: any = form.validate();
//   console.log(form)
  validate((valid: boolean) => {
    if (valid) {
      const cpModel = cloneDeep(form.getFormData!());
      console.log(cpModel);
      ElMessage.success("表单提交成功");
      setTimeout(() => {
        visible.value = false;
        form.resetForm!();
      }, 1000);
    } else {
      ElMessage.error("表单验证失败，重新编辑后提交");
    }
  });
};
</script>
<style lang="scss" scoped></style>
