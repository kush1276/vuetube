import React from 'react';

const VideoCard = ({ video, onSelect }) => {
  const handleMouseEnter = (e) => {
    const videoElement = e.currentTarget.querySelector('video');
    if (videoElement) videoElement.play().catch(() => {});
  };

  const handleMouseLeave = (e) => {
    const videoElement = e.currentTarget.querySelector('video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  return (
    <article 
      className="group cursor-pointer flex flex-col"
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 shadow-sm group-hover:shadow-md transition-all duration-300">
        <video 
          className="w-full h-full object-cover" 
          muted 
          loop 
          playsInline 
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
        </video>
        <div className="absolute bottom-2 right-2 z-10 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </div>
        <div className="absolute inset-0 z-10 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      <div className="flex gap-3 px-1">
        <div className="flex-shrink-0 mt-0.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img 
              alt="Channel Avatar" 
              className="w-full h-full object-cover" 
              src={video.channelAvatar} 
              onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + video.channelName}
            />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-slate-900 dark:text-white font-semibold text-[14px] line-clamp-2 leading-snug mb-1 group-hover:text-emerald-500 transition-colors">
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
