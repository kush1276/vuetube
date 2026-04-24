import React from 'react';

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-4 right-4 z-[110]">
        <button 
          onClick={onClose}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
      <div 
        className="w-full max-w-6xl w-[90vw] aspect-video relative rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video className="w-full h-full object-contain bg-black" controls autoPlay>
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
