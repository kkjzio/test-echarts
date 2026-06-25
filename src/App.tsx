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
