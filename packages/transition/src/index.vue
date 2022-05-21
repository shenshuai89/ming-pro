<template>
  <transition v-on="on">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {
      on: {
        beforeEnter(el: HTMLElement) {
          // 进入前 添加过度 设为初始状态
          el.classList.add("move-transition");
          el.style.height = "0";
        },
        enter(el: HTMLElement) {
          // 设置结束状态
          el.style.height = el.scrollHeight + "px";
          el.style.overflow = "hidden";
        },
        afterEnter(el: HTMLElement) {
          // 完成后删除样式
          el.classList.remove("move-transition");
        },
        leave(el: HTMLElement) {
          // 离开时 设置离开的目标
          el.classList.add("move-transition");
          el.style.height = "0";
        },
        afterLeave(el: HTMLElement) {
          // 离开后删除样式即可
          el.classList.remove("move-transition");
        },
      },
    };
  },
});
</script>
