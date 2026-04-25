import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoCard from './components/VideoCard';
import SettingsModal from './components/SettingsModal';
import HelpModal from './components/HelpModal';
import SubscriptionsView from './components/SubscriptionsView';
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

// ── Subscriptions ─────────────────────────────────────────────────────────────
const YOUTUBE_API_KEY_2 = import.meta.env.VITE_YOUTUBE_API_KEY_2;

const SUBSCRIBED_CHANNELS = [
  'NewtonSchoolOfTechnology-ADYPU',
  'imassasin1361',
  'AalekhFx',
  'Br7k07',
];

// Convert ISO 8601 duration (e.g. PT1H2M3S) → "1:02:03" / "2:30" / "0:45"
const parseISO8601Duration = (iso) => {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || '0');
  const min = parseInt(m[2] || '0');
  const s = parseInt(m[3] || '0');
  if (h > 0) return `${h}:${String(min).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${min}:${String(s).padStart(2, '0')}`;
};

// Total seconds from ISO 8601 duration — used to detect Shorts (≤ 60 s)
const parseDurationToSeconds = (iso) => {
  if (!iso) return Infinity;
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return Infinity;
  return (parseInt(m[1] || '0') * 3600) + (parseInt(m[2] || '0') * 60) + parseInt(m[3] || '0');
};

function getVideoPool(category) {
  if (category === 'Home') return HOME_VIDEOS;
  if (category === 'Education') return EDU_VIDEOS;
  if (category === 'Informative') return INFO_VIDEOS;

  const categoryLower = category.toLowerCase();
  
  const filtered = HOME_VIDEOS.filter(video => {
    const text = (video.title + ' ' + video.channel).toLowerCase();
    
    // Exact substring match
    if (text.includes(categoryLower)) return true;
    
    // Specific overrides for categories to make them "work" with existing data
    if (category === 'Gaming' && text.includes('game')) return true;
    if (category === 'Design Systems' && (text.includes('design') || text.includes('ui') || text.includes('ux'))) return true;
    if (category === 'Programming' && (text.includes('code') || text.includes('react') || text.includes('javascript') || text.includes('python') || text.includes('c#') || text.includes('tutorial'))) return true;
    if (category === 'Productivity' && (text.includes('learn') || text.includes('study') || text.includes('fast') || text.includes('automation'))) return true;
    if (category === 'Photography' && (text.includes('photo') || text.includes('camera'))) return true;
    
    return false;
  });

  return filtered;
}

// ---------------------------------------------------------------------------

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userHandle, setUserHandle] = useState(localStorage.getItem('userHandle') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDataSaver, setIsDataSaver] = useState(localStorage.getItem('dataSaver') === 'true');
  const [activeCategory, setActiveCategory] = useState('Home');

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [subscriptionChannels, setSubscriptionChannels] = useState([]);
  const loaderRef = useRef(null);

  // YouTube API Key (Accessed via environment variable for security)
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; 

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

  // Reset when category changes; fetch subscriptions when needed
  useEffect(() => {
    setVideos([]);
    setPage(0);

    if (activeCategory === 'Subscriptions') {
      setHasMore(false);

      const fetchSubs = async () => {
        setIsLoading(true);
        try {
          // 1️⃣ Resolve channel handles → IDs + avatars
          const channelData = await Promise.all(
            SUBSCRIBED_CHANNELS.map(async (handle) => {
              const res = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${handle}&key=${YOUTUBE_API_KEY_2}`
              );
              const data = await res.json();
              const item = data.items?.[0];
              if (!item) return null;
              return {
                id: item.id,
                name: item.snippet.title,
                avatar:
                  item.snippet.thumbnails?.default?.url ||
                  item.snippet.thumbnails?.medium?.url ||
                  '',
              };
            })
          );
          const validChannels = channelData.filter(Boolean);
          // Store channel info so SubscriptionsView can show avatar row
          setSubscriptionChannels(validChannels);

          // 2️⃣ Fetch latest 15 videos per channel (includes Shorts)
          const videoArrays = await Promise.all(
            validChannels.map(async (ch) => {
              const res = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ch.id}&maxResults=15&order=date&type=video&key=${YOUTUBE_API_KEY_2}`
              );
              const data = await res.json();
              return (data.items || []).map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                channelName: item.snippet.channelTitle,
                views: '',
                timestamp: new Date(item.snippet.publishedAt).toLocaleDateString(
                  'en-US',
                  { year: 'numeric', month: 'short', day: 'numeric' }
                ),
                duration: '',
                poster:
                  item.snippet.thumbnails?.high?.url ||
                  item.snippet.thumbnails?.medium?.url ||
                  item.snippet.thumbnails?.default?.url,
                ytId: item.id.videoId,
                channelAvatar: ch.avatar,
                publishedAt: item.snippet.publishedAt,
              }));
            })
          );

          const allVideos = videoArrays.flat();

          // 3️⃣ Enrich with duration + view count (videos.list, batch of 50)
          const videoIds = allVideos.map((v) => v.ytId);
          const batches = [];
          for (let i = 0; i < videoIds.length; i += 50) {
            batches.push(videoIds.slice(i, i + 50));
          }
          const detailsMap = {};
          await Promise.all(
            batches.map(async (batch) => {
              const res = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${batch.join(',')}&key=${YOUTUBE_API_KEY_2}`
              );
              const data = await res.json();
              (data.items || []).forEach((item) => {
                const rawViews = item.statistics?.viewCount;
                const iso = item.contentDetails?.duration;
                detailsMap[item.id] = {
                  duration: parseISO8601Duration(iso),
                  durationSeconds: parseDurationToSeconds(iso),
                  views: rawViews
                    ? `${Number(rawViews).toLocaleString()} views`
                    : '',
                };
              });
            })
          );

          // 4️⃣ Merge details + sort newest → oldest
          const enriched = allVideos
            .map((v) => ({
              ...v,
              duration: detailsMap[v.ytId]?.duration || '',
              durationSeconds: detailsMap[v.ytId]?.durationSeconds ?? Infinity,
              views: detailsMap[v.ytId]?.views || '',
            }))
            .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

          setVideos(enriched);
        } catch (err) {
          console.error('Subscription fetch error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSubs();
    } else {
      setHasMore(true);
    }
  }, [activeCategory]);

  // Load next page
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      const pool = getVideoPool(activeCategory);
      if (pool.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
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
  
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setActiveCategory('Home');
      setIsSearching(false);
      return;
    }

    setIsLoading(true);
    setIsSearching(true);
    setVideos([]);
    setPage(0);
    setHasMore(false); // Disable infinite scroll during YouTube search results for now

    try {
      if (!YOUTUBE_API_KEY) {
        throw new Error('No API Key');
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      
      const mappedVideos = data.items.map((item, index) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelName: item.snippet.channelTitle,
        views: 'Loading...', // Search API doesn't provide views directly
        timestamp: new Date(item.snippet.publishedAt).toLocaleDateString(),
        duration: 'Live', // Duration also needs another API call
        poster: item.snippet.thumbnails.high.url,
        ytId: item.id.videoId,
        channelAvatar: `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`,
      }));

      setVideos(mappedVideos);
    } catch (error) {
      console.warn('YouTube Search failed, falling back to local search:', error);
      // Fallback: Local search if API fails
      setActiveCategory(query);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDataSaver = () => {
    const newState = !isDataSaver;
    setIsDataSaver(newState);
    localStorage.setItem('dataSaver', newState);
    alert(`Data Saver ${newState ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-body-md text-slate-900 dark:text-slate-100">
      <Header 
        userName={userName} 
        userHandle={userHandle}
        userEmail={userEmail}
        onSearch={handleSearch} 
      />
      <div className="flex pt-14">
        <Sidebar 
          onOpenSettings={() => setIsSettingsOpen(true)} 
          onOpenHelp={() => setIsHelpOpen(true)}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-8 overflow-x-hidden">
          {activeCategory === 'Your Videos' ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                You can't upload videos right now!
              </h2>
            </div>
          ) : activeCategory === 'Watch Later' ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">
                This feature isn't available right now, We will add it in the near future!.
              </h2>
            </div>
          ) : (
            <>
              <CategoryChips
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />

              {activeCategory === 'Subscriptions' ? (
                <SubscriptionsView
                  channels={subscriptionChannels}
                  videos={videos}
                  onSelect={setSelectedVideo}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mt-2">
                  {videos.map(video => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onSelect={setSelectedVideo}
                    />
                  ))}
                </div>
              )}

              {/* Sentinel for IntersectionObserver */}
              <div ref={loaderRef} className="flex justify-center items-center py-8 w-full">
                {isLoading && (
                  <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-800 border-t-red-500 rounded-full animate-spin" />
                )}
              </div>
            </>
          )}
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
        userName={userName}
        setUserName={setUserName}
        userHandle={userHandle}
        setUserHandle={setUserHandle}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />

      <HelpModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
