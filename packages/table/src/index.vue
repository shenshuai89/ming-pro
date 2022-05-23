<template>
  <el-table
    :data="tableData"
    v-loading="isLoading"
    v-bind="$attrs"
    @row-click="rowClick"
  >
    <template v-for="item in filterOptions" :key="item.prop">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <!-- 通过插槽实现自定义列 https://element-plus.gitee.io/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E6%A8%A1%E6%9D%BF -->
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input v-model="scope.row[item.prop]"></el-input>
          </template>
          <template v-else>
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
        <slot name="editRow" v-if="scope.row.rowEdit" :scope="scope"></slot>
        <slot name="action" v-else :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
  <div
    v-if="pagination && !isLoading"
    class="pagination"
    :style="{ justifyContent }"
  >
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref, watch, watchEffect } from "vue";
import { TableOptions } from "./types";
import cloneDeep from "lodash/cloneDeep";
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
  // 点击的是哪个单元格
  currentClickCell: {
    type: String,
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false,
  },
  // 编辑一行操作标识，是在编辑还是删除还是其他呢
  editRowTag: {
    type: String,
    default: "",
  },
  // 是否显示分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 显示分页的对齐方式
  paginationAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
  },
  // 当前是第几页
  currentPage: {
    type: Number,
    default: 1,
  },
  // 当前一页多少条数据
  pageSize: {
    type: Number,
    default: 10,
  },
  // 显示分页数据多少条的选项
  pageSizes: {
    type: Array,
    default: () => [10, 20, 30, 40],
  },
  // 数据总条数
  total: {
    type: Number,
    default: 0,
  },
});
const filterOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});
const actionOptions = computed(() => props.options.find((item) => item.action));
const isLoading = computed(() => !(props.data && props.data.length > 0));

// 编辑的单元格
let currentCell = ref<string | undefined>();

// 拷贝table数据
const tableData = ref(cloneDeep(props.data));
onMounted(() => {
  tableData.value.map((item) => {
    // 给每个单元格设置是否可编辑的状态
    item.rowEdit = false;
  });
});
watch(
  () => props.data,
  (val) => {
    tableData.value = cloneDeep(val);
    tableData.value.map((item) => {
      // 给每个单元格设置是否可编辑的状态
      item.rowEdit = false;
    });
  },
  { deep: true }
);

const rowClick = (row: any, column: any) => {
  //判断当前点击的是否是操作栏=
  if (column && column.label === actionOptions.value!.label) {
    // 判断是否可以编辑行
    if (props.isEditRow && "edit" === props.editRowTag) {
      // 进行编辑操作
      row.rowEdit = !row.rowEdit;
      tableData.value.map((item) => {
        if (item !== row) item.rowEdit = false;
      });
    }
    // 判断是否可以删除行
    if (props.isEditRow && "delete" === props.editRowTag) {
      // 执行删除操作
      tableData.value = tableData.value.filter((item, index) => {
        return row.name !== item.name;
      });
    }
    // 重置editRowTag属性
    if (!row.rowEdit) emits("update:editRowTag", "");
  }
};

const emits = defineEmits(["check", "close", "editCell", "update:editRowTag", "size-change", "current-change"]);
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


/* 分页设置 */
// 分页的每一页数据变化
let handleSizeChange = (val: number) => {
  emits('size-change', val)
  // console.log(val)
}
// 分页页数改变
let handleCurrentChange = (val: number) => {
  emits('current-change', val)
  // console.log(val)
}
// 表格分页的排列方式
let justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})
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
.pagination {
  margin-top: 16px;
  display: flex;
}
.el-table--fit{
    min-height: calc(100vh - 154px);
}
</style>
