import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

// 组件 props 类型定义：接收一段 ECharts 配置 JSON 字符串
interface EChartsBlockProps {
  code: string;
}

/**
 * EChartsBlock 组件
 *
 * 将传入的 JSON 字符串解析为 ECharts 配置项，并在容器内渲染图表。
 * 同时处理了错误展示、尺寸自适应以及资源清理。
 */
export function EChartsBlock({ code }: EChartsBlockProps) {
  // 指向图表容器 DOM 的引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 错误信息状态，用于展示 JSON 解析或图表初始化错误
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 图表实例，初始化成功后赋值
    let chart: echarts.ECharts | null = null;
    // ResizeObserver 实例，用于监听容器尺寸变化
    let resizeObserver: ResizeObserver | null = null;
    // requestAnimationFrame 的 id，用于取消未执行的 resize 回调
    let rafId: number | null = null;

    /**
     * 清理函数
     * 取消动画帧、断开 ResizeObserver、销毁图表实例，防止内存泄漏。
     */
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

    // 用于保存解析后的 ECharts 配置项
    let parsedOption: echarts.EChartsCoreOption;

    // 第一步：尝试将传入的字符串解析为 JSON 配置
    try {
      parsedOption = JSON.parse(code) as echarts.EChartsCoreOption;
      // 解析成功后清除之前的错误状态
      setError(null);
    } catch {
      // JSON 格式不合法时展示错误信息并提前清理
      setError('配置 JSON 格式错误');
      return cleanup;
    }

    // 第二步：确认容器 DOM 已经挂载
    if (!containerRef.current) {
      return cleanup;
    }

    // 第三步：初始化 ECharts 实例并设置响应式监听
    try {
      // 在容器 DOM 上初始化 ECharts 实例
      chart = echarts.init(containerRef.current);

      // 将解析后的配置项应用到图表
      chart.setOption(parsedOption);

      // 在浏览器下一次重绘前执行一次 resize，确保图表在初始布局稳定后尺寸正确
      rafId = requestAnimationFrame(() => {
        chart?.resize();
      });

      // 如果浏览器支持 ResizeObserver，则监听容器自身尺寸变化并自动调整图表大小
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          chart?.resize();
        });
        resizeObserver.observe(containerRef.current);
      }

      // 同时监听窗口 resize 事件，作为 ResizeObserver 的补充或降级方案
      const handleResize = () => chart?.resize();
      window.addEventListener('resize', handleResize);

      // 返回 effect 的清理函数：组件卸载或 code 变化时调用
      return () => {
        window.removeEventListener('resize', handleResize);
        cleanup();
      };
    } catch (err) {
      // 捕获 ECharts 初始化或 setOption 过程中的异常
      const message = err instanceof Error ? err.message : 'ECharts 初始化失败';
      setError(message);
      return cleanup;
    }
  }, [code]);

  // 当存在错误时渲染错误提示块
  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    );
  }

  // 正常情况下渲染图表容器，指定固定高度并占满父容器宽度
  return <div ref={containerRef} className="h-64 w-full" />;
}
