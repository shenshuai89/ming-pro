import { defineComponent, PropType, resolveComponent, h } from "vue";
import { MenuItem } from "./types";
import * as ElIcons from "@element-plus/icons-vue";
const toLine = (val: string) => val!.toLowerCase();
export default defineComponent({
  name: "infiniteMenu",
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true,
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: "",
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 添加自定义属性配置
    name: {
      type: String,
      default: "name",
    },
    index: {
      type: String,
      default: "index",
    },
    icon: {
      type: String,
      default: "icon",
    },
    children: {
      type: String,
      default: "children",
    },
  },
  setup(props, ctx) {
    let renderMenu = (data: MenuItem[]) => {
      console.log(data, "dataaaaa", props);
      const { name, index, icon, children } = props;
      // 返回值 渲染成的html
      return data.map((item: MenuItem) => {
        // 2种方法 在jsx中显示icon图标的方式
        // item.idf = `icon-`+(ElIcons as any)[item[icon]];
        item.i = (ElIcons as any)[item[icon]!];
        // 下面定义的slots，相当于 <template #title>
        let slots = {
          title: () => {
            return (
              <>
                {/* 导入的动态组件，动态解析 h(resolveComponent(item.i)) */}
                <el-icon><item.i /></el-icon>
                <span>{item[name]}</span>
              </>
            );
          },
        };

        if (item[children] && item[children].length > 0) {
          return (
            <el-sub-menu index={item[index]} v-slots={slots}>
              {renderMenu(item[children]!)}
            </el-sub-menu>
          );
        }

        return (
          <el-menu-item index={item[index]}>
            <el-icon>
              <item.i />
            </el-icon>
            <span>{item[name]}</span>
          </el-menu-item>
        );
      });
    };
    return () => {
      return (
        <el-menu default-active={props.defaultActive} router={props.router}>
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
