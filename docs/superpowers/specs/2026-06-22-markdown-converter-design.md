# Markdown 页面转换器设计文档

## 项目概述

一个基于 TypeScript + React + Tailwind CSS 的 Markdown 转换工具页面。左侧输入 Markdown 文本，右侧显示渲染效果，支持通过 ` ```echarts ` 代码块嵌入 ECharts 图表。

## 目标与约束

- **目标**：提供一个简单、稳定的 Markdown 编辑与预览工具，支持 ECharts 图表渲染。
- **约束**：
  - 仅支持基础 Markdown（CommonMark），不扩展 GFM、数学公式、Mermaid 等。
  - 渲染为手动触发，避免输入时频繁刷新。
  - 使用 React 生态标准库，便于后续扩展。

## 技术栈

- **构建工具**：Vite（React + TypeScript 模板）
- **UI 框架**：React 18 + Tailwind CSS
- **Markdown 渲染**：`react-markdown`（CommonMark）
- **图表**：`echarts` 5.x
- **分栏布局**：`react-resizable-panels`

## 组件结构

```
App
├── ResizablePanels
│   ├── MarkdownEditor
│   │   ├── Toolbar（渲染按钮、清空按钮）
│   │   └── Textarea
│   └── PreviewPanel
│       └── react-markdown
│           └── code 组件覆盖
│               ├── EChartsBlock（lang === 'echarts'）
│               └── 普通代码块
```

### 各组件职责

| 组件 | 职责 |
|------|------|
| `App` | 管理全局状态 `sourceText` 与 `renderedText`，组合布局。 |
| `ResizablePanels` | 提供可拖动的左右分栏容器。 |
| `MarkdownEditor` | 渲染左侧编辑区，包含工具栏和 `<textarea>`。 |
| `PreviewPanel` | 接收 `renderedText`，使用 `react-markdown` 渲染。 |
| `EChartsBlock` | 自定义代码块组件，解析 JSON 并初始化 ECharts。 |

## 数据流

1. 用户在 `MarkdownEditor` 的 `<textarea>` 中输入，更新 `sourceText`。
2. 用户点击工具栏的"渲染"按钮，`App` 将 `sourceText` 赋值给 `renderedText`。
3. `PreviewPanel` 使用 `react-markdown` 解析 `renderedText`。
4. 当遇到 `lang === 'echarts'` 的代码块时，渲染 `EChartsBlock` 组件。
5. `EChartsBlock` 解析 JSON，调用 `echarts.init(container).setOption(option)` 渲染图表。
6. 组件卸载时调用 `echartsInstance.dispose()` 释放资源。

## ECharts 集成

Markdown 中通过以下语法插入图表：

````markdown
```echarts
{
  "title": { "text": "示例图表" },
  "xAxis": { "type": "category", "data": ["A", "B", "C"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [1, 2, 3] }]
}
```
````

代码块内直接放置 ECharts 配置对象 JSON，不需要 `option = ` 包裹。

## 错误处理

- **JSON 解析失败**：在图表位置显示红色错误占位块，提示配置 JSON 格式错误。
- **ECharts 初始化失败**：捕获异常并显示错误信息，避免页面崩溃。
- **空内容**：预览区显示默认提示，例如"点击渲染查看效果"。

## 默认状态

页面加载时，左侧预置一段示例 Markdown，包含普通文本和一个 ECharts 柱状图示例，便于用户立即体验功能。

## 测试策略

- **单元测试**：验证 `EChartsBlock` 对有效/无效 JSON 的处理。
- **集成测试**：验证点击"渲染"按钮后，预览区正确渲染 Markdown 和 ECharts 图表。

## 后续可扩展点

- 添加 `remark-gfm` 支持表格、任务列表等 GFM 特性。
- 替换 `<textarea>` 为 Monaco Editor 或带语法高亮的代码编辑器。
- 支持导出 HTML、PDF。
- 支持本地存储自动保存。

## 未决事项

无。
