# Markdown 示例

左侧输入 Markdown，点击上方 **渲染** 按钮查看效果。

## 普通文本

- 支持列表
- 支持**加粗**和*斜体*
- 支持 `行内代码`

## ECharts 图表

通过 ` ```echarts ` 代码块插入图表：

```echarts
{
  "title": { "text": "示例柱状图" },
  "xAxis": { "type": "category", "data": ["A", "B", "C"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [120, 200, 150] }]
}
```

## 代码块

```js
console.log('Hello, Markdown!');
```
