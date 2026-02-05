
import React from 'react';
import KnowledgeGraphECharts from './KnowledgeGraphECharts';

const SystemOverview: React.FC = () => {
  const cards = [
    { title: '图谱总节点数', num: '3,728,541', trend: '↑ 2.3%', trendColor: 'text-[#36F1CD]' },
    { title: '今日风控预警数', num: '127', trend: '↓ 15.6%', trendColor: 'text-red-400' },
    { title: '模型识别准确率', num: '98.7%', trend: '→ 持平', trendColor: 'text-gray-400' },
    { title: '欺诈拦截成功率', num: '92.5%', trend: '↑ 3.2%', trendColor: 'text-[#36F1CD]' }
  ];

  return (
    <div className="p-8 space-y-10 animate-fadeIn overflow-y-auto">
      {/* Dashboard Summary Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0E42B3] flex items-center border-b-2 border-[#E8F3FF] pb-2">
          <i className="fa-solid fa-chart-line mr-3"></i> 系统实时运行概览
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-gradient-to-br from-[#E8F3FF] to-[#F5F9FF] p-6 rounded-xl shadow-md border-l-4 border-[#165DFF] hover:-translate-y-1 transition-transform">
              <div className="text-xs font-semibold text-[#6684C8] mb-2 uppercase tracking-wider">{card.title}</div>
              <div className="text-3xl font-black text-[#0E42B3] mb-2">{card.num}</div>
              <div className={`text-xs font-bold ${card.trendColor}`}>{card.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Knowledge Graph (from 知识图谱.html) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0E42B3] flex items-center border-b-2 border-[#E8F3FF] pb-2">
          <i className="fa-solid fa-map-location-dot mr-3"></i> 动态信贷反欺诈知识图谱
        </h2>
        <div className="min-h-[800px]">
          <KnowledgeGraphECharts />
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#0E42B3] flex items-center border-b-2 border-[#E8F3FF] pb-2">
          <i className="fa-solid fa-list-check mr-3"></i> 系统核心能力说明
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 leading-loose text-gray-700 text-lg">
          <p className="mb-4">GraphGuard 系统集成了行业领先的图算法，专为金融信贷场景打造：</p>
          <ul className="list-disc ml-8 space-y-3">
            <li><strong>超大规模关系发现</strong>：Neo4j原生存储，支持千万级节点实时关联挖掘。</li>
            <li><strong>103维动态特征矩阵</strong>：不仅包含用户基本画像，更深度挖掘时序行为、地理重合及社交团伙特征。</li>
            <li><strong>自研图模型架构</strong>：融合GraphSAGE与注意力机制，在样本极度不平衡的情况下仍保持98%以上的识别率。</li>
            <li><strong>闭环风控链路</strong>：从特征自动生成到模型自动调优，实现端到端的自动化风控决策。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;
