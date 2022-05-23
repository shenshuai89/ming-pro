<template>
  <div id="calendar"></div>
</template>

<script setup lang="ts">
import "@fullcalendar/core/vdom";
import { Calendar, EventClickArg } from "@fullcalendar/core";
import daygrid from "@fullcalendar/daygrid";
import interaction, { DateClickArg } from "@fullcalendar/interaction";
import { onMounted, ref, PropType, watch } from "vue";
import { EventItem } from "./types";

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
  // 日历事件
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => [],
  },
  // 自定义渲染内容方法
  eventContent: {
    type: Function,
  },
  displayEventEnd: {
    type: Boolean,
    default: false,
  },
});
let calendar = ref<Calendar>();
let emits = defineEmits(["dateClick", "eventClick"]);
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
      displayEventEnd: props.displayEventEnd,
      // 定义日期的事件
      eventSources: [
        {
          events(e, callback) {
            if (props.events.length > 0) {
              callback(props.events);
            } else {
              callback([]);
            }
          },
        },
      ],
      dateClick(info: DateClickArg) {
        emits("dateClick", info);
      },
      eventClick(info: EventClickArg) {
        emits("eventClick", info);
      },
      // 自定义渲染内容
      eventContent: props.eventContent,
    });
    calendar.value.render();
  }
};

onMounted(() => {
  renderCalendar();
});
// 监听事件源的变化
watch(
  () => props.events,
  () => {
    renderCalendar();
  },
  { deep: true }
);
</script>
<style lang="scss" scoped></style>
