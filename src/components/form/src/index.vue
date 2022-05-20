<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <template v-for="(item, idx) in options" :key="idx">
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="!item.children || item.children.length === 0"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        ></component>
      </el-form-item>
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="item.children && item.children.length > 0"
      >
        <component
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        >
          <!-- 渲染selection复选框的options内容 -->
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          >
          </component>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
import { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
});
let model = ref<any>(null);
let rules = ref<any>(null);

const initForm = () => {
  if (props.options && props.options.length > 0) {
    let transformMode: any = {};
    let transformRule: any = {};
    // 转换props中的options数据,转化出model和rules需要的格式
    // model -> {"username": "", "password": ""}
    // rules -> {"username": [...], "password": [...]}
    props.options.map((op: FormOptions) => {
      transformMode[op.prop!] = op.value;
      transformRule[op.prop!] = op.rules;
    });
    model.value = cloneDeep(transformMode);
    rules.value = cloneDeep(transformRule);
  }
};
onMounted(() => {
  initForm();
});
// 监听父组件传递进来的options
watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
</script>
<style lang="scss" scoped></style>
