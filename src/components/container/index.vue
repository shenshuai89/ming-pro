<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto" style="background: #545c64">
        <NavSider :collapse="isCollapse"></NavSider>
      </el-aside>

      <el-container>
        <el-header>
          <NavHeader v-model:collapse="isCollapse"></NavHeader>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import NavHeader from "@/components/container/src/NavHeader.vue";
import NavSider from "@/components/container/src/NavSider.vue";

const isCollapse = ref(false);
const asideWidth = computed(() => (isCollapse.value ? 64 : 200));
</script>

<style scoped lang="scss">
.el-header {
  background-color: #fcfcfc;
  border-bottom: 1px solid #e3e3e3;
}
.el-main {
  text-align: left;
  overflow: scroll;
  height: calc(100vh - 60px);
}
</style>
