
import React from 'react';
import { PageType } from '../types';

interface SidebarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="w-[300px] h-screen bg-gradient-to-b from-[#165DFF] to-[#0a3aa0] text-white flex flex-col shadow-[10px_0_30px_rgba(22,93,255,0.2)] relative z-20 border-r border-white/10 shrink-0 overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[40%] bg-white/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-white/40 via-white to-white/40 shadow-[0_0_15px_rgba(255,255,255,0.4)]"></div>
      
      {/* Header Logo Section */}
      <div className="mt-12 mb-8 mx-6 relative">
        <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center group transition-all duration-500 hover:border-white/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-[#165DFF] text-[10px] font-bold rounded-full shadow-lg scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all uppercase tracking-tighter">Financial AI</div>
          <h1 className="text-xl font-black leading-tight tracking-[0.05em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            GraphGuard<br />
            <span className="text-base font-bold bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent opacity-95">银行信贷智能反欺诈系统</span>
          </h1>
          <div className="mt-4 flex justify-center space-x-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
            <div className="w-8 h-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mx-6 mb-10 px-5 py-3 bg-white/5 rounded-xl text-xs flex items-center border border-white/10 shadow-inner group overflow-hidden">
        <div className="relative mr-4">
          <div className="w-2.5 h-2.5 bg-[#36F1CD] rounded-full animate-ping absolute inset-0 opacity-60"></div>
          <div className="w-2.5 h-2.5 bg-[#36F1CD] rounded-full relative shadow-[0_0_8px_#36F1CD]"></div>
        </div>
        <span className="text-white/80 font-bold tracking-wider group-hover:text-white transition-colors">
          系统运行正常 | 实时风控中
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-4">
        {[
          { id: PageType.OVERVIEW, label: '系统概览', icon: 'fa-chart-pie' },
          { id: PageType.FRAUD_DETECT, label: '风险识别研判', icon: 'fa-shield-halved' },
          { id: PageType.MANAGE, label: '系统管理与设置', icon: 'fa-gears' },
        ].map((item) => {
          const isActive = activePage === item.id;
          return (
            <div 
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`group relative p-4 rounded-xl cursor-pointer flex items-center transition-all duration-500 overflow-hidden ${
                isActive 
                ? 'bg-white/15 border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.1)]' 
                : 'hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              {/* Left Active Indicator */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full bg-white transition-all duration-500 ${isActive ? 'translate-x-0' : '-translate-x-full'}`}></div>
              
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-500 ${
                isActive ? 'bg-white text-[#165DFF] shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'bg-white/10 text-white/50 group-hover:text-white group-hover:bg-white/20'
              }`}>
                <i className={`fa-solid ${item.icon} text-lg`}></i>
              </div>
              
              <span className={`text-sm tracking-wide transition-all duration-500 ${isActive ? 'font-bold text-white' : 'font-medium text-white/70 group-hover:text-white group-hover:translate-x-1'}`}>
                {item.label}
              </span>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          );
        })}
      </nav>

      {/* Admin Footer Section */}
      <div className="mt-auto p-6 bg-black/10 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <div className="flex items-center mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="relative">
            <div className="w-10 h-10 bg-white text-[#165DFF] rounded-xl flex items-center justify-center text-sm font-black shadow-lg">
              管
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#36F1CD] border-2 border-[#1a6dff] rounded-full"></div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-white tracking-wide">管理员</div>
            <div className="text-[10px] text-white/60 font-bold uppercase tracking-tighter">System Superuser</div>
          </div>
          <div className="ml-auto text-white/40 hover:text-white cursor-pointer transition-colors">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
        
        <div className="px-1 text-[10px] text-white/50 leading-relaxed font-medium space-y-1">
          <div className="flex justify-between">
            <span>最后登录:</span>
            <span className="text-white/80">2026-01-30 14:00</span>
          </div>
          <div className="flex justify-between">
            <span>登录IP:</span>
            <span className="text-white/80">127.0.0.1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
