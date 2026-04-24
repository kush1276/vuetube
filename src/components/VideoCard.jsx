import React, { useState } from 'react';

const VideoCard = ({ video, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  // Try mqdefault if hqdefault fails, then hide
  const [src, setSrc] = useState(`https://img.youtube.com/vi/${video.ytId}/hqdefault.jpg`);

  const handleImgError = () => {
    if (src.includes('hqdefault')) {
      setSrc(`https://img.youtube.com/vi/${video.ytId}/mqdefault.jpg`);
    } else {
      setImgError(true);
    }
  };

  // Don't render if thumbnail is broken
  if (imgError) return null;

  return (
    <article
      className="group cursor-pointer flex flex-col"
      onClick={() => onSelect(video)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 shadow-sm group-hover:shadow-lg transition-all duration-300">
        <img
          src={src}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImgError}
        />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
      </div>

      {/* Info row */}
      <div className="flex gap-3 px-1">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img
              alt="Channel Avatar"
              className="w-full h-full object-cover"
              src={video.channelAvatar}
              onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelName)}&background=random`}
            />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-slate-900 dark:text-white font-semibold text-[14px] line-clamp-2 leading-snug mb-1 group-hover:text-red-500 transition-colors">
            {video.title}
          </h3>
          <div className="flex flex-col text-slate-500 dark:text-slate-400 text-xs">
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors">{video.channelName}</span>
            <span className="mt-0.5">{video.views} • {video.timestamp}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VideoCard;
