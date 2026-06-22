import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MarkdownEditor } from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  it('renders textarea with value and placeholder', () => {
    render(
      <MarkdownEditor value="hello" onChange={vi.fn()} onRender={vi.fn()} onClear={vi.fn()} />
    );
    const textarea = screen.getByPlaceholderText('在此输入 Markdown...');
    expect(textarea).toHaveValue('hello');
  });

  it('calls onChange when text is typed', () => {
    const handleChange = vi.fn();
    render(
      <MarkdownEditor value="" onChange={handleChange} onRender={vi.fn()} onClear={vi.fn()} />
    );
    const textarea = screen.getByPlaceholderText('在此输入 Markdown...');
    fireEvent.change(textarea, { target: { value: 'new text' } });
    expect(handleChange).toHaveBeenCalledWith('new text');
  });

  it('calls onRender when render button is clicked', () => {
    const handleRender = vi.fn();
    render(
      <MarkdownEditor value="" onChange={vi.fn()} onRender={handleRender} onClear={vi.fn()} />
    );
    fireEvent.click(screen.getByText('渲染'));
    expect(handleRender).toHaveBeenCalledTimes(1);
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = vi.fn();
    render(
      <MarkdownEditor value="" onChange={vi.fn()} onRender={vi.fn()} onClear={handleClear} />
    );
    fireEvent.click(screen.getByText('清空'));
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
