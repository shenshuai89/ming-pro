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
    ><template #content>这里显示的是内容</template></m-notification
  >
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped></style>
