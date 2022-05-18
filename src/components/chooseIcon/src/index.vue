<template>
  <div class="choose-icon">
    <el-button type="primary" @click="handleClick">
      <slot></slot>
    </el-button>
    <div class="choose-icon-dialog-override-style">
      <el-dialog :title="title" v-model="dialogVisible">
        <div class="icon-container">
          <div class="icon-item" v-for="item in elIconsKey" :key="item" @click="copyIcon(item)">
            <div>
              <el-icon
                ><component :is="`icon-${toLine(item)}`"></component
              ></el-icon>
            </div>
            {{ item }}
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
import {useCopy} from "./useCopy"
let elIconsKey = computed(() => Object.keys(ElIcons));
function toLine(value: string) {
  return value.replace(/(A-Z)g/, "-$1").toLowerCase();
}
let props = defineProps<{
  title: string;
  visible: boolean;
}>();

let emits = defineEmits(["update:visible"]);
const handleClick = () => {
  emits("update:visible", !props.visible);
};

// 计算属性的get和set用法
let dialogVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emits("update:visible", val);
  },
});
const copyIcon = (item:string) =>{
  let text = `<icon-${toLine(item)}>`
  useCopy(text);
  // 复制后关闭弹框
  emits("update:visible", false);
}
</script>
<style lang="scss" scoped>
.choose-icon{
  text-align: left;
  .icon-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    .icon-item {
      width: 20%;
      height: 80px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      text-align: center;
      border: 1px solid #e3e3e3;
      cursor: pointer;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
<style lang="scss">
.choose-icon-dialog-override-style {
  .el-dialog__body {
    height: 420px;
    overflow: scroll;
  }
  .el-dialog__header {
    text-align: left;
  }
}
</style>
