<template>
  <div class="nav-side">
    <m-menu
      :data="menu"
      :collapse="collapse"
      text-color="#fff"
      default-active="/"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      router
    ></m-menu>
    <!-- <el-menu
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
    </el-menu> -->
  </div>
</template>

<script setup lang="ts">
defineProps<{ collapse: boolean }>();
const menu = [
  {
    icon: "HomeFilled",
    name: "首页",
    index: "/",
  },
  {
    icon: "Check",
    name: "图标选择器",
    index: "/chooseIcon",
  },
  {
    icon: "Location",
    name: "省市区三级联动",
    index: "/chooseArea",
  },
  {
    icon: "Bell",
    name: "通知菜单",
    index: "/notification",
  },
  {
    icon: "Menu",
    name: "导航菜单",
    index: "/menu",
  },
  {
    icon: "Clock",
    name: "时间日期选择器",
    index: "/time",
  },
  {
    icon: "TurnOff",
    name: "城市选择",
    index: "/chooseCity",
  },
  {
    icon: "DArrowRight",
    name: "进度条",
    index: "/progress",
  },
  {
    icon: "ScaleToOriginal",
    name: "日历",
    index: "/calendar",
  },
  {
    icon: "Setting",
    name: "表单",
    index: "/form",
  },
  {
    icon: "Setting",
    name: "弹出框表单",
    index: "/modalForm",
  },
  {
    icon: "ShoppingBag",
    name: "表格",
    index: "/table",
  },
];
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
