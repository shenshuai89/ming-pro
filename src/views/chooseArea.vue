<template>
  <m-choose-area @change="showArea"></m-choose-area>
  <p style="text-align: left">您选择了：{{ selectArea }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
const selectArea = ref<string>("");
type areaType = { name: string; code: string };
interface IAreaData {
  province: areaType;
  city: areaType;
  area: areaType;
}
const showArea = (value: IAreaData) => {
  const { province, city, area } = value;
  selectArea.value = province.name + " " + city.name + " " + area.name;
};
</script>
<style lang="scss" scoped></style>
