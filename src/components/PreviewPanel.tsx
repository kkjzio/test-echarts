import { Streamdown } from 'streamdown';
import { EChartsRenderer } from './EChartsRenderer';

const plugins = {
  renderers: [
    { language: 'echarts', component: EChartsRenderer },
  ],
};

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
        {/* key={content} 会让整个预览区在点击“渲染”时重新挂载,正式使用时请移除 */}
        <Streamdown key={content} plugins={plugins}>
          {content}
        </Streamdown>
      </article>
    </div>
  );
}
