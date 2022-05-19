<template>
  <div style="max-width: 300px">
    <m-menu :data="data1" defaultActive="2"></m-menu>
  </div>
</template>

<script setup lang="ts">
let data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
      },
    ],
  },
];
let data2 = [
  {
    a: "导航1",
    b: "1",
    c: "Document",
  },
  {
    a: "导航2",
    b: "2",
    c: "Document",
  },
  {
    a: "导航3",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
        d: [
          {
            a: "导航3-1-1",
            b: "3-1-1",
            c: "Document",
            d: [
              {
                a: "导航3-1-1-1",
                b: "3-1-1-1",
                c: "Document",
                d: [
                  {
                    a: "导航3-1-1-1-1",
                    b: "3-1-1-1-1",
                    c: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>
<style lang="scss" scoped></style>
