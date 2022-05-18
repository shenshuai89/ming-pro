import { ElMessage } from "element-plus";
// 添加复制文本的方法
export const useCopy = (text: string) => {
  // 通过新建input元素
  let input = document.createElement("input");
  // 把text赋值给 input的value
  input.value = text;
  document.body.appendChild(input);
  input.select();
  // 执行复制操作
  document.execCommand("copy");
  document.body.removeChild(input);
  ElMessage.success("复制成功");
};
