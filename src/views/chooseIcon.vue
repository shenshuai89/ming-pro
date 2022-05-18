<template>
  <div>
    <m-choose-icon title="图标列表" v-model:visible="visible">
      选择图标
    </m-choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const visible = ref<boolean>(false);
</script>
<style lang="scss" scoped></style>
