<template>
  <el-popover
    v-model:visible="isShowPopover"
    placement="bottom-start"
    :width="400"
  >
    <template #reference>
      <span @click="isShowPopover = !isShowPopover">
        {{ defaultText }}
        <el-icon :class="[isShowPopover ? 'rotate' : 'reset']"
          ><icon-arrowdownbold
        /></el-icon>
      </span>
    </template>
    <div class="city-popover-container">
      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="radioValue" size="small">
            <el-radio-button label="city">按城市</el-radio-button>
            <el-radio-button label="province">按省份</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="15">
          <el-select
            @change="changeSelect"
            placeholder="请搜索城市"
            size="small"
            v-model="selectCityValue"
            filterable
            clearable
            :filter-method="filterMethod"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === 'city'">
        <div class="city">
          <div
            v-for="(value, key) in cities"
            :key="key"
            @click="clickChat(key)"
            class="city-item"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="400px">
          <template v-for="(value, key) in cities" :key="key">
            <el-row :id="key">
              <el-col :span="2">{{ key }}:</el-col>
              <el-col :span="22" class="city-name">
                <div
                  @click="clickCityItem(item)"
                  class="city-name-item"
                  v-for="item in value"
                  :key="item.id"
                >
                  <div>{{ item.name }}</div>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            v-for="(item, index) in Object.keys(provinces)"
            :key="index"
            @click="clickChat(item)"
          >
            {{ item }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(province, idx) in Object.values(provinces)"
            :key="idx"
          >
            <template v-for="(list, index) in province" :key="index">
              <el-row style="margin-bottom: 10px" :id="list.id">
                <el-col :span="3">{{ list.name }}:</el-col>
                <el-col :span="21" class="province-name">
                  <div
                    class="province-name-item"
                    v-for="(item, index2) in list.data"
                    :key="index2"
                  >
                    <div @click="clickProvinceItem(item)">{{ item }}</div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import city from "../data/city";
import provinces from "../data/province.json";
interface City {
  id: number;
  // 拼音
  spell: string;
  // 名字
  name: string;
}
export interface Province {
  name: string;
  data: string[];
  id?: string;
}
// 用户没有填写插槽内容
const defaultText = ref<string>("选择城市");
// 是否显示弹窗
const isShowPopover = ref<boolean>(false);
// 单选的值，是按照城市还是按照省份
const radioValue = ref<string>("city");
// 城市的数据
const cities = ref(city.cities);
// 所有的城市数据，把cites数据拍平
let allCity = ref<City[]>([]);
// 下拉框的值 搜索下拉框
let selectValue = ref<string>("");
// 下拉框显示城市的数据
let options = ref<City[]>([]);
// 筛选框中的值
const selectCityValue = ref<string>("");

// 分发事件
let emits = defineEmits(["changeCity", "changeProvince"]);
const clickCityItem = (item: City) => {
  isShowPopover.value = false;
  defaultText.value = item.name;
  selectCityValue.value = item.name;
  emits("changeCity", item);
};
const clickProvinceItem = (item: string) => {
  isShowPopover.value = false;
  defaultText.value = item;
  selectCityValue.value = item;
  emits("changeProvince", item);
};

// 点击字母区域
let clickChat = (item: string) => {
  // 给不同区块设置ID，让页面滚动到对应的ID位置
  let el = document.getElementById(item);
  if (el) el.scrollIntoView();
};

const filterMethod = (fliterVal: string) => {
  const findCity = allCity.value.filter(
    (city) => city.name.includes(fliterVal) || city.spell.includes(fliterVal)
  );
  if (fliterVal === "") {
    options = allCity;
  } else {
    options.value = findCity;
  }
};

const changeSelect = (val: number) => {
  if (val) {
    let city = allCity.value.find((item) => item.id === val)!;
    defaultText.value = city.name;
    isShowPopover.value = false;
  } else {
    defaultText.value = "选择城市";
    selectCityValue.value = "";
  }
};

onMounted(() => {
  // 获取下拉框的城市数据
  let values = Object.values(cities.value).flat(2);
  allCity.value = values;
  options.value = values;
});
</script>

<style lang="scss" scoped>
.rotate {
  transform: rotate(180deg);
  transition: all 0.25s linear;
}
.reset {
  transform: rotate(0deg);
  transition: all 0.25s linear;
}
.city,
.province {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  &-item {
    padding: 3px 6px;
    margin-right: 8px;
    border: 1px solid #eee;
    margin-bottom: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
      color: #409eff;
    }
  }
}
.city-name,
.province-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .city-name-item,
  .province-name-item {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
