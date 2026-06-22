import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface EChartsBlockProps {
  code: string;
}

export function EChartsBlock({ code }: EChartsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let parsedOption: echarts.EChartsCoreOption;
    try {
      parsedOption = JSON.parse(code) as echarts.EChartsCoreOption;
    } catch {
      setError('配置 JSON 格式错误');
      return;
    }

    if (!containerRef.current) {
      return;
    }

    try {
      const chart = echarts.init(containerRef.current);
      chartRef.current = chart;
      chart.setOption(parsedOption);
      setError(null);

      const handleResize = () => {
        chart.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
        chartRef.current = null;
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'ECharts 初始化失败';
      setError(message);
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    }
  }, [code]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-64" />;
}
