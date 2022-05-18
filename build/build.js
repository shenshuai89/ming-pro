const path = require("path");
const fs = require("fs");
const endOfLine = require("os").EOL;
var render = require("json-templater/string");
const exec = require("child_process").execSync;
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const components = require("../components.json");
const OUTPUT_INDEX_PATH = path.join(__dirname, "../packages/index.ts");
const OUTPUT_VUE_PATH = path.join(__dirname, "../packages/vue.d.ts");

const IMPORT_TEMPLATE = "import {{name}} from './{{name}}';";
const INSTALL_COMPONENT_TEMPLATE = "  {{name}}";
let includeComponentTemplate = [];
let installTemplate = [];
const MAIN_TEMPLATE = `/* Automatically generated by './build/build.js' */
import { App } from "vue";
{{include}}
const components = [
  {{install}},
];

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component);
    });
  },
};
`;
/* 清空下packages的内容 */
const packagesPath = path.join(__dirname, "../packages");
function cleanupPackages(packagesPath) {
  const isExistPackages = fs.existsSync(packagesPath);
  // 存在则清除
  if (isExistPackages) {
    delDir(packagesPath);
    // exec("rm -rf " + packagesPath, { stdio: "inherit" });
  }
  // 不存在则创建
  fs.mkdirSync(packagesPath);
}
cleanupPackages(packagesPath);

function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

// 生成packages中内容
Object.keys(components).forEach((list) => {
  includeComponentTemplate.push(
    render(IMPORT_TEMPLATE, {
      name: list,
    })
  );
  installTemplate.push(
    render(INSTALL_COMPONENT_TEMPLATE, {
      name: list,
    })
  );
  exec(
    "cp -r " +
      path.resolve(__dirname, "../src/components/" + list) +
      " " +
      path.resolve(__dirname, "../packages/" + list),
    { stdio: "inherit" }
  );
});
var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join("," + endOfLine),
});
fs.writeFileSync(OUTPUT_INDEX_PATH, template);
fs.writeFileSync(
  OUTPUT_VUE_PATH,
  `declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}`
);
console.log("更新packages内容完成");

// 打包入口
const entryDir = path.resolve(__dirname, "../packages");
const outDir = path.resolve(__dirname, "../lib");

//vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

// rollup配置
const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

// 全量打包
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, "./index.ts"),
        name: "MingPro",
        fileName: "ming-pro",
        formats: ["es", "umd"],
      },
      outDir,
      // emptyOutDir: false, //是否清除原目录下的文件
    },
  });
  const declareVue = `// 声明当前组件库是vue的插件
import {App} from "vue"
declare const _default: {
    install(app: App): void;
}
export default _default;
`;
  fs.writeFileSync(path.resolve(outDir, `./index.d.ts`), declareVue);
};

// 单组件打包构建
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name + "/index.ts"),
        name: "index",
        fileName: "index",
        formats: ["es", "umd"],
      },
      outDir: path.resolve(outDir, name),
    },
  });
};
// 单组件打包时，给每个组件创建package.json文件
const createPackageJson = (name) => {
  const jsonStr = `
  {
    "name": "${name}",
    "main": "index.umd.js",
    "module": "index.es.js",
    "style": "style.css"
  }
  `;
  const declareVue = `// 声明当前组件库是vue的插件
import {App} from "vue"
declare const _default: {
  install(app: App): void;
}
export default _default;
`;
  fs.writeFileSync(path.resolve(outDir, `${name}/package.json`), jsonStr);
  fs.writeFileSync(path.resolve(outDir, `${name}/index.d.ts`), declareVue);
};

const buildLib = async () => {
  await buildAll();
  Object.keys(components).forEach(async (component) => {
    console.log("开始单组件打包", component);
    await buildSingle(component);
    createPackageJson(component);
  });
};
buildLib();
