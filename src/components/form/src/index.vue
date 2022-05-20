<template>
  <el-form>
    <el-form-item v-for="(item, idx) in options" :key="idx">
      <component :is="`el-${item.type}`"></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { FormOptions } from "./types/types";
let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "username",
    rules: [
      { required: true, message: "Please enter a username", trigger: "blur" },
      { min: 2, max: 10, message: "用户名在2-10位之间", trigger: "blur" },
    ],
  },
  {
    type: "input",
    value: "",
    label: "password",
    rules: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 2, max: 6, message: "密码在2-6位之间", trigger: "blur" },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
