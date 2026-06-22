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
