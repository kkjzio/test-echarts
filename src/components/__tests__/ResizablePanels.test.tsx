import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResizablePanels } from '../ResizablePanels';

vi.mock('react-resizable-panels', () => ({
  Panel: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <div data-testid="panel" data-panel-id={id}>{children}</div>
  ),
  Group: ({ children }: { children: React.ReactNode }) => <div data-testid="panel-group">{children}</div>,
  Separator: ({ id }: { id?: string }) => <div data-testid="resize-handle" data-separator-id={id} />,
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

  it('renders two panels and a separator', () => {
    render(
      <ResizablePanels left={<div>Left</div>} right={<div>Right</div>} />
    );
    expect(screen.getAllByTestId('panel')).toHaveLength(2);
    expect(screen.getByTestId('resize-handle')).toBeInTheDocument();
  });

  it('passes ids to panels and separator', () => {
    render(
      <ResizablePanels left={<div>Left</div>} right={<div>Right</div>} />
    );
    const panels = screen.getAllByTestId('panel');
    expect(panels[0]).toHaveAttribute('data-panel-id', 'left-panel');
    expect(panels[1]).toHaveAttribute('data-panel-id', 'right-panel');
    expect(screen.getByTestId('resize-handle')).toHaveAttribute(
      'data-separator-id',
      'resize-separator'
    );
  });
});
