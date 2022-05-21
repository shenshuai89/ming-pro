<template>
  <el-dialog
    :custom-class="customClass"
    v-model="dialogVisible"
    v-bind="$attrs"
  >
    <template #default>
      <m-form
        ref="form"
        :options="options"
        label-width="100px"
        @on-change="onChange"
        @before-upload="beforeUpload"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @before-remove="beforeRemove"
        @on-success="onSuccess"
        @on-exceed="onExceed"
        ><template #uploadArea>
          <slot name="uploadArea"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </m-form>
    </template>
    <template #footer>
      <!-- 使用作用域插槽，将form传递给使用者 -->
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import { FormInstance, FormOptions } from "../../form/src/types/types";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  isScroll: {
    type: Boolean,
    default: true,
  },
  onChange: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
});
let emits = defineEmits(["update:visible"]);
const dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});

let form = ref<FormInstance | null>(null);
const customClass = computed(() => {
  return props.isScroll ? "modal-form-dialog-scroll" : "";
});
</script>
<style lang="scss">
.modal-form-dialog-scroll {
  .el-dialog__body {
    height: 380px;
    overflow: scroll;
  }
}
</style>
