<template>
  <el-progress :percentage="percent" v-bind="$attrs"></el-progress>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps({
  //   进度值
  percentage: {
    type: Number,
    default: 0,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 300,
  },
});
let percent = ref<number>(0);
onMounted(() => {
  if (props.isAnimation) {
    // 获取每段值 能够划分到的时间
    let t = Math.ceil(props.time / props.percentage) + 1;
    let timer = setInterval(() => {
      percent.value += 1;
      if (percent.value >= (props.percentage > 40 ? props.percentage + 5: props.percentage)) {
        percent.value = props.percentage;
        clearInterval(timer);
      }
    }, t);
  } else {
    percent.value = props.percentage;
  }
});
</script>
<style lang="scss" scoped></style>
