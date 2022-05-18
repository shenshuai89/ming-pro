<template>
  <div class="notification">
    <el-popover placement="bottom" :width="400" trigger="click">
      <template #default>
        <slot name="content"></slot>
      </template>
      <template #reference>
        <el-badge :value="value" :max="max" :isDot="isDot" :type="type">
          <el-button v-if="slots.default"><slot></slot></el-button>
          <el-icon v-else>
            <component :is="`icon-${toLower(icon)}`"></component>
          </el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";
let props = defineProps<{
  // 图标类型
  icon: {
    type: String;
    default: "Bell";
  };
  // 显示值
  value: {
    type: [String, Number];
    default: "";
  };
  // 最大值
  max: {
    type: Number;
    default: 99;
  };
  isDot: {
    type: Boolean;
    default: false;
  };
  // badge 类型
  type: {
    type: "primary" | "success" | "warning" | "danger" | "info";
    default: "danger;";
  };
}>();
const toLower = (val: string = "Bell") => val!.toLowerCase();
// 用来判断插槽是否有值，如果有值，则显示插槽内容
const slots = useSlots();
</script>

<style lang="scss" scoped>
.el-badge {
  cursor: pointer;
}
</style>
