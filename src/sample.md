# Markdown 示例

左侧输入 Markdown，点击上方 **渲染** 按钮查看效果。

## 普通文本

- 支持列表
- 支持**加粗**和*斜体*
- 支持 `行内代码`

## ECharts 图表

通过 ` ```echarts ` 代码块插入图表：

### 1. 折线图 (Line) & 面积图

```echarts
{
  "title": { "text": "基础折线图与面积图" },
  "tooltip": { "trigger": "axis" },
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": { "type": "value" },
  "series": [
    {
      "name": "纯折线",
      "data": [150, 230, 224, 218, 135, 147, 260],
      "type": "line"
    },
    {
      "name": "面积图",
      "data": [820, 932, 901, 934, 1290, 1330, 1320],
      "type": "line",
      "areaStyle": {}
    }
  ]
}

```

### 2. 柱状图 (Bar) & 条形图

```echarts
{
  "title": { "text": "柱状图与堆叠条形图" },
  "tooltip": { "trigger": "axis", "axisPointer": { "type": "shadow" } },
  "xAxis": { "type": "value" },
  "yAxis": {
    "type": "category",
    "data": ["周一", "周二", "周三", "周四", "周五"]
  },
  "series": [
    {
      "name": "直接访问",
      "type": "bar",
      "stack": "total",
      "data": [320, 302, 301, 334, 390]
    },
    {
      "name": "邮件营销",
      "type": "bar",
      "stack": "total",
      "data": [120, 132, 101, 134, 90]
    }
  ]
}

```

### 3. 饼图 (Pie) & 环形图

```echarts
{
  "title": { "text": "环形饼图", "left": "center" },
  "tooltip": { "trigger": "item" },
  "legend": { "top": "5%", "left": "center" },
  "series": [
    {
      "name": "访问来源",
      "type": "pie",
      "radius": ["40%", "70%"],
      "avoidLabelOverlap": false,
      "itemStyle": {
        "borderRadius": 10,
        "borderColor": "#fff",
        "borderWidth": 2
      },
      "data": [
        { "value": 1048, "name": "搜索引擎" },
        { "value": 735, "name": "直接访问" },
        { "value": 580, "name": "邮件营销" },
        { "value": 484, "name": "联盟广告" }
      ]
    }
  ]
}

```

### 4. 散点图 (Scatter) & 气泡图

```echarts
{
  "title": { "text": "基础散点图" },
  "tooltip": {},
  "xAxis": {},
  "yAxis": {},
  "series": [
    {
      "symbolSize": 20,
      "data": [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 8.96],
        [12.5, 6.82]
      ],
      "type": "scatter"
    }
  ]
}

```

### 5. 雷达图 (Radar)

```echarts
{
  "title": { "text": "基础雷达图" },
  "legend": { "data": ["预算分配", "实际开销"] },
  "radar": {
    "indicator": [
      { "name": "销售", "max": 6500 },
      { "name": "管理", "max": 16000 },
      { "name": "信息技术", "max": 30000 },
      { "name": "客服", "max": 38000 },
      { "name": "研发", "max": 52000 }
    ]
  },
  "series": [
    {
      "name": "预算 vs 开销",
      "type": "radar",
      "data": [
        {
          "value": [4200, 3000, 20000, 35000, 50000],
          "name": "预算分配"
        },
        {
          "value": [5000, 14000, 28000, 26000, 42000],
          "name": "实际开销"
        }
      ]
    }
  ]
}

```

### 6. 漏斗图 (Funnel)

```echarts
{
  "title": { "text": "漏斗图" },
  "tooltip": { "trigger": "item", "formatter": "{a} <br/>{b} : {c}%" },
  "legend": { "data": ["展现", "点击", "访问", "咨询", "订单"] },
  "series": [
    {
      "name": "漏斗图",
      "type": "funnel",
      "left": "10%",
      "top": 60,
      "bottom": 60,
      "width": "80%",
      "min": 0,
      "max": 100,
      "minSize": "0%",
      "maxSize": "100%",
      "sort": "descending",
      "gap": 2,
      "label": { "show": true, "position": "inside" },
      "data": [
        { "value": 60, "name": "访问" },
        { "value": 40, "name": "咨询" },
        { "value": 20, "name": "订单" },
        { "value": 80, "name": "点击" },
        { "value": 100, "name": "展现" }
      ]
    }
  ]
}

```

### 7. 仪表盘 (Gauge)

```echarts
{
  "tooltip": { "formatter": "{a} <br/>{b} : {c}%" },
  "series": [
    {
      "name": "Pressure",
      "type": "gauge",
      "detail": { "formatter": "{value}" },
      "data": [{ "value": 50, "name": "SCORE" }]
    }
  ]
}

```

### 8. K线图 (Candlestick / Boxplot)

```echarts
{
  "title": { "text": "基础K线图" },
  "xAxis": {
    "data": ["2026-06-01", "2026-06-02", "2026-06-03", "2026-06-04"]
  },
  "yAxis": {},
  "series": [
    {
      "type": "candlestick",
      "data": [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
      ]
    }
  ]
}

```

### 9. 桑基图 (Sankey)

```echarts
{
  "title": { "text": "桑基图" },
  "tooltip": { "trigger": "item", "triggerOn": "mousemove" },
  "series": [
    {
      "type": "sankey",
      "data": [
        { "name": "a" },
        { "name": "b" },
        { "name": "a1" },
        { "name": "a2" },
        { "name": "b1" }
      ],
      "links": [
        { "source": "a", "target": "a1", "value": 5 },
        { "source": "a", "target": "a2", "value": 3 },
        { "source": "b", "target": "b1", "value": 8 },
        { "source": "a1", "target": "b1", "value": 2 }
      ]
    }
  ]
}

```

### 10. 热力图 (Heatmap)

```echarts
{
  "title": { "text": "基础热力图" },
  "tooltip": { "position": "top" },
  "xAxis": {
    "type": "category",
    "data": ["周一", "周二", "周三"]
  },
  "yAxis": {
    "type": "category",
    "data": ["早", "中", "晚"]
  },
  "visualMap": {
    "min": 0,
    "max": 10,
    "calculable": true,
    "orient": "horizontal",
    "left": "center"
  },
  "series": [
    {
      "name": "热度值",
      "type": "heatmap",
      "data": [
        [0, 0, 5], [0, 1, 1], [0, 2, 0],
        [1, 0, 3], [1, 1, 10], [1, 2, 5],
        [2, 0, 1], [2, 1, 2], [2, 2, 8]
      ],
      "label": { "show": true }
    }
  ]
}

```

### 11. 关系图 (Graph)

```echarts
{
  "title": { "text": "基础关系图" },
  "tooltip": {},
  "series": [
    {
      "type": "graph",
      "layout": "force",
      "symbolSize": 30,
      "roam": true,
      "label": { "show": true },
      "force": { "repulsion": 100 },
      "data": [
        { "name": "节点1" },
        { "name": "节点2" },
        { "name": "节点3" }
      ],
      "links": [
        { "source": "节点1", "target": "节点2" },
        { "source": "节点2", "target": "节点3" },
        { "source": "节点3", "target": "节点1" }
      ]
    }
  ]
}

```

### 12. 矩形树图 (Treemap)

```echarts
{
  "title": { "text": "矩形树图" },
  "series": [
    {
      "type": "treemap",
      "data": [
        {
          "name": "分类 A",
          "value": 10,
          "children": [
            { "name": "A1", "value": 4 },
            { "name": "A2", "value": 6 }
          ]
        },
        {
          "name": "分类 B",
          "value": 20,
          "children": [
            { "name": "B1", "value": 20 }
          ]
        }
      ]
    }
  ]
}

```

## 代码块

```js
console.log('Hello, Markdown!');
```
