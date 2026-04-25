import React from 'react';
import VideoCard from './VideoCard';

// YouTube Shorts: duration ≤ 60 seconds
const isShort = (video) =>
  typeof video.durationSeconds === 'number' &&
  video.durationSeconds > 0 &&
  video.durationSeconds <= 60;

/* ─── Shorts card (portrait 9:16) ─────────────────────────────────────────── */
const ShortCard = ({ video, onSelect }) => (
  <div
    className="min-w-[148px] max-w-[148px] flex-shrink-0 cursor-pointer group"
    onClick={() => onSelect(video)}
  >
    {/* Portrait thumbnail */}
    <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2 shadow-sm group-hover:shadow-lg transition-all duration-300">
      <img
        src={`https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={(e) => {
          e.target.src = `https://img.youtube.com/vi/${video.ytId}/mqdefault.jpg`;
        }}
      />
      {/* Hover play */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Duration badge */}
      {video.duration && (
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      )}
    </div>

    {/* Title + views */}
    <p className="text-[13px] font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-0.5 group-hover:text-red-500 transition-colors">
      {video.title}
    </p>
    {video.views && (
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{video.views}</p>
    )}
  </div>
);

/* ─── Main SubscriptionsView ───────────────────────────────────────────────── */
const SubscriptionsView = ({ channels, videos, onSelect }) => {
  const shorts  = videos.filter(isShort);
  const regular = videos.filter((v) => !isShort(v));

  return (
    <div className="space-y-8 mt-2">

      {/* ── 1. Channel avatar row ─────────────────────────────────────────── */}
      {channels.length > 0 && (
        <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
          {channels.map((ch) => (
            <div key={ch.id} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="relative">
                {/* Avatar with red ring (subscribed indicator) */}
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-red-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-950">
                  <img
                    src={ch.avatar}
                    alt={ch.name}
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        ch.name
                      )}&background=random&size=64`)
                    }
                  />
                </div>
                {/* Blue "new content" dot */}
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-slate-950" />
              </div>
              <span className="text-[11px] text-center text-slate-700 dark:text-slate-300 line-clamp-2 w-[72px] leading-tight font-medium">
                {ch.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── 2. Shorts row ────────────────────────────────────────────────── */}
      {shorts.length > 0 && (
        <section>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {/* YouTube Shorts bolt-style icon */}
              <svg viewBox="0 0 90 100" className="w-5 h-5 fill-red-500" aria-hidden="true">
                <path d="M61 23 51 33a24 24 0 1 1-2-2l10-10A32 32 0 1 0 61 23z" />
                <path d="M38 36l22 14-22 14V36z" />
              </svg>
              <h2 className="text-[17px] font-bold text-slate-900 dark:text-white tracking-tight">
                Shorts
              </h2>
            </div>
            <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              View all
            </button>
          </div>

          {/* Horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
            {shorts.map((v) => (
              <ShortCard key={v.id} video={v} onSelect={onSelect} />
            ))}
          </div>
        </section>
      )}

      {/* ── 3. Regular videos grid (same ratio as home) ───────────────────── */}
      {regular.length > 0 && (
        <section>
          {/* Divider label */}
          <h2 className="text-[15px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">
            Latest Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {regular.map((video) => (
              <VideoCard key={video.id} video={video} onSelect={onSelect} />
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
          <span className="material-symbols-outlined text-7xl mb-4">subscriptions</span>
          <p className="text-lg font-semibold">No subscription videos yet</p>
          <p className="text-sm mt-1">Check back later for new uploads from your channels.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsView;
