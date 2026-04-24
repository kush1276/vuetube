import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoCard from './components/VideoCard';
import SettingsModal from './components/SettingsModal';
import './App.css';

// ── Verified YouTube video pools ──────────────────────────────────────────
// Cards with broken thumbnails auto-hide themselves (see VideoCard)

// ⚽ Pinned first card — Ronaldo GOAT video
const RONALDO_VIDEO = { ytId: 'aO5vC6AcnMU', title: 'Why Cristiano Ronaldo Is The GOAT – Better Than Messi In Every Way', channel: 'The United Stand', views: '3.1M views', timestamp: '1 year ago', duration: '12:47', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZT4FTsFIUXuGgqh3OARFP9qVlpwkMSYe7rX6A=s88' };

const EDU_VIDEOS = [
  // JavaScript
  { ytId: 'PkZNo7MFNFg', title: 'Learn JavaScript - Full Course for Beginners', channel: 'freeCodeCamp', views: '12M views', timestamp: '4 years ago', duration: '3:26:42', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQUHMHOeqNq7zzm55UaJFzLNdEFEtnqJNMZ_w=s88' },
  { ytId: 'hdI2bqOjy3c', title: 'JavaScript Crash Course for Beginners', channel: 'Traversy Media', views: '4.5M views', timestamp: '3 years ago', duration: '1:40:29', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZScVBSCCTPVIkAbujGDH4Gu0cKPi-EIi1Lz0A=s88' },
  { ytId: 'W6NZfCO5SIk', title: 'JavaScript Tutorial for Beginners', channel: 'Programming with Mosh', views: '9M views', timestamp: '5 years ago', duration: '48:17', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  // React
  { ytId: 'SqcY0GlETPk', title: 'React Tutorial for Beginners', channel: 'Programming with Mosh', views: '5M views', timestamp: '2 years ago', duration: '1:20:22', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  { ytId: 'w7ejDZ8SWv8', title: 'React JS – Full Course 2022', channel: 'Dave Gray', views: '2.1M views', timestamp: '2 years ago', duration: '9:49:55', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQ3HnHlITJ0Vc-kSaQV1mQGSwJMBFBH3mU-g=s88' },
  { ytId: 'bMknfKXIFA8', title: "React Course – Beginner's Tutorial for React JavaScript", channel: 'freeCodeCamp', views: '3.8M views', timestamp: '2 years ago', duration: '11:55:27', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQUHMHOeqNq7zzm55UaJFzLNdEFEtnqJNMZ_w=s88' },
  // Python
  { ytId: 'rfscVS0vtbw', title: 'Learn Python – Full Course for Beginners', channel: 'freeCodeCamp', views: '42M views', timestamp: '5 years ago', duration: '4:26:51', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQUHMHOeqNq7zzm55UaJFzLNdEFEtnqJNMZ_w=s88' },
  { ytId: '_uQrJ0TkZlc', title: 'Python Full Course for Beginners', channel: 'Programming with Mosh', views: '30M views', timestamp: '4 years ago', duration: '6:14:07', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  // AI / Machine Learning
  { ytId: 'aircAruvnKk', title: 'But what is a Neural Network?', channel: '3Blue1Brown', views: '15M views', timestamp: '6 years ago', duration: '19:13', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
  { ytId: 'WUvTyaaNkzM', title: 'The Essence of Calculus', channel: '3Blue1Brown', views: '9M views', timestamp: '6 years ago', duration: '17:04', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
  { ytId: 'bBC-nXj3Ng4', title: 'How does Bitcoin / Blockchain Work?', channel: '3Blue1Brown', views: '8M views', timestamp: '5 years ago', duration: '26:21', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
  // C# for Unity
  { ytId: 'gB1F9G0JXOo', title: 'MAKE A GAME – Unity Beginner Tutorial', channel: 'Brackeys', views: '8M views', timestamp: '4 years ago', duration: '2:00:03', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZSmP3JbX4PoETl9C3_i5hqPi_aqVbDFY_q93A=s88' },
  { ytId: 'IlKaB1etrik', title: 'How to make a Video Game in Unity – Beginners', channel: 'Brackeys', views: '12M views', timestamp: '6 years ago', duration: '30:12', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZSmP3JbX4PoETl9C3_i5hqPi_aqVbDFY_q93A=s88' },
  { ytId: 'j48LtUkZRjU', title: 'C# Tutorial for Beginners – Full Course', channel: 'Programming with Mosh', views: '4M views', timestamp: '5 years ago', duration: '1:00:00', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
];

const INFO_VIDEOS = [
  RONALDO_VIDEO,

  // 🤖 How ChatGPT is Trained (what JARVIS/FRIDAY AI is built on)
  { ytId: 'VPRSBzXzavo', title: 'How ChatGPT is Trained', channel: 'Ari Seff', views: '1.2M views', timestamp: '2 years ago', duration: '10:07', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AjQbPMBrTmDSSRUGGMDLgDQMDtJFe4A=s88' },

  // 🧠 Claude AI / Anthropic
  { ytId: 'jLM6n4mdRuA', title: 'MCP Tutorial: Build Your First MCP Server', channel: 'AI Jason', views: '890K views', timestamp: '8 months ago', duration: '22:10', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  { ytId: 'm54t8xx13Uk', title: 'Ultimate Claude Guide 2026 (How to use Claude AI for beginners)', channel: 'AI Master', views: '540K views', timestamp: '7 months ago', duration: '34:20', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZScVBSCCTPVIkAbujGDH4Gu0cKPi-EIi1Lz0A=s88' },
  { ytId: 'WSPChlfxJyA', title: 'Full Claude Tutorial: Beginner to Advanced in 19 Minutes', channel: 'HubSpot', views: '320K views', timestamp: '5 months ago', duration: '19:00', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
  { ytId: 'n1sfrc-RjyM', title: 'OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw', channel: 'OpenClaw', views: '1.4M views', timestamp: '4 months ago', duration: '7:22', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AjQbPMBrTmDSSRUGGMDLgDQMDtJFe4A=s88' },

  // 🔌 MCP / Full-Stack Apps
  { ytId: '1NgO4Tzv27I', title: 'Build a Full-Stack Web App with Google AI Studio + Supabase (Auth, Database, File Uploads)', channel: 'Fireship', views: '2.1M views', timestamp: '3 months ago', duration: '6:12', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AjQbPMBrTmDSSRUGGMDLgDQMDtJFe4A=s88' },
  { ytId: '6n74FhiwYu4', title: 'Why I Chose Newton School of Technology Over Scaler or Polaris', channel: 'Matt Williams', views: '430K views', timestamp: '2 months ago', duration: '14:55', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQ3HnHlITJ0Vc-kSaQV1mQGSwJMBFBH3mU-g=s88' },

  // ⚙️ AI & Automation
  { ytId: '1MwSoB0gnM4', title: 'n8n – The ULTIMATE Automation Tool (Better than Zapier!)', channel: 'NetworkChuck', views: '1.9M views', timestamp: '1 year ago', duration: '28:10', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZScVBSCCTPVIkAbujGDH4Gu0cKPi-EIi1Lz0A=s88' },
  { ytId: 'KcbXKUR7-a0', title: 'How to Use Gamma AI (Full Tutorial for Presentations, Websites & More)', channel: 'Leon van Zyl', views: '560K views', timestamp: '1 year ago', duration: '54:21', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQ3HnHlITJ0Vc-kSaQV1mQGSwJMBFBH3mU-g=s88' },
  { ytId: 'mvHGl6zEA3w', title: 'The Ultimate AntiGravity Masterclass (3+ HOUR FREE COURSE)', channel: 'Jack AI Automations', views: '780K views', timestamp: '8 months ago', duration: '3:00:00', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRZwMlcGMdJMKwR7wWkFJCmLvMTdqzr9wKfxQ=s88' },

  // 🗃️ Supabase
  { ytId: 'zBZgdTb-dns', title: 'Supabase in 100 Seconds', channel: 'Fireship', views: '1.8M views', timestamp: '2 years ago', duration: '2:20', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AjQbPMBrTmDSSRUGGMDLgDQMDtJFe4A=s88' },
  { ytId: 'dU7GwCOgvNY', title: 'Supabase Crash Course', channel: 'Traversy Media', views: '740K views', timestamp: '2 years ago', duration: '1:07:39', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZScVBSCCTPVIkAbujGDH4Gu0cKPi-EIi1Lz0A=s88' },
  { ytId: 'ydz7Dj5QHKY', title: 'Supabase Full Course for Beginners', channel: 'Net Ninja', views: '620K views', timestamp: '2 years ago', duration: '2:15:00', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRZwMlcGMdJMKwR7wWkFJCmLvMTdqzr9wKfxQ=s88' },

  // 🎯 How to Master Skills
  { ytId: '5MgBikgcWnY', title: 'The First 20 Hours – How to Learn Anything Fast | Josh Kaufman', channel: 'TEDx Talks', views: '34M views', timestamp: '10 years ago', duration: '19:27', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZSmP3JbX4PoETl9C3_i5hqPi_aqVbDFY_q93A=s88' },
  { ytId: 'O96fE1E-rf8', title: 'How to Learn Anything Faster – Study Tips That Actually Work', channel: 'Thomas Frank', views: '5.2M views', timestamp: '4 years ago', duration: '12:42', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  { ytId: 'ukLnPbIffxE', title: 'How to Learn Skills 10x Faster – The Science of Rapid Learning', channel: 'Mike and Matty', views: '2.8M views', timestamp: '3 years ago', duration: '14:30', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
  { ytId: 'LNHBMFCzznE', title: 'How to Learn Faster with the Feynman Technique', channel: 'Thomas Frank', views: '3.6M views', timestamp: '5 years ago', duration: '8:41', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZTCM3tDpkB2FSnHPFwrPXBPP7R1kYJZs3EHiA=s88' },
  { ytId: 'IlU-zDU6aQ0', title: 'How to Learn to Code FAST Using AI in 2024', channel: 'NetworkChuck', views: '2.1M views', timestamp: '1 year ago', duration: '21:05', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZScVBSCCTPVIkAbujGDH4Gu0cKPi-EIi1Lz0A=s88' },

  // ⚡ Other useful tech
  { ytId: 'XRU-CjzYt_o', title: 'Why I Switched From ChatGPT to Claude (without losing anything)', channel: 'Dan Martell', views: '6M views', timestamp: '2 years ago', duration: '22:00', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRZwMlcGMdJMKwR7wWkFJCmLvMTdqzr9wKfxQ=s88' },
  { ytId: 'ysEN5RaKOlA', title: 'Git and GitHub for Beginners – Crash Course', channel: 'freeCodeCamp', views: '3.8M views', timestamp: '3 years ago', duration: '1:08:29', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZQUHMHOeqNq7zzm55UaJFzLNdEFEtnqJNMZ_w=s88' },
  { ytId: 'bBC-nXj3Ng4', title: 'How does Bitcoin / Blockchain Work?', channel: '3Blue1Brown', views: '8M views', timestamp: '5 years ago', duration: '26:21', avatar: 'https://yt3.googleusercontent.com/ytc/AIf8zZRx5T4q6GaJ7m_8oXJXU7gLk2cEALgmxcefog=s88' },
];



// Home shows Ronaldo first, then all education, then rest of informative
const HOME_VIDEOS = [RONALDO_VIDEO, ...EDU_VIDEOS, ...INFO_VIDEOS.slice(1)];



// Map a raw video entry into the shape VideoCard expects
const mapVideo = (v, index) => ({
  id: `${v.ytId}-${index}`,
  title: v.title,
  channelName: v.channel,
  views: v.views,
  timestamp: v.timestamp,
  duration: v.duration,
  poster: `https://img.youtube.com/vi/${v.ytId}/hqdefault.jpg`,
  ytId: v.ytId,
  channelAvatar: v.avatar,
});

const PAGE_SIZE = 8;

function getVideoPool(category) {
  if (category === 'Education') return EDU_VIDEOS;
  if (category === 'Informative') return INFO_VIDEOS;
  return HOME_VIDEOS; // Home + everything else shows mixed
}

// ---------------------------------------------------------------------------

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDataSaver, setIsDataSaver] = useState(localStorage.getItem('dataSaver') === 'true');
  const [activeCategory, setActiveCategory] = useState('Home');

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Dark-mode sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Reset when category changes
  useEffect(() => {
    setVideos([]);
    setPage(0);
    setHasMore(true);
  }, [activeCategory]);

  // Load next page
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const pool = getVideoPool(activeCategory);
      const start = page * PAGE_SIZE;
      const chunk = pool.slice(start % pool.length);
      // cycle the pool so scroll is truly infinite
      const cycled = [];
      let needed = PAGE_SIZE;
      let offset = start % pool.length;
      while (needed > 0) {
        const take = Math.min(needed, pool.length - offset);
        cycled.push(...pool.slice(offset, offset + take));
        needed -= take;
        offset = 0;
      }
      const newItems = cycled.map((v, i) => mapVideo(v, page * PAGE_SIZE + i));
      setVideos(prev => [...prev, ...newItems]);
      setPage(p => p + 1);
      setIsLoading(false);
    }, 600);
  }, [isLoading, hasMore, page, activeCategory]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleDataSaver = () => {
    const newState = !isDataSaver;
    setIsDataSaver(newState);
    localStorage.setItem('dataSaver', newState);
    alert(`Data Saver ${newState ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-body-md text-slate-900 dark:text-slate-100">
      <Header />
      <div className="flex pt-14">
        <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />

        <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-8 overflow-x-hidden">
          <CategoryChips
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mt-2">
            {videos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={setSelectedVideo}
              />
            ))}
          </div>

          {/* Sentinel for IntersectionObserver */}
          <div ref={loaderRef} className="flex justify-center items-center py-8 w-full">
            {isLoading && (
              <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-800 border-t-red-500 rounded-full animate-spin" />
            )}
          </div>
        </main>
      </div>

      {/* YouTube embed modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="absolute top-4 right-4 z-[110]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all active:scale-95 duration-200"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <div
            className="w-full max-w-6xl w-[90vw] aspect-video relative rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.ytId}?autoplay=1&rel=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isDataSaver={isDataSaver}
        toggleDataSaver={toggleDataSaver}
      />
    </div>
  );
}

export default App;
