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
