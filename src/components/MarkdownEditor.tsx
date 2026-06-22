interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRender: () => void;
  onClear: () => void;
}

export function MarkdownEditor({ value, onChange, onRender, onClear }: MarkdownEditorProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 p-2">
        <button
          type="button"
          onClick={onRender}
          className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
        >
          渲染
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          清空
        </button>
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex-1 resize-none p-4 font-mono text-sm leading-relaxed outline-none"
        placeholder="在此输入 Markdown..."
        spellCheck={false}
      />
    </div>
  );
}
