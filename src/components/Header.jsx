import React, { useState } from 'react';

const Header = ({ userName, userHandle, userEmail, onSearch }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const displayHandle = userHandle || 'newton';
  const displayEmail = userEmail || 'hello@vuetube.me';
  const displayName = userName || 'Newton User';

  return (
    <header className="fixed top-0 w-full h-14 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 lg:hidden">
          <span className="material-symbols-outlined dark:text-white">menu</span>
        </button>
        <div className="flex items-center gap-2 pointer-events-none select-none">
          <img
            src="/logo.png"
            alt="VueTube logo"
            className="w-8 h-8 object-contain rounded-md"
          />
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
            VueTube
          </span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-2xl px-12">
        <div className="relative w-full group">
          <div 
            className="absolute inset-y-0 left-4 flex items-center cursor-pointer text-slate-400 hover:text-emerald-500 transition-colors"
            onClick={() => onSearch(searchTerm)}
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input 
            className="w-full h-10 pl-12 pr-4 bg-slate-100 dark:bg-slate-800 border-transparent dark:border-slate-700 rounded-full focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-body-md text-sm dark:text-white outline-none" 
            placeholder="Search creators, videos, or topics..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined">video_call</span>
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)}
            className="ml-2 w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-95 transition-transform"
          >
            <img 
              alt="User avatar" 
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUVlw4eoquJfGKUKHa6r9_ZzRDbsTvUCoHdQXxGv1N-FSewhbo3CxSmSnYmppIZEzNwaHMpUheP4ffl2LH9twTCMwrSEKWQ6Zg39EJqD1bzggokNIAet_90MrVdYL0d-b3c7jsNds4fljqyh8PgV2rUbKsFnmxe66GV23skiJm-lI45AvWA_lMzAnEZdQS-Pcfa6r-fQqEoswFJa6uDokHfXJ09trgPgos50FTPo0EnFXtabo3lvXWXNr7HS0yNYJ1wCjI1SYONrg"
            />
          </div>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-[60]">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/20">
                    <img 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUVlw4eoquJfGKUKHa6r9_ZzRDbsTvUCoHdQXxGv1N-FSewhbo3CxSmSnYmppIZEzNwaHMpUheP4ffl2LH9twTCMwrSEKWQ6Zg39EJqD1bzggokNIAet_90MrVdYL0d-b3c7jsNds4fljqyh8PgV2rUbKsFnmxe66GV23skiJm-lI45AvWA_lMzAnEZdQS-Pcfa6r-fQqEoswFJa6uDokHfXJ09trgPgos50FTPo0EnFXtabo3lvXWXNr7HS0yNYJ1wCjI1SYONrg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
                    <p className="text-xs text-emerald-500 font-semibold tracking-tight">@{displayHandle}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Email</label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium break-all">{displayEmail}</p>
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Channel Link</label>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold truncate">
                    demo-vuetube.com/@{displayHandle}
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-50/80 dark:bg-slate-800/30 p-2">
                <button 
                  onClick={() => setShowProfile(false)}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
