## 关于element 自定义列插槽的使用

[自定义插槽](https://element-plus.gitee.io/zh-CN/component/table.html#table-column-%E6%8F%92%E6%A7%BD)

[自定义列的插槽](https://element-plus.gitee.io/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%97%E6%A8%A1%E6%9D%BF)
[自定义表头](https://element-plus.gitee.io/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4)，使用#header插槽

## 操作栏，设置editRowTag属性的重要型
- 在操作rowClick时，虽然可以拿到row和colunm的信息，但是对应操作一列**是无法区分编辑还是删除按钮**。
- 通过父级点击操作，然后设置上editRowTag属性来区分操作类型，可以是edit，也可以是delete，或者其他都可