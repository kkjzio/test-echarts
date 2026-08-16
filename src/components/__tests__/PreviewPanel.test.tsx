import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PreviewPanel } from '../PreviewPanel';

vi.mock('../EChartsBlock', () => ({
  EChartsBlock: ({ code }: { code: string }) => <div data-testid="echarts-block">{code}</div>,
}));

describe('PreviewPanel', () => {
  it('shows placeholder when content is empty', () => {
    render(<PreviewPanel content="" />);
    expect(screen.getByText('点击渲染查看效果')).toBeInTheDocument();
  });

  it('renders Markdown content', () => {
    const content = `# Hello

Some text`;
    render(<PreviewPanel content={content} />);
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('renders EChartsBlock for echarts code blocks', () => {
    const content = "```echarts\n{\"title\":{\"text\":\"test\"}}\n```";
    render(<PreviewPanel content={content} />);
    expect(screen.getByTestId('echarts-block')).toHaveTextContent('{"title":{"text":"test"}}');
  });

  it('renders regular code blocks', () => {
    const content = "```js\nconsole.log('hi')\n```";
    render(<PreviewPanel content={content} />);
    expect(screen.getByText("console.log('hi')")).toBeInTheDocument();
  });

  it('renders inline code without pre wrapper', () => {
    render(<PreviewPanel content="Use `npm install` to install." />);
    const code = screen.getByText('npm install');
    expect(code.tagName).toBe('CODE');
    expect(code.parentElement?.tagName).not.toBe('PRE');
  });
});
