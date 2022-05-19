<template>
  <div>
    <m-choose-time
      @startChange="handleStart"
      @endChange="handleEnd"
      :startOptions="startOptions"
    ></m-choose-time>
  </div>
</template>

<script setup lang="ts">
// 可以通过startOptions/endOptions单独给结束开始传递属性
let startOptions = {
  clearable: false,
};
const handleStart = (val: string) => {
  console.log(val, "开始时间");
};
const handleEnd = (val: string) => {
  console.log(val, "结束时间");
};
</script>
<style lang="scss" scoped></style>
