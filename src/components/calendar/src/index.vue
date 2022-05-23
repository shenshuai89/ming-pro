<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import "@fullcalendar/core/vdom";
import { Calendar } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import { onMounted, ref } from "vue";

let props = defineProps({
  // 语言
  locale: {
    type: String,
    default: "zh-cn",
  },
  // 视图
  initialView: {
    type: String,
    default: "dayGridMonth",
  },
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: "今天",
        month: "月",
        week: "周",
        day: "日",
        prevYear: "上一年",
        nextYear: "下一年",
        prev: "上一月",
        next: "下一月",
      };
    },
  },
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: "title",
        center: "",
        end: "prevYear today next",
      };
    },
  },
  footerToolbar: {
    type: Object,
    default: () => {},
  },
});
let calendar = ref<Calendar>();
// 渲染日历
let renderCalendar = () => {
  let el = document.getElementById("calendar");
  if (el) {
    calendar.value = new Calendar(el, {
      plugins: [daygrid, interaction],
      initialView: props.initialView,
      locale: props.locale,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
    });
    calendar.value.render();
  }
};

onMounted(() => {
  renderCalendar();
});
</script>
<style lang="scss" scoped></style>
