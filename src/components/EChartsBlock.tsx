import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface EChartsBlockProps {
  code: string;
}

export function EChartsBlock({ code }: EChartsBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let chart: echarts.ECharts | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let rafId: number | null = null;

    const cleanup = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }

      if (chart) {
        chart.dispose();
        chart = null;
      }
    };

    let parsedOption: echarts.EChartsCoreOption;
    try {
      parsedOption = JSON.parse(code) as echarts.EChartsCoreOption;
      setError(null);
    } catch {
      setError('配置 JSON 格式错误');
      return cleanup;
    }

    if (!containerRef.current) {
      return cleanup;
    }

    try {
      chart = echarts.init(containerRef.current);
      chart.setOption(parsedOption);

      // Ensure chart gets a resize after initial layout settles.
      rafId = requestAnimationFrame(() => {
        chart?.resize();
      });

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          chart?.resize();
        });
        resizeObserver.observe(containerRef.current);
      }

      const handleResize = () => chart?.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cleanup();
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'ECharts 初始化失败';
      setError(message);
      return cleanup;
    }
  }, [code]);

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="h-64 w-full" />;
}
