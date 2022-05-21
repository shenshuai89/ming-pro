<template>
  <el-table :data="data">
    <template v-for="item in filterOptions" :key="item.prop">
      <el-table-column
        v-if="!item.slot"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      ></el-table-column>
      <!-- 通过插槽实现自定义列 https://element-plus.gitee.io/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E6%A8%A1%E6%9D%BF -->
      <el-table-column
        v-else
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <slot :name="item.slot" :scope="scope"></slot>
        </template>
      </el-table-column>
    </template>
    <!-- 通过插槽实现操作项 -->
    <el-table-column
      :label="actionOptions.label"
      :align="actionOptions.align"
      :width="actionOptions.width"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
import { TableOptions } from "./types";
const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]>,
    default: [],
    required: true,
  },
  data: {
    type: Array as PropType<any[]>,
    default: [],
    required: true,
  },
});
const filterOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});
const actionOptions = computed(() => props.options.find((item) => item.action));
</script>
<style lang="scss" scoped></style>
