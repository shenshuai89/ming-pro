<template>
  <el-menu 
    :defaultActive="defaultActive" 
    :router="router"
    v-bind="$attrs"> <!-- 未用props接收的，都会放到$attrs --->
    <template v-for="(item, index) in data" :key="index">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.index"
      >
        <el-icon>
          <component
            v-if="item.icon"
            :is="`icon-${toLine(item.icon)}`"
          ></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.index"
      >
        <template #title>
          <el-icon>
            <component
              v-if="item.icon"
              :is="`icon-${toLine(item.icon)}`"
            ></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :key="index1"
          :index="item1.index"
        >
          <el-icon>
            <component
              v-if="item1.icon"
              :is="`icon-${toLine(item1.icon)}`"
            ></component>
          </el-icon>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from "vue";
const toLine = (val: string) => val!.toLowerCase();
const props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: ''
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false
  },
});
</script>
<style lang="scss" scoped></style>
