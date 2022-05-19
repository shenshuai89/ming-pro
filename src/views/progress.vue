<template>
  <m-progress :isAnimation="true" :time="3000" :percentage="38"></m-progress>
  <m-progress :isAnimation="true" :time="3000" :percentage="58" type="circle" status="success"></m-progress>
  <m-progress :isAnimation="true" :time="3000" :percentage="20" type="circle" status="warning"></m-progress>
  <m-progress :isAnimation="true" :time="3000" :percentage="99" type="circle"></m-progress>
</template>

<script setup lang='ts'>
  
</script>
<style lang='scss' scoped>

</style>