<template>
  <div class="nav-side">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="collapse"
    >
      <el-menu-item index="1">
        <el-icon><icon-homefilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>图标选择</span>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon><icon-operation /></el-icon>
        <span>进度条</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
defineProps<{ collapse: boolean }>();
</script>
<style lang="scss" scoped>
.nav-side {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
