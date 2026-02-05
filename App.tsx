
import React, { useState } from 'react';
import { PageType } from './types';
import Sidebar from './components/Sidebar';
import SystemOverview from './components/SystemOverview';
import RiskAnalysisWizard from './components/RiskAnalysisWizard';
import SystemManagement from './components/SystemManagement';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>(PageType.OVERVIEW);

  const renderContent = () => {
    switch (activePage) {
      case PageType.OVERVIEW:
        return <SystemOverview />;
      case PageType.FRAUD_DETECT:
        return <RiskAnalysisWizard />;
      case PageType.MANAGE:
        return <SystemManagement />;
      default:
        return <SystemOverview />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#f5f7fa] overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-[80px] bg-white border-b border-[#f0f0f0] flex items-center px-10 shadow-sm shrink-0">
          <div className="text-3xl font-extrabold text-[#0E42B3] flex items-center tracking-tight">
            <span className="text-[#165DFF] mr-4 text-4xl leading-none">
              <i className="fa-solid fa-shield-virus"></i>
            </span>
            GraphGuard 风险识别研判系统
          </div>
          <div className="ml-auto flex items-center space-x-6">
             <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span>Cloud Sync Active</span>
             </div>
             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#165DFF] cursor-pointer hover:bg-[#165DFF] hover:text-white transition-all shadow-sm">
                <i className="fa-solid fa-bell"></i>
             </div>
          </div>
        </header>

        {/* Content Page Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="max-w-[1600px] mx-auto min-h-full">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Tailwind Animations & Global Utilities */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
