<template>
  <div class="choose-time-container">
    <div style="margin-right: 10px">
      <el-time-select
        v-model="startTime"
        :max-time="endTime"
        class="mr-4"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        v-bind="$attrs.startOptions"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        :min-time="startTime"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :disabled="!startTime"
        v-bind="$attrs.endOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
let props = defineProps({
  startPlaceholder: {
    type: String,
    default: "请填写开始时间",
  },
  endPlaceholder: {
    type: String,
    default: "请填写结束时间",
  },
  startTimeStart: {
    type: String,
    default: "08:00",
  },
  startStep: {
    type: String,
    default: "00:30",
  },
  // 开始时间的结束选择
  startTimeEnd: {
    type: String,
    default: "24:00",
  },
  // 结束时间的开始选择
  endTimeStart: {
    type: String,
    default: "08:00",
  },
  // 结束时间的步进
  endStep: {
    type: String,
    default: "00:30",
  },
  // 结束时间的结束选择
  endTimeEnd: {
    type: String,
    default: "24:00",
  },
});
let startTime = ref<string>("");
let endTime = ref<string>("");
let emits = defineEmits(["startChange", "endChange"]);
watch(
  () => startTime.value,
  (val) => {
    if (!val) {
      endTime.value = "";
    } else {
      emits("startChange", val);
    }
  }
);
watch(
  () => endTime.value,
  (val) => {
    if (val) {
      emits("endChange", {
        startTime: startTime.value,
        endTime: val,
      });
    }
  }
);
</script>
<style lang="scss" scoped>
.choose-time-container {
  display: flex;
}
</style>
