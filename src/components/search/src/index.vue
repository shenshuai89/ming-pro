<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    ref="form"
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
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        ></component>
      </el-form-item>
      <!-- 单独处理有children的下拉框的元素 -->
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="item.children && item.children.length > 0"
      >
        <component
          v-bind="item.attrs"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
        >
          <!-- 渲染selection复选框的options内容 -->
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :disabled="child?.disabled"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <!-- form 底部的提交和重置按钮 -->
    <el-form-item>
      <!-- 通过 具名作用域插槽 将数据传递给上层【使用者】 -->
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref, watch } from "vue";
import { FormInstance, FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
});
let model = ref<any>(null);
let rules = ref<any>(null);
// ref获取整个表单的html结构，在html中定义ref标签
let form = ref<FormInstance | null>(null);

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

// 点击重置时，单独处理富文本的重置操作
const resetForm = () => {
  // 重置element-plus的表单
  form.value!.resetFields();
};
// element form表单验证的方法
const validate = () => {
  return form.value!.validate;
};
// 获取form表单填写的数据
const getFormData = () => {
  return model.value;
};
// 通过expose将组件内的属性或方法暴露给使用者
// 此处不能使用emits，因为emits把方法发送给父标签的自定义事件上，reset操作是绑定在单独的按钮元素上的
defineExpose({
  resetForm,
  validate,
  getFormData,
});
</script>
<style lang="scss" scoped>
</style>
