<template>
  <el-popover
    v-model:visible="isShowPopover"
    placement="bottom-start"
    title="Title"
    :width="200"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <span @click="isShowPopover = !isShowPopover">
        <slot
          >{{ defaultText }}
          <el-icon :class="[isShowPopover ? 'rotate' : 'reset']"
            ><icon-arrowdownbold
          /></el-icon>
        </slot>
      </span>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";
const defaultText = ref<string>("选择城市");
const isShowPopover = ref<boolean>(false);
// const showPopover = () => {
//   isShowPopover.value = true;
// };
</script>
<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
  transition: all 0.25s linear;
}
.reset {
  transform: rotate(0deg);
  transition: all 0.25s linear;
}
</style>
