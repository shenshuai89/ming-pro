<template>
  <el-form
    v-if="model"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-form-item
      v-for="(item, idx) in options"
      :prop="item.prop"
      :label="item.label"
      :key="idx"
    >
      <component
        v-bind="item.attrs"
        :is="`el-${item.type}`"
        v-model="model[item.prop]"
      ></component>
    </el-form-item>
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
