import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResizablePanels } from '../ResizablePanels';

vi.mock('react-resizable-panels', () => ({
  Panel: ({ children }: { children: React.ReactNode }) => <div data-testid="panel">{children}</div>,
  Group: ({ children }: { children: React.ReactNode }) => <div data-testid="panel-group">{children}</div>,
  Separator: () => <div data-testid="resize-handle" />,
}));

describe('ResizablePanels', () => {
  it('renders left and right children', () => {
    render(
      <ResizablePanels left={<div>Left Panel</div>} right={<div>Right Panel</div>} />
    );
    expect(screen.getByText('Left Panel')).toBeInTheDocument();
    expect(screen.getByText('Right Panel')).toBeInTheDocument();
    expect(screen.getByTestId('panel-group')).toBeInTheDocument();
  });
});
