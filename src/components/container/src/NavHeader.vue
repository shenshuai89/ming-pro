<template>
  <div class="header">
    <span @click="toggle">
      <el-icon v-if="collapse"><icon-expand /></el-icon>
      <el-icon v-else><icon-fold /></el-icon>
    </span>
    <span>login</span>
  </div>
</template>

<script setup lang="ts">
let headerProps = defineProps<{
  collapse: boolean;
}>();
let emits = defineEmits(["update:collapse"]);
const toggle = () => {
  emits("update:collapse", !headerProps.collapse);
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-icon {
    cursor: pointer;
  }
}
</style>
