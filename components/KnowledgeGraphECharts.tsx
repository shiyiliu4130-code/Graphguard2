
import React, { useEffect, useRef, useState } from 'react';

const KnowledgeGraphECharts: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const [highlightedRisk, setHighlightedRisk] = useState(false);
  const [fraudPatternsVisible, setFraudPatternsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nodeColors: Record<string, string> = {
    '正常用户': '#165DFF',
    '欺诈者': '#FF4D4F',
    '背景节点': '#8C8C8C'
  };

  const edgeColors: Record<string, string> = {
    '正常交易': '#165DFF',
    '异常交易': '#FF9F43',
    '可疑关联': '#FF4D4F'
  };

  const getGraphData = () => {
    const nodes = [
      { id: 'fraud_1', name: '欺诈者A', category: '欺诈者', symbolSize: 45, riskLevel: 'high', status: '逾期未还且失联' },
      { id: 'fraud_2', name: '欺诈者B', category: '欺诈者', symbolSize: 35, riskLevel: 'high', status: '逾期未还且失联' },
      { id: 'normal_1', name: '用户A', category: '正常用户', symbolSize: 32, riskLevel: 'low', status: '按时还款' },
      { id: 'normal_2', name: '用户B', category: '正常用户', symbolSize: 32, riskLevel: 'low', status: '按时还款' },
      { id: 'normal_3', name: '用户C', category: '正常用户', symbolSize: 30, riskLevel: 'low', status: '按时还款' },
      { id: 'bg_1', name: '背景节点1', category: '背景节点', symbolSize: 18, riskLevel: 'low', status: '注册无借款' },
      { id: 'bg_2', name: '背景节点2', category: '背景节点', symbolSize: 18, riskLevel: 'low', status: '注册无借款' },
      { id: 'bg_4', name: '背景节点4', category: '背景节点', symbolSize: 18, riskLevel: 'low', status: '注册无借款' }
    ];

    const edges = [
      { source: 'fraud_1', target: 'fraud_2', value: '8.5', category: '可疑关联' },
      { source: 'fraud_1', target: 'normal_1', value: '6.2', category: '异常交易' },
      { source: 'fraud_2', target: 'normal_2', value: '5.8', category: '异常交易' },
      { source: 'normal_1', target: 'normal_2', value: '2.0', category: '正常交易' },
      { source: 'normal_2', target: 'normal_3', value: '1.8', category: '正常交易' },
      { source: 'bg_1', target: 'fraud_1', value: '3.0', category: '可疑关联' },
      { source: 'bg_1', target: 'normal_1', value: '1.5', category: '正常交易' },
      { source: 'bg_2', target: 'normal_3', value: '1.2', category: '正常交易' },
      { source: 'bg_4', target: 'normal_2', value: '1.0', category: '正常交易' },
      { source: 'fraud_2', target: 'fraud_1', value: '2.5', category: '可疑关联' }
    ];

    return { nodes, edges };
  };

  const initChart = () => {
    if (!chartRef.current) return;
    
    // 检查全局变量是否存在
    const echarts = (window as any).echarts;
    if (!echarts) {
      console.error('ECharts library not found on window');
      setError('图表库加载失败，请刷新页面重试');
      return;
    }

    try {
      const chart = echarts.init(chartRef.current);
      setChartInstance(chart);
      const data = getGraphData();

      const option = {
        tooltip: {
          trigger: 'item',
          formatter: (params: any) => {
            if (params.dataType === 'node') {
              return `<div style="padding:4px 8px;">
                <b style="color:${params.color}">${params.data.name}</b><br/>
                类别: ${params.data.category}<br/>
                状态: ${params.data.status}
              </div>`;
            }
            return `关系: ${params.data.category}<br/>权重: ${params.data.value}`;
          }
        },
        series: [{
          type: 'graph',
          layout: 'force',
          data: data.nodes.map(n => ({
            ...n,
            itemStyle: { color: nodeColors[n.category] },
            label: { show: true, position: 'bottom', color: '#333', fontSize: 12, fontWeight: 500 }
          })),
          links: data.edges.map(e => ({
            ...e,
            lineStyle: { 
              color: edgeColors[e.category], 
              width: 2, 
              curveness: 0.2, 
              type: e.category === '异常交易' ? 'dashed' : 'solid' 
            },
            label: { show: false }
          })),
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: [0, 8],
          force: {
            repulsion: 1000,
            edgeLength: 180,
            layoutAnimation: isAnimationActive
          },
          roam: true,
          draggable: true,
          emphasis: {
            focus: 'adjacency',
            lineStyle: { width: 4 }
          }
        }]
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    } catch (e) {
      console.error('Failed to init chart:', e);
      setError('图表初始化失败');
    }
  };

  useEffect(() => {
    // 延迟一小会儿，确保 CDN 脚本已就绪
    const timer = setTimeout(() => {
      initChart();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const resetView = () => {
    chartInstance?.dispatchAction({ type: 'restore' });
    setHighlightedRisk(false);
    setFraudPatternsVisible(false);
  };

  const toggleRisk = () => {
    if (!chartInstance) return;
    const nextState = !highlightedRisk;
    setHighlightedRisk(nextState);
    const option = chartInstance.getOption();
    option.series[0].data = option.series[0].data.map((n: any) => ({
      ...n,
      itemStyle: {
        ...n.itemStyle,
        shadowBlur: nextState && n.category === '欺诈者' ? 30 : 0,
        shadowColor: 'rgba(255, 77, 79, 0.8)'
      }
    }));
    chartInstance.setOption(option);
  };

  const showPatterns = () => {
    if (!chartInstance) return;
    const nextState = !fraudPatternsVisible;
    setFraudPatternsVisible(nextState);
    const option = chartInstance.getOption();
    option.series[0].links = option.series[0].links.map((l: any) => ({
      ...l,
      lineStyle: {
        ...l.lineStyle,
        width: nextState && l.category === '可疑关联' ? 5 : 2,
        opacity: nextState ? (l.category === '可疑关联' ? 1 : 0.15) : 1
      }
    }));
    chartInstance.setOption(option);
  };

  const toggleAnimation = () => {
    if (!chartInstance) return;
    const nextState = !isAnimationActive;
    setIsAnimationActive(nextState);
    const option = chartInstance.getOption();
    option.series[0].force.layoutAnimation = nextState;
    chartInstance.setOption(option);
  };

  const zoom = (factor: number) => {
    if (!chartInstance) return;
    const option = chartInstance.getOption();
    const currentZoom = option.series[0].zoom || 1;
    option.series[0].zoom = currentZoom * factor;
    chartInstance.setOption(option);
  };

  return (
    <div className="bg-[#F8FAFF] rounded-2xl border border-[#E8F3FF] p-6 shadow-sm overflow-hidden flex flex-col h-full min-h-[750px]">
      {error && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="text-red-500 font-bold bg-white p-4 rounded-lg shadow-lg border border-red-100">
            <i className="fas fa-exclamation-triangle mr-2"></i> {error}
          </div>
        </div>
      )}

      {/* Top Legend Bar */}
      <div className="grid grid-cols-2 gap-8 mb-8 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center text-[#0E42B3] font-bold text-sm mb-4">
            <span className="w-1.5 h-4 bg-[#165DFF] rounded-full mr-2"></span> 节点类型
          </div>
          <div className="flex gap-8">
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-4 h-4 rounded bg-[#165DFF] mr-2"></span>
              <span>正常用户</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-4 h-4 rounded bg-[#FF4D4F] mr-2"></span>
              <span>欺诈者</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-4 h-4 rounded bg-[#8C8C8C] mr-2"></span>
              <span>背景节点</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center text-[#0E42B3] font-bold text-sm mb-4">
            <span className="w-1.5 h-4 bg-[#165DFF] rounded-full mr-2"></span> 关系类型
          </div>
          <div className="flex gap-8">
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-8 h-[2px] bg-[#165DFF] mr-2"></span>
              <span>正常交易</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-8 h-[2px] border-b-2 border-dashed border-[#FF9F43] mr-2"></span>
              <span>异常交易</span>
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <span className="w-8 h-[2px] bg-[#FF4D4F] mr-2"></span>
              <span>可疑关联</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Graph Area - 确保有确定的高度 */}
      <div className="relative flex-1 min-h-[500px]">
        <div ref={chartRef} className="absolute inset-0 w-full h-full" />
        
        {/* Right Action Buttons */}
        <div className="absolute top-0 right-0 flex flex-col gap-2 z-10">
          <button onClick={resetView} className="bg-white border border-gray-200 px-4 py-2 rounded-md text-xs text-blue-600 hover:bg-blue-50 transition-colors shadow-sm w-32">重置视图</button>
          <button onClick={toggleRisk} className={`border px-4 py-2 rounded-md text-xs transition-colors shadow-sm w-32 ${highlightedRisk ? 'bg-red-500 text-white border-red-500' : 'bg-white text-blue-600 border-gray-200 hover:bg-blue-50'}`}>
            {highlightedRisk ? '取消风险高亮' : '高亮风险节点'}
          </button>
          <button onClick={showPatterns} className={`border px-4 py-2 rounded-md text-xs transition-colors shadow-sm w-32 ${fraudPatternsVisible ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-blue-600 border-gray-200 hover:bg-blue-50'}`}>
            {fraudPatternsVisible ? '隐藏欺诈模式' : '显示欺诈模式'}
          </button>
          <button onClick={toggleAnimation} className={`border px-4 py-2 rounded-md text-xs transition-colors shadow-sm w-32 ${isAnimationActive ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-600 border-gray-200 hover:bg-blue-50'}`}>
            动画: {isAnimationActive ? '开' : '关'}
          </button>
          <div className="flex border border-gray-200 rounded-md shadow-sm bg-white overflow-hidden mt-2">
            <button onClick={() => zoom(1.2)} className="flex-1 py-2 text-blue-600 hover:bg-blue-50 transition-colors border-r border-gray-200 text-lg font-bold">+</button>
            <button onClick={() => zoom(0.8)} className="flex-1 py-2 text-blue-600 hover:bg-blue-50 transition-colors text-lg font-bold">-</button>
          </div>
        </div>

        {/* Legend Box */}
        <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-[#E8F3FF] w-48 hidden md:block">
          <div className="text-[#0E42B3] font-bold text-lg mb-6 tracking-wide">图谱说明</div>
          <div className="space-y-5">
            <div className="flex items-center text-sm font-medium text-gray-700">
              <span className="w-5 h-5 rounded-md bg-[#165DFF] mr-3 shadow-sm"></span> 正常用户
            </div>
            <div className="flex items-center text-sm font-medium text-gray-700">
              <span className="w-5 h-5 rounded-md bg-[#FF4D4F] mr-3 shadow-sm"></span> 欺诈者
            </div>
            <div className="flex items-center text-sm font-medium text-gray-700">
              <span className="w-5 h-5 rounded-md bg-[#8C8C8C] mr-3 shadow-sm"></span> 背景节点
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeGraphECharts;
