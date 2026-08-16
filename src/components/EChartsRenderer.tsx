import { CodeBlockContainer, CodeBlockHeader } from 'streamdown';
import type { CustomRendererProps } from 'streamdown';
import { EChartsBlock } from './EChartsBlock';

export function EChartsRenderer({ code, language, isIncomplete }: CustomRendererProps) {
  if (isIncomplete) {
    return <div className="animate-pulse h-48 rounded-lg bg-gray-200" />;
  }

  return (
    <CodeBlockContainer language={language}>
      <CodeBlockHeader language={language} />
      <EChartsBlock code={code} />
    </CodeBlockContainer>
  );
}
