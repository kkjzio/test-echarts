import { Group, Panel, Separator } from 'react-resizable-panels';
import type { ReactNode } from 'react';

interface ResizablePanelsProps {
  left: ReactNode;
  right: ReactNode;
}

export function ResizablePanels({ left, right }: ResizablePanelsProps) {
  return (
    <Group orientation="horizontal" className="h-full w-full">
      <Panel id="left-panel" defaultSize={50} minSize={20}>
        {left}
      </Panel>
      <Separator
        id="resize-separator"
        className="w-1 bg-gray-200 transition-colors hover:bg-blue-400"
      />
      <Panel id="right-panel" defaultSize={50} minSize={20}>
        {right}
      </Panel>
    </Group>
  );
}
