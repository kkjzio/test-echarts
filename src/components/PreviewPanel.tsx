import ReactMarkdown from 'react-markdown';
import { EChartsBlock } from './EChartsBlock';

interface PreviewPanelProps {
  content: string;
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
            code(props) {
              const { className, children } = props;
              const lang = className?.replace('language-', '');
              const code = String(children).replace(/\n$/, '');

              if (lang === 'echarts') {
                return <EChartsBlock code={code} />;
              }

              return (
                <pre className="rounded bg-gray-100 p-3">
                  <code className={className}>{children}</code>
                </pre>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
