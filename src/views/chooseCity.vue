<template>
  <m-choose-city @changeCity="city" @changeProvince="province"></m-choose-city>
</template>

<script setup lang="ts">
const city = (val: { name: string }) => {
  console.log(val.name);
};
const province = (val: string) => {
  console.log(val);
};
</script>
<style lang="scss" scoped></style>
