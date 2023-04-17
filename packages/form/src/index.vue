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
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        ></component>
        <!-- 单独处理上传功能 -->
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          ref="upload"
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
        <!-- 单独处理富文本编辑功能 -->
        <div v-if="item.type === 'editor'" id="editor">
          <div id="toolbar-container"></div>
          <div id="editor-container"></div>
        </div>
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
      <!-- 通过作用域插槽将数据传递给上层【使用者】 -->
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { nextTick, onMounted, PropType, ref, watch } from "vue";
import { FormInstance, FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import "@wangeditor/editor/dist/css/style.css";
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor,
  IToolbarConfig,
} from "@wangeditor/editor";

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
// 定义 存放editor值的
let editorStore = ref();
// 上传文件的列表
let upload = ref();

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
      // 处理富文本编辑的显示
      if (op.type === "editor") {
        // 富文本编辑依赖dom元素的更新，所以需要使用到nextTick元素，可以获取到立即更新后的dom元素
        // 编辑器配置
        nextTick(() => {
          const editorConfig: Partial<IEditorConfig> = {
            autoFocus: false,
            placeholder: "请输入内容 ... ",
            maxLength: 1000,
          };
          editorConfig.onChange = (editor: IDomEditor) => {
            // 当编辑器选区、内容变化时，即触发
            // console.log("content", editor.children);
            // console.log("html", editor.getHtml());
            model.value[op.prop!] =
              "<p><br></p>" === editor.getHtml() ? "" : editor.getHtml();
          };

          // 工具栏配置
          const toolbarConfig: Partial<IToolbarConfig> = {};

          // 创建编辑器
          const editor = createEditor({
            selector: "#editor-container",
            config: editorConfig,
          });
          // 创建工具栏
          const toolbar = createToolbar({
            editor,
            selector: "#toolbar-container",
            config: toolbarConfig,
          });
          editorStore.value = editor;
        });
      }
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
  // 清空上次上传的附件内容
  upload.value[0].clearFiles();

  // 获取到富文本的配置项, 判断下有富文本编辑存在的清空下
  if (props.options && props.options.length) {
    let editorItem = props.options.find((item) => item.type === "editor")!;
    // 重置富文本编辑器的内容
    if (editorItem) {
      editorStore.value.clear();
    }
    let uploadItem = props.options.find((item) => item.type === "upload")!;
    if (uploadItem) {
      console.log(form.value);
    }
  }
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

let emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed",
]);
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
<style lang="scss" scoped>
#editor {
  border: 1px solid #ccc;
}
</style>
