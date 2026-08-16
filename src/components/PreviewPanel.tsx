import { Streamdown, Block, type BlockProps } from 'streamdown';
import { EChartsBlock } from './EChartsBlock';

interface PreviewPanelProps {
  content: string;
}

// Matches a block that is exactly one ```echarts fence and captures the JSON body.
const ECHARTS_BLOCK_RE = /^```echarts\s*\n?([\s\S]*?)\n?```\s*$/;

function MarkdownBlock(props: BlockProps) {
  if (props.isIncomplete) {
    return <Block {...props} />;
  }

  const match = ECHARTS_BLOCK_RE.exec(props.content.trim());
  if (match) {
    return <EChartsBlock code={match[1].trim()} />;
  }

  return <Block {...props} />;
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
        <Streamdown BlockComponent={MarkdownBlock}>{content}</Streamdown>
      </article>
    </div>
  );
}
