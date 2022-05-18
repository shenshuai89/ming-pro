<template>
  <el-tabs class="list-tabs-item-style">
    <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
      <el-scrollbar max-height="240px">
        <div
          class="container"
          @click="clickItem(item1, index1)"
          v-for="(item1, index1) in item.content"
          :key="index1"
        >
          <div class="avatar" v-if="item1.avatar">
            <el-avatar size="small" :src="item1.avatar"></el-avatar>
          </div>
          <div class="content">
            <div v-if="item1.title" class="title">
              <div>{{ item1.title }}</div>
              <el-tag v-if="item1.tag" size="mini" :type="item1.tagType">{{
                item1.tag
              }}</el-tag>
            </div>
            <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
            <div class="time" v-if="item1.time">{{ item1.time }}</div>
          </div>
        </div>
      </el-scrollbar>
      <div class="actions">
        <div
          class="a-item"
          :class="{ border: i !== actions.length - 1 }"
          v-for="(action, i) in actions"
          :key="i"
          @click="clickAction(action, i)"
        >
          <div class="a-icon" v-if="action.icon">
            <el-icon>
              <component :is="`icon-${toLine(action.icon)}`"></component>
            </el-icon>
          </div>
          <div class="a-text">{{ action.text }}</div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { ListOptions, ActionOptions, ListItem } from "./types";
const toLine = (val: string = "Bell") => val!.toLowerCase();
import type { TabsPaneContext } from "element-plus";
let props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
});
const activeName = ref("first");

let emits = defineEmits(["clickItem", "clickAction"]);
let clickItem = (item: ListItem, index: number) => {
  emits("clickItem", { item, index });
};
let clickAction = (item: ActionOptions, index: number) => {
  emits("clickAction", { item, index });
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 5;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
    &:hover {
      color: #336;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>
<style lang="scss">
.list-tabs-item-style {
  .el-tabs__nav {
    display: flex;
    width: 100%;
    .el-tabs__item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
