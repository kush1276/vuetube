import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 w-full h-14 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-4 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all active:scale-95 duration-200 lg:hidden">
          <span className="material-symbols-outlined dark:text-white">menu</span>
        </button>
        <div className="text-xl font-black tracking-tighter text-slate-900 dark:text-white pointer-events-none">VueTube</div>
      </div>

      <div className="hidden md:flex flex-1 max-w-2xl px-12">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-xl">search</span>
          </div>
          <input 
            className="w-full h-10 pl-12 pr-4 bg-slate-100 dark:bg-slate-800 border-transparent dark:border-slate-700 rounded-full focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-body-md text-sm dark:text-white outline-none" 
            placeholder="Search creators, videos, or topics..." 
            type="text"
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
        <div className="ml-2 w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-95 transition-transform">
          <img 
            alt="User avatar" 
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUVlw4eoquJfGKUKHa6r9_ZzRDbsTvUCoHdQXxGv1N-FSewhbo3CxSmSnYmppIZEzNwaHMpUheP4ffl2LH9twTCMwrSEKWQ6Zg39EJqD1bzggokNIAet_90MrVdYL0d-b3c7jsNds4fljqyh8PgV2rUbKsFnmxe66GV23skiJm-lI45AvWA_lMzAnEZdQS-Pcfa6r-fQqEoswFJa6uDokHfXJ09trgPgos50FTPo0EnFXtabo3lvXWXNr7HS0yNYJ1wCjI1SYONrg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
