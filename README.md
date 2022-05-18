## ming-pro组件库
> ming-pro组件库是对element-plus的二次封装，在使用更易用。库是依赖element-plus以及icon，使用前先安装element-plus及icon相关设置。

### 直接引用
``` html
<link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
<link rel="stylesheet" href="https://unpkg.com/ming-pro/lib/style.css" />
<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/element-plus"></script>
<script src="https://unpkg.com/@element-plus/icons-vue"></script>
<script src="https://unpkg.com/ming-pro/lib/ming-pro.umd.js"></script>
```
``` js
let { ref, createApp } = Vue;
let App = {
    setup() {
        const visible = ref(false);
        return {
        visible,
        };
    },
    template:
    "<h1>hello MingPro!<m-choose-icon title='图标列表' v-model:visible='visible'>选择图标</m-choose-icon></h1>",
};
let app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`icon-${toLine(key)}`, component);
}
function toLine(value) {
    return value.replace(/(A-Z)g/, "-$1").toLowerCase();
}
app.use(ElementPlus).use(MingPro).mount("#app");
```

### 下载安装
yarn add ming-pro -D
修改main.ts
``` js
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import MingPro from "ming-pro";
import "ming-pro/lib/style.css";

const app = createApp(App);
app.use(router).use(ElementPlus).use(MingPro).mount("#app");
```
