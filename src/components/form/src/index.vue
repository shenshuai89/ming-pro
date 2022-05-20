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
          v-if="item.type !== 'upload'"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :http-request="httpRequest"
          :on-exceed="onExceed"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
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

let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])
// 上传组件的所有方法
let onPreview = (file: File) => {
  emits("on-preview", file);
};
let onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", { file, fileList });
};
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("on-success", { response, file, fileList });
};
let onError = (err: any, file: File, fileList: FileList) => {
  emits("on-error", { err, file, fileList });
};
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", { event, file, fileList });
};
let onChange = (file: File, fileList: FileList) => {
  emits("on-change", { file, fileList });
};
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};
let onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", { files, fileList });
};
</script>
<style lang="scss" scoped></style>
