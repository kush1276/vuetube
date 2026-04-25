import React from 'react';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      question: "What is VueTube?",
      answer: "VueTube is a premium video experience platform built with React, designed to provide a sleek and modern interface for browsing and watching your favorite content."
    },
    {
      question: "How do I enable Dark Mode?",
      answer: "You can toggle Dark Mode in the Settings menu, accessible from the sidebar. It reduces eye strain and looks great in low-light environments."
    },
    {
      question: "Is VueTube free to use?",
      answer: "Yes! VueTube is a community-driven project and is completely free for all users."
    },
    {
      question: "How can I contact support?",
      answer: "Since this is a demo project, you can reach out via the GitHub repository or contact the developer directly through the email."
    },
    {
      question: "What is Data Saver mode?",
      answer: "Data Saver mode optimizes your streaming to use less data, perfect for when you're on a limited mobile plan or slow connection."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl mx-4 rounded-3xl overflow-hidden shadow-2xl transform transition-all border border-slate-100 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">help</span>
            Frequency Asked Questions (FAQ)
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all active:scale-90">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2 group">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-black">
                  {index + 1}
                </span>
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-9">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Still need help? Visit our <a href="#" className="text-emerald-500 font-bold hover:underline">Support Community</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
