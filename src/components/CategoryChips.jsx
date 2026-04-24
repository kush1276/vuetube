import React, { useState } from 'react';

const categories = [
  "Home", "Informative", "Education", "Design Systems", "Gaming", "Music", "Live", 
  "Programming", "Photography", "Productivity"
];

const CategoryChips = ({ activeCategory, onSelectCategory }) => {

  return (
    <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
            activeCategory === cat 
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white' 
              : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
