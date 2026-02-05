
import React from 'react';

const SystemManagement: React.FC = () => {
  const saveConfig = () => alert('配置保存成功！部分核心变更需重启系统生效。');
  const refreshStatus = () => alert('系统健康状态已刷新。');

  return (
    <div className="p-8 space-y-10 animate-fadeIn overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0E42B3] flex items-center">
          <i className="fa-solid fa-screwdriver-wrench mr-3"></i> 系统参数配置与监控
        </h2>
        <button onClick={saveConfig} className="bg-[#165DFF] text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-[#0E42B3] transition-all">
          保存全局配置
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h3 className="font-bold text-[#0E42B3]">基础环境配置</h3>
            <span className="text-xs text-gray-400">Database & Connection</span>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">NEO4J 数据库地址</label>
              <input type="text" className="w-full p-2 border rounded text-sm outline-none focus:border-[#165DFF]" defaultValue="bolt://localhost:7687" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">用户名</label>
                <input type="text" className="w-full p-2 border rounded text-sm" defaultValue="neo4j" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500">安全密钥</label>
                <input type="password" title="password" className="w-full p-2 border rounded text-sm" defaultValue="admin123" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">图谱节点规模阈值</label>
              <input type="number" className="w-full p-2 border rounded text-sm" defaultValue={5000000} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h3 className="font-bold text-[#0E42B3]">业务策略配置</h3>
            <span className="text-xs text-gray-400">Risk Thresholds</span>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">反欺诈评分判定阈值</label>
              <input type="range" min="0" max="1" step="0.01" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#165DFF]" defaultValue={0.75} />
              <div className="flex justify-between text-xs text-[#165DFF] font-bold"><span>保守(0)</span><span>当前: 0.75</span><span>激进(1)</span></div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500">模型训练频率</label>
              <select className="w-full p-2 border rounded text-sm outline-none">
                <option>每小时实时增量</option>
                <option>每日凌晨全量</option>
                <option selected>每周离线重训</option>
              </select>
            </div>
            <div className="bg-[#f0fdf4] border-l-4 border-[#36F1CD] p-4 text-xs text-[#065F46] leading-relaxed">
              <strong>💡 配置建议：</strong> 调高风险评分阈值可减少误报，但可能增加漏报；建议根据最新欺诈形势每月微调。
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold text-[#0E42B3]">服务器监控状态</h3>
          <button onClick={refreshStatus} className="text-xs text-[#165DFF] hover:underline">刷新监控数据</button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#f5f9ff]">
            <tr className="text-left text-[#0E42B3] uppercase text-xs">
              <th className="p-4">指标名称</th>
              <th className="p-4">当前状态</th>
              <th className="p-4">安全区间</th>
              <th className="p-4">更新时间</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[
              { name: 'CPU 负载', val: '32%', range: '0-70%', status: '正常' },
              { name: '内存占用', val: '12.4 GB', range: '0-32GB', status: '正常' },
              { name: 'Neo4j 连接数', val: '45', range: '0-200', status: '健康' },
              { name: '查询响应(ms)', val: '12ms', range: '<50ms', status: '优秀' }
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{row.name}</td>
                <td className="p-4 text-blue-600 font-bold">{row.val}</td>
                <td className="p-4 text-gray-400">{row.range}</td>
                <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">实时监测中</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemManagement;
