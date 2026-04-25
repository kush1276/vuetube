import React from 'react';

const Sidebar = ({ onOpenSettings, onOpenHelp, activeCategory, onSelectCategory }) => {
  const navItem = (cat, icon, label) => {
    const isActive = activeCategory === cat;
    return (
      <button
        key={cat}
        onClick={() => onSelectCategory?.(cat)}
        className={`w-full flex items-center gap-4 px-6 py-3 text-left transition-all cursor-pointer active:translate-x-1 ${
          isActive
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-semibold border-r-4 border-emerald-500'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
        <span className="text-sm">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-64 hidden md:block bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col pt-14 z-40 transition-colors duration-300">
      <div className="flex-1 overflow-y-auto py-4">
        {/* Navigation Section */}
        <div className="mb-2">
          {navItem('Home', 'home', 'Home')}
          {navItem('Subscriptions', 'subscriptions', 'Subscriptions')}
        </div>

        <div className="px-6 py-4 border-t border-slate-50 dark:border-slate-800/50">
          <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Creator Dashboard</h3>
          <div className="space-y-1">
            <button 
              className="w-full flex items-center gap-4 py-2 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer text-left" 
              onClick={() => onSelectCategory?.('Your Videos')}
            >
              <span className="material-symbols-outlined text-xl">smart_display</span>
              <span className="text-sm font-medium">Your Videos</span>
            </button>
            <button 
              className="w-full flex items-center gap-4 py-2 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer text-left" 
              onClick={() => onSelectCategory?.('Watch Later')}
            >
              <span className="material-symbols-outlined text-xl">schedule</span>
              <span className="text-sm font-medium">Watch Later</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-50 dark:border-slate-800/50 space-y-1">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center gap-4 px-2 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button
          onClick={onOpenHelp}
          className="w-full flex items-center gap-4 px-2 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="text-sm font-medium">Help</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
