<template>
  <el-table :data="data" v-loading="isLoading" v-bind="$attrs">
    <template v-for="item in filterOptions" :key="item.prop">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <!-- 通过插槽实现自定义列 https://element-plus.gitee.io/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E6%A8%A1%E6%9D%BF -->
        <template #default="scope">
          <template v-if="currentCell === scope.$index + scope.column.id">
            <div class="edit-container">
              <el-input v-model="scope.row[item.prop]"> </el-input>
              <span class="edit-button-group">
                <slot
                  name="editSlot"
                  :scope="scope"
                  v-if="$slots.editSlot"
                ></slot>
                <div class="editing" v-else>
                  <el-icon @click="check(scope)"><icon-check /></el-icon>
                  <el-icon @click="close(scope)"><icon-close /></el-icon>
                </div>
              </span>
            </div>
          </template>
          <template v-else>
            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
            <span v-else>{{ scope.row[item.prop] }}</span>
            <el-icon
              v-if="item.editable"
              class="edit-icon"
              @click="editCell(scope)"
              ><icon-edit
            /></el-icon>
          </template>
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
import { computed, PropType, ref, watch, watchEffect } from "vue";
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
  currentClickCell: {
    type: String,
  },
});
const filterOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});
const actionOptions = computed(() => props.options.find((item) => item.action));
const isLoading = computed(() => !(props.data && props.data.length > 0));
let currentCell = ref<string | undefined>();
const emits = defineEmits(["check", "close", "editCell"]);
const editCell = (val: any) => {
  currentCell.value = val.$index + val.column.id;
  emits("editCell", currentCell);
};
const check = (val: any) => {
  emits("check", val);
  currentCell.value = "";
};
const close = (val: any) => {
  emits("close", val);
  currentCell.value = "";
};
watch(
  () => props.currentClickCell,
  (newVal) => {
    // console.log(newVal, "currentClickCell");
    if (!newVal) {
      currentCell.value = newVal;
    }
  }
);
</script>
<style lang="scss" scoped>
.edit-icon {
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.el-icon {
  cursor: pointer;
}
.edit-container {
  display: flex;
  align-items: center;
  .edit-button-group {
    display: flex;
    .editing {
      display: flex;
      align-items: center;
      // 找到兄弟元素的同类
      i:nth-of-type(1) {
        color: red;
      }
      i:nth-of-type(2) {
        color: green;
      }
      // nth-child找到所有兄弟元素
      //   i:nth-child(2) {
      //     color: red;
      //   }
      //   i:nth-child(3) {
      //     color: green;
      //   }
    }
  }
}
</style>
