# Markdown Converter

English | [中文](./README.zh-CN.md)

A simple Markdown editor and preview tool built with React, TypeScript, and Tailwind CSS. Supports embedded [ECharts](https://echarts.apache.org/) charts via ` ```echarts ` code blocks.

## Features

- Resizable left/right editor and preview panes
- Manual render trigger to avoid frequent refreshes while typing
- Render ECharts charts directly from Markdown code blocks
- Clean UI powered by Tailwind CSS
- TypeScript and unit tests included

## Preview

![Preview](./docs/preview.png)


## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [ECharts](https://echarts.apache.org/) - Charts
- [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) - Resizable layout
- [Vitest](https://vitest.dev/) - Testing

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Usage

Write Markdown in the left panel, then click **Render** to update the preview on the right.

### Embed an ECharts chart

Use a code block with language `echarts`:

````markdown
```echarts
{
  "title": { "text": "Sample Chart" },
  "xAxis": { "type": "category", "data": ["A", "B", "C"] },
  "yAxis": { "type": "value" },
  "series": [{ "type": "bar", "data": [1, 2, 3] }]
}
```
````

The JSON content is passed directly to `echarts.setOption()`.

## Project Structure

```
src/
├── App.tsx                 # Application root and state
├── components/
│   ├── MarkdownEditor.tsx  # Left editor panel
│   ├── PreviewPanel.tsx    # Right preview panel
│   ├── ResizablePanels.tsx # Layout wrapper
│   └── EChartsBlock.tsx    # Custom code block for ECharts
├── index.css
└── main.tsx
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

## License

[MIT](./LICENSE)
