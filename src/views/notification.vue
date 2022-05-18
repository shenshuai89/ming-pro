<template>
  <!-- <m-notification
    :value="20"
    :max="40"
    :isDot="false"
    type="success"
  ></m-notification>
  <m-notification
    :value="210"
    :max="40"
    :isDot="false"
    type="success"
    icon="BellFilled"
  ></m-notification> -->
  <m-notification :value="210" :max="40" :isDot="false"
    ><template #default>消息通知</template
    ><template #content
      ><m-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></m-list></template
  ></m-notification>
</template>

<script setup lang="ts">
import { list, actions } from "./mock/data";
let clickItem = (val: any) => {
  console.log(val)
}
let clickAction = (val: any) => {
  console.log(val)
}
</script>
<style lang="scss" scoped></style>
