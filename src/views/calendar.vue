<template>
  <div>
    <m-calendar
      :events="events"
      :displayEventEnd="true"
      :eventContent="eventContent"
      @dateClick="dateClick"
      @eventClick="eventClick"
    ></m-calendar>
  </div>
</template>

<script setup lang="ts">
import { EventClickArg, EventContentArg } from "@fullcalendar/core";
import { DateClickArg } from "@fullcalendar/interaction";
import { ref } from "vue";
import { EventItem } from "../components/calendar/src/types";
let events = ref<EventItem[]>([
  {
    title: "learning",
    start: "2022-05-22 08:00",
    end: "2022-05-22 22:00",
    editable: true,
  },
  {
    title: "sport",
    start: "2022-05-12 08:00",
    end: "2022-05-15 22:00",
  },
]);

const dateClick = (info: DateClickArg) => {
  console.log(info);
  //点击天，增加事件
  events.value.push({
    title: "shopping",
    start: info.dateStr + " 08:00",
    end: info.dateStr + " 20:00",
    editable: true,
  });
};
const eventClick = (info: EventClickArg) => {
  console.log(info);
};
const logo = ref("https://v3.cn.vuejs.org/logo.png");
// 自定义事件显示格式
let eventContent = (arg: EventContentArg) => {
  let el = document.createElement("div");
  let timeTextArr = arg.timeText.split(" - ");
  let start = timeTextArr[0]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  let end = timeTextArr[1]
    .replace("上午", "")
    .replace("下午", "")
    .replace("时", "");
  el.innerHTML = `
        <img src="${logo.value}" style="width:20px;height:20px;">
         <div>开始时间: ${start}</div>
         <div>结束时间: ${end}</div>
         <div>标题: ${arg.event._def.title}</div>
        `;
  return {
    domNodes: [el],
  };
};
</script>
<style lang="scss" scoped></style>
