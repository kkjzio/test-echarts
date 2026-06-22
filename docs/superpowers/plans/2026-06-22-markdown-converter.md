# Markdown Converter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vite + React + TypeScript Markdown editor with manual-render preview and ECharts chart embedding via ` ```echarts ` code blocks.

**Architecture:** Single-page app with resizable left/right panels. Left panel holds a textarea editor and toolbar; right panel renders CommonMark with `react-markdown`, using a custom `code` component to detect `echarts` language and render an ECharts instance. State lives in `App` and is passed down through props.

**Tech Stack:** Vite 6+, React 18+, TypeScript 5+, Tailwind CSS 4, `react-markdown`, `echarts` 5, `react-resizable-panels`, Vitest, `@testing-library/react`, `jsdom`.

---

## File Structure

- `package.json` — project dependencies and npm scripts
- `vite.config.ts` — Vite + React + Tailwind CSS plugin configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configs (Vite template defaults)
- `index.html` — page entry
- `src/main.tsx` — React root mount
- `src/App.tsx` — owns `sourceText` and `renderedText` state; composes layout
- `src/index.css` — Tailwind CSS import + minimal base styles
- `src/components/ResizablePanels.tsx` — horizontal resizable split container
- `src/components/MarkdownEditor.tsx` — textarea + render/clear toolbar
- `src/components/PreviewPanel.tsx` — `react-markdown` wrapper with custom code component
- `src/components/EChartsBlock.tsx` — parses JSON and renders an ECharts chart
- `src/components/__tests__/EChartsBlock.test.tsx` — unit tests for valid/invalid JSON handling
- `src/sample.md` — default Markdown sample shown on first load

---

### Task 1: Scaffold Vite React TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/vite-env.d.ts`

- [ ] **Step 1: Run Vite scaffold command**

Run: `npm create vite@latest . -- --template react-ts --force`
Expected output: Vite creates project files in the current directory; existing `docs/` and `.claude/` remain untouched.

- [ ] **Step 2: Verify key files exist**

Run: `ls package.json vite.config.ts tsconfig.json index.html src/main.tsx`
Expected: all files exist.

- [ ] **Step 3: Commit scaffold**

```bash
git add package.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html src/main.tsx src/vite-env.d.ts src/assets/react.svg public/vite.svg eslint.config.js .gitignore

git commit -m "chore: scaffold Vite React TypeScript project"
```

---

### Task 2: Install and configure Tailwind CSS

**Files:**
- Modify: `vite.config.ts`
- Modify: `src/index.css`
- Modify: `package.json`

- [ ] **Step 1: Install Tailwind CSS v4 Vite plugin and typography**

Run: `npm install -D tailwindcss @tailwindcss/vite @tailwindcss/typography`
Expected: packages added to `devDependencies` in `package.json`.

- [ ] **Step 2: Add Tailwind plugin to Vite config**

Modify `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 3: Replace default CSS with Tailwind import and typography plugin**

Write `src/index.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

- [ ] **Step 4: Commit Tailwind setup**

```bash
git add package.json package-lock.json vite.config.ts src/index.css
git commit -m "chore: add Tailwind CSS and typography plugin"
```

---

### Task 3: Install runtime dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Markdown and chart dependencies**

Run: `npm install react-markdown echarts react-resizable-panels`
Expected: packages added to `dependencies` in `package.json`.

- [ ] **Step 2: Commit dependencies**

```bash
git add package.json package-lock.json
git commit -m "chore: install react-markdown, echarts, react-resizable-panels"
```

---

### Task 4: Install and configure Vitest for component testing

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/components/__tests__/EChartsBlock.test.tsx` (initial failing test)

- [ ] **Step 1: Install test dependencies**

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
Expected: packages added to `devDependencies`.

- [ ] **Step 2: Add Vitest test script and config**

Modify `package.json` scripts section to add:

```json
"test": "vitest"
```

Modify `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

- [ ] **Step 3: Create test setup file**

Create `src/test-setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Write a failing smoke test to confirm Vitest works**

Create `src/components/__tests__/Smoke.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';

describe('vitest setup', () => {
  it('runs', () => {
    expect(true).toBe(true);
  });
});
```

Run: `npm run test -- --run`
Expected: one passing test.

- [ ] **Step 5: Remove temporary smoke test**

Run: `rm src/components/__tests__/Smoke.test.tsx`

- [ ] **Step 6: Commit testing setup**

```bash
git add package.json package-lock.json vite.config.ts src/test-setup.ts
git commit -m "chore: setup Vitest with React Testing Library and jsdom"
```

---

### Task 5: Implement EChartsBlock component with error handling

**Files:**
- Create: `src/components/EChartsBlock.tsx`
- Create: `src/components/__tests__/EChartsBlock.test.tsx`

- [ ] **Step 1: Write failing tests for EChartsBlock**

Create `src/components/__tests__/EChartsBlock.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EChartsBlock } from '../EChartsBlock';

const mockSetOption = vi.fn();
const mockDispose = vi.fn();
const mockResize = vi.fn();

vi.mock('echarts', () => ({
  init: vi.fn(() => ({
    setOption: mockSetOption,
    dispose: mockDispose,
    resize: mockResize,
  })),
}));

describe('EChartsBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes chart with parsed option for valid JSON', () => {
    render(<EChartsBlock code='{"title":{"text":"test"}}' />);
    expect(mockSetOption).toHaveBeenCalledWith({ title: { text: 'test' } });
  });

  it('shows error message for invalid JSON', () => {
    render(<EChartsBlock code='not valid json' />);
    expect(screen.getByText(/JSON 格式错误/)).toBeInTheDocument();
    expect(mockSetOption).not.toHaveBeenCalled();
  });
});
```

Run: `npm run test -- --run src/components/__tests__/EChartsBlock.test.tsx`
Expected: FAIL — `EChartsBlock` is not defined or exported.

- [ ] **Step 2: Implement EChartsBlock**

Create `src/components/EChartsBlock.tsx`:

```tsx
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface EChartsBlockProps {
  code: string;
}

export function EChartsBlock({ code }: EChartsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let option: echarts.EChartsCoreOption;
    try {
      option = JSON.parse(code);
      setError(null);
    } catch {
      setError('配置 JSON 格式错误');
      return;
    }

    const chart = echarts.init(containerRef.current);
    chartRef.current = chart;

    try {
      chart.setOption(option);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ECharts 初始化失败');
      chart.dispose();
      chartRef.current = null;
      return;
    }

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
      chartRef.current = null;
    };
  }, [code]);

  if (error) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="h-64 w-full" />;
}
```

- [ ] **Step 3: Run tests to verify EChartsBlock passes**

Run: `npm run test -- --run src/components/__tests__/EChartsBlock.test.tsx`
Expected: both tests pass.

- [ ] **Step 4: Commit EChartsBlock**

```bash
git add src/components/EChartsBlock.tsx src/components/__tests__/EChartsBlock.test.tsx
git commit -m "feat: add EChartsBlock with JSON parsing and error handling"
```

---

### Task 6: Implement MarkdownEditor component

**Files:**
- Create: `src/components/MarkdownEditor.tsx`

- [ ] **Step 1: Write MarkdownEditor component**

Create `src/components/MarkdownEditor.tsx`:

```tsx
interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRender: () => void;
  onClear: () => void;
}

export function MarkdownEditor({ value, onChange, onRender, onClear }: MarkdownEditorProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 p-2">
        <button
          type="button"
          onClick={onRender}
          className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          渲染
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          清空
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 resize-none p-4 font-mono text-sm leading-relaxed outline-none"
        placeholder="在此输入 Markdown..."
        spellCheck={false}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit MarkdownEditor**

```bash
git add src/components/MarkdownEditor.tsx
git commit -m "feat: add MarkdownEditor component"
```

---

### Task 7: Implement PreviewPanel component

**Files:**
- Create: `src/components/PreviewPanel.tsx`

- [ ] **Step 1: Write PreviewPanel component**

Create `src/components/PreviewPanel.tsx`:

```tsx
import ReactMarkdown from 'react-markdown';
import { EChartsBlock } from './EChartsBlock';

interface PreviewPanelProps {
  content: string;
}

export function PreviewPanel({ content }: PreviewPanelProps) {
  if (!content) {
    return (
      <div className="flex h-full items-center justify-center text-gray-400">
        点击渲染查看效果
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-white p-6">
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown
          components={{
            code(props) {
              const { className, children } = props;
              const lang = className?.replace('language-', '');
              const code = String(children).replace(/\n$/, '');

              if (lang === 'echarts') {
                return <EChartsBlock code={code} />;
              }

              return (
                <pre className="rounded bg-gray-100 p-3">
                  <code className={className}>{children}</code>
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Commit PreviewPanel**

```bash
git add src/components/PreviewPanel.tsx
git commit -m "feat: add PreviewPanel with react-markdown and ECharts support"
```

---

### Task 8: Implement ResizablePanels layout wrapper

**Files:**
- Create: `src/components/ResizablePanels.tsx`

- [ ] **Step 1: Write ResizablePanels component**

Create `src/components/ResizablePanels.tsx`:

```tsx
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import type { ReactNode } from 'react';

interface ResizablePanelsProps {
  left: ReactNode;
  right: ReactNode;
}

export function ResizablePanels({ left, right }: ResizablePanelsProps) {
  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      <Panel defaultSize={50} minSize={20}>
        {left}
      </Panel>
      <PanelResizeHandle className="w-1 bg-gray-200 transition-colors hover:bg-blue-400" />
      <Panel defaultSize={50} minSize={20}>
        {right}
      </Panel>
    </PanelGroup>
  );
}
```

- [ ] **Step 2: Commit ResizablePanels**

```bash
git add src/components/ResizablePanels.tsx
git commit -m "feat: add ResizablePanels layout component"
```

---

### Task 9: Add default sample Markdown content

**Files:**
- Create: `src/sample.md`

- [ ] **Step 1: Create sample Markdown file**

Create `src/sample.md`:

````markdown
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
````

- [ ] **Step 2: Commit sample content**

```bash
git add src/sample.md
git commit -m "chore: add default sample Markdown content"
```

---

### Task 10: Wire components together in App

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace default App with Markdown converter layout**

Write `src/App.tsx`:

```tsx
import { useState } from 'react';
import { MarkdownEditor } from './components/MarkdownEditor';
import { PreviewPanel } from './components/PreviewPanel';
import { ResizablePanels } from './components/ResizablePanels';
import sampleMarkdown from './sample.md?raw';

export function App() {
  const [sourceText, setSourceText] = useState(sampleMarkdown);
  const [renderedText, setRenderedText] = useState(sampleMarkdown);

  const handleRender = () => {
    setRenderedText(sourceText);
  };

  const handleClear = () => {
    setSourceText('');
    setRenderedText('');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50">
      <ResizablePanels
        left={
          <MarkdownEditor
            value={sourceText}
            onChange={setSourceText}
            onRender={handleRender}
            onClear={handleClear}
          />
        }
        right={<PreviewPanel content={renderedText} />}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit App wiring**

```bash
git add src/App.tsx
git commit -m "feat: wire editor, preview, and resizable panels in App"
```

---

### Task 11: Clean up default Vite assets and verify build

**Files:**
- Delete: `src/assets/react.svg`
- Delete: `public/vite.svg`
- Modify: `index.html` (optional title update)

- [ ] **Step 1: Remove unused default assets**

Run:
```bash
rm src/assets/react.svg
rm public/vite.svg
rmdir src/assets 2>/dev/null || true
rmdir public 2>/dev/null || true
```

- [ ] **Step 2: Update page title**

Modify `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markdown 转换器</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Since `public/vite.svg` was removed, also remove the `<link rel="icon" ... />` line:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Markdown 转换器</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Verify TypeScript and build**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Commit cleanup**

```bash
git add index.html
git add -u
git commit -m "chore: remove default Vite assets and update page title"
```

---

### Task 12: Run dev server and manual verification

**Files:** none

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Expected: Vite starts on `http://localhost:5173/` (or next available port).

- [ ] **Step 2: Verify golden path**

Open `http://localhost:5173/` in a browser (or use the run/verify skill). Verify:
- Left panel shows sample Markdown.
- Right panel renders the sample Markdown and the bar chart.
- Editing the left text and clicking **渲染** updates the right preview.
- Clicking **清空** clears both panels and shows "点击渲染查看效果".
- Resizing the divider changes panel widths.

- [ ] **Step 3: Verify error handling**

Replace the ECharts JSON with invalid JSON, click **渲染**, and verify the preview shows a red error placeholder instead of crashing.

- [ ] **Step 4: Stop dev server**

Press `Ctrl+C` in the terminal running the dev server.

---

## Self-Review

**Spec coverage:**
- Vite + React + TypeScript + Tailwind CSS — Task 1, 2.
- CommonMark via `react-markdown` — Task 7.
- ECharts via ` ```echarts ` code block — Task 5, 7.
- Manual render button — Task 6, 10.
- Resizable panels — Task 8.
- Error handling for invalid JSON — Task 5 tests and implementation.
- Default sample content — Task 9.
- Tests for EChartsBlock — Task 5.

**Placeholder scan:**
- No TBD, TODO, or vague steps. Every step includes exact file paths, code, or commands.

**Type consistency:**
- Props interfaces (`MarkdownEditorProps`, `PreviewPanelProps`, `ResizablePanelsProps`) defined once and used consistently.
- `EChartsBlock` receives `code: string` in both implementation and tests.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-22-markdown-converter.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach do you want to use?
