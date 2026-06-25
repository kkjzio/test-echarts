import { isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { EChartsBlock } from './EChartsBlock';

interface PreviewPanelProps {
  content: string;
}

function extractCodeFromPreChildren(children: ReactNode): string | null {
  if (!isValidElement(children)) {
    return null;
  }

  const child = children as { props?: { className?: string; children?: ReactNode } };
  const className = child.props?.className ?? '';
  if (className.includes('language-echarts')) {
    return String(child.props?.children ?? '').replace(/\n$/, '');
  }

  return null;
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
        <ReactMarkdown
          components={{
            pre({ children }) {
              const echartsCode = extractCodeFromPreChildren(children);
              if (echartsCode !== null) {
                return <EChartsBlock code={echartsCode} />;
              }
              return <pre className="rounded bg-gray-100 p-3">{children}</pre>;
            },
            code({ className, children }) {
              return <code className={className}>{children}</code>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
