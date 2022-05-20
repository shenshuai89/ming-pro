<template>
  <div><m-form label-width="80px" :options="options"></m-form></div>
</template>

<script setup lang="ts">
import { FormOptions } from "../components/form/src/types/types";
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
];
</script>
<style lang="scss" scoped></style>
