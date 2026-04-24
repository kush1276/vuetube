import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryChips from './components/CategoryChips';
import VideoCard from './components/VideoCard';
import VideoModal from './components/VideoModal';
import SettingsModal from './components/SettingsModal';
import './App.css';

const MOCK_VIDEOS = [
  {
    id: 1,
    title: "The Future of UI Design: Beyond Minimalism and Glassmorphism",
    channelName: "Design Theory Pro",
    views: "245K views",
    timestamp: "2 days ago",
    duration: "12:45",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZW8hjUFD_449Ryj8Fk7ic9AHze1aGF4ETCsqwWPwx32o894Y4OwO6gsjOoiyJARI8oZ4JGozqwIaW-vvbheyoF66Gfcd0IljE_TC1ejZTXYpDW66niUvi7FtZVBTTzZhCNWbpisVrveD_m7SotKZconmTn0ZIIhVPcsnYd5oCdXtNNXX4ITC57twUgojjILcHGwbuKVv6ueetqy5WQZUCtTls5m4ofwWxw-ONOyQZgJIDXEpMHmeULNRqzbxFT3k48DnlDRpOohk",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnFk3SIy7-SHTSx-hw3wh1vwg69zNbauARiWNXPTOJO2Ox35KjOGjzpl2k3Z67PzKp4M-GmMiMCmjtjBST30D_Df9avPdo3Xosv6ZX5tlne80yMzdMPgTM3BdgJI_6n-TUVAYUgF0ylOCMxsBfshIsE4bNwLJiVMYSjS5fowrjo-kuDE2-1onMqRZhkV1kRMb8OkVlXa3cvdpdwCOWBDpi0eMTJBBNLK8eCcTMmhWDfZSpo6fwQELjSsy19FKnDeVnm9CoexcRXFE"
  },
  {
    id: 2,
    title: "Building a Production-Ready Video Platform with Vue.js 3",
    channelName: "CodeWithSarah",
    views: "1.2M views",
    timestamp: "1 week ago",
    duration: "48:12",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4zoURQnx3NtLNRZ63_U5Yna2KLlJot2irJ3_s4vMvvmOr9FB9KW3bT9IRUx9Nf19vOxMpeB2C3EgzQ1sBtM1o-1lM9iUdGm-eMJx3y_ulZaBD5_utUGiD2MBwfNA7rTYQFn6hfIB9fU7zSW2Mw2ztnzE6Aq5b7SjHZaks4XreQig_CYDSRFv792yN3iQdUxsEhiIi-3uhnWV4Wp1FpBRcOImNEtENFjO6Iu41GdJp4bxdTicDXiqKuMX1AKDzKFj9YOruLUd1-u0",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbOjTgqizoIdv0ofQs30Z1xH1h9ReXHxVhnlyK3OmcCl6vDs9CM-rK81V0cmI5CZrP9qIl3ii3Gac7xM6a-2FS4A6ETjSzPKOcNxyigsX3ycZzub-hRNBqgmdc9R0lvt0f9ZS6TvQuXIa0joNGt8aNVLUlaN0xnjSYIuSDhclvLBqdlVr4he7sPrwcjCX--6AZ8i1KpPpd6SJW_GkZTJ_7VX9fITANx43K5GHqKOeEsu-7wM3wY6uGuA4OcESgoCXKnBQQ-9OHn1U"
  },
  {
    id: 3,
    title: "Setup Tour: The Ultimate Minimalist Creator Workspace for 2024",
    channelName: "TechUnfolded",
    views: "89K views",
    timestamp: "5 hours ago",
    duration: "15:00",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5x--wUH74f_ZHdMd5klY62mOGg03JNGswfry0ISANXUhRgkAm0_cxTInWF5z379slPpKMta4ubUVxVeJVnQGdMZ12jymYosafed7R2u0idv9e0keo4GpQO0FIXNXBzmsxH4xvIKTYou-UikPvGvhHlMEP_XLeZi_PElkq0AoIEUvLNIeZJ2KXjV-tvBSpM5sccdELC3Mal0O5AVlFjM1eunWBDmlpEPtFRKqxqDg7YnCapLk00UooFo5Hkn8C7RNkIu4VNlkkry4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDp_1VwwexSqnak7GygIofEpnP7p-1XXYw4yK08rUuIQLdHuLS3AIfSc8mQKaBVopE7R7ojMBdhRin2acMZryGFPr-DKb47UTUDRNkPW8FN-cnSZqIhL3XeFj071EZR2Q3l2wuFqCa6YnYayeTXc4ZY5LmkkJxrPAKx-QLCltspf_Brcz95rccHsmYnKJjEwxhjhhka1RRDcByzKl7JsdF9tmvBDAoCXujLUNJNriEls86_xINjjmCXrrdi4MsPSOGZCyzuaLGHfvI"
  },
  {
    id: 4,
    title: "Midnight Sessions: Acoustic Covers Vol. 12",
    channelName: "Luna Echoes",
    views: "560K views",
    timestamp: "3 days ago",
    duration: "3:24",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlHbVYWa7B9Fg7Lbe_mfzsGSfEkCijopP8W7JpkQtDH9DcnXfE8E8D4RiI81ePGic8xl6hlKDjs4G94C6OxXjFu6ljwOEMaPyJt0RVaYE4C-0yv-qNlhM9fQMR3E_z-0RwaL7UJE9pgVYNwb3JufRDs2KWMCOeQEWqNNPBHZ8CPZUOEvoHagdQyukW80KOqbSDn1TdGzV8T2e4Yuf5ZYaAkL3l6eBqACwftStal1W2x-LRodO2wizqmpMhC39aLz5gOwsSX4UVP_Y",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0uq8Q-SLBwTzo-p4Mp5MP00aw0rI3geqPaaKjIWN8lfRxONW48z8UF2vy3nrf6VifoPSTGBtgEtfpvd5DtJFl9W7nHpakCSLJyiB6u9W5tM7NbNmnNIWAQIyqVnKuenfyngpmW6cIBAvkEjGFDssqzW7PMPUXs6ViyuvtAI6afvoskhNJgd0QOT02deQ1Vu2pdCMAbiNh-z9jeLKvplwlEozlke7FCCZGA2SvAJwxugD-adVGiydYDFgn54t2waKXd86Vi8_h9vY"
  },
  {
    id: 5,
    title: "RTX 5090 Performance Review: The Impossible Benchmark",
    channelName: "HardwareHype",
    views: "2.1M views",
    timestamp: "1 day ago",
    duration: "22:18",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgOW3Jf7xbpOnczLjLkN29ZN5iejbjt1cQNaG1VwN5RFo-gEEZzKf7hCbAtJnv-P9uYc9Vp7J3gmv1aDXNcSx39uKJFcHyw4cpgnLijjsTkqebcGQHUsA6cy3YS_yUB3CzntdD8y6HhcQKmlxMzRzD4nwL4BteSQcMaR-XLpGaREw2hHgGJknINeWhLkZL_gh-48v2VUcwiNCxp7UQgiSF64JI0NeCwGHIH_Vd7jMybqOogC0j8ilq7zYJup_-EtMrJMdLSVsPYCE",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgmhwhA4y0Pn8CpXqdnWawfFEzNYl9Rd84YpcMD0jxp_BiyUZaZKvFQ2Iyq1jugegK0Dbk0IcOj_zkTRDFojkiSX3QM6L7EfNdzKq3BcgfWxgrSMwTJBq7xNG-MH_WcT8O5y1ZoUxQ0otvQqRLAgA1pGi_0TLsLB39-9J3nAc7_PiJZpiuL0yC5dQdPjwZRus839OIweS2RINR5PeewXZAGL1VDmj649mwOeGz83EUXTkC3sy6NNuTUW6OS0RcmnC4emUEjYAUGNA"
  },
  {
    id: 6,
    title: "Mastering Landscape Photography: 5 Tips for Golden Hour",
    channelName: "Visions of Earth",
    views: "15K views",
    timestamp: "4 hours ago",
    duration: "10:05",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaWk8xf1B1qypjWZnHxuNkP0TsZV7hKIDD7nXf8xMpOuqnivhsGBqqmVhaWho55rC1sItK0VWKy_WT2-KQxW8FyZBnw9gWMHfGgXCvz3016FyLm_mORUHToN9vxwrLrgh854QhtfRYTjyqOF9wtO5aFwMaH7Pj-PogxDTI1vkmrrN8VpuLkjor-q3pbD6jMzZ_l8W6ZXLmjJe6CHCPV1zUhAkpVMUz57kwui6JD5zbnNRuLUG5QDe32SqJOL05RtQfwzhI0u6OoGI",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC7hP7MI4jK-dejpz9UT1P3I_xBt-eDeaA9NtD407Yx7bBksLUlE2NXOfgPP-GdpXdlU6bkPwszRkxU_QOhsJ6oJr_MghigTrlKFVW2HhsJt9cdXJB9ZJliF4AiTgulON9Onx8GfQ2wU6hel5_TsAZzznqW65CujQHYnK0pP6tnGq2utAT12rl2TXy5i773J5WzoRElb7jeshxOIqWNORh7jyd9LW7VEway7WjoMTUxl0iMEOu7WIacCuW6L8v3RAUayTw3CY4T30"
  },
  {
    id: 7,
    title: "Authentic Italian Carbonara: No Cream Allowed!",
    channelName: "Chef's Table",
    views: "875K views",
    timestamp: "2 weeks ago",
    duration: "08:30",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8LYrcDzyzJ-YZ8XcZdGAV06RwBHRUHdKGKte-NdYbzXbxVJ1cbBiCoC6e14yepYgM21yA4plIb_a6crkRtrjQVUZupIWdr39FoY2CTdmNe6kflhQCB59L5xm7HTvsH3zLg514rje30rIsJbfRGSThjas4P84CJfyqy2TmuWAX3HhvE4qztMz50igVcGWkwlGlCQkvYKEmDYr_Pchl5agcERHuMN1Ib-nuUalmdGZWEbAkkKU-Ki1UV2aQ8CHq1hjTNjpZ7e6g1m4",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8LYrcDzyzJ-YZ8XcZdGAV06RwBHRUHdKGKte-NdYbzXbxVJ1cbBiCoC6e14yepYgM21yA4plIb_a6crkRtrjQVUZupIWdr39FoY2CTdmNe6kflhQCB59L5xm7HTvsH3zLg514rje30rIsJbfRGSThjas4P84CJfyqy2TmuWAX3HhvE4qztMz50igVcGWkwlGlCQkvYKEmDYr_Pchl5agcERHuMN1Ib-nuUalmdGZWEbAkkKU-Ki1UV2aQ8CHq1hjTNjpZ7e6g1m4"
  },
  {
    id: 8,
    title: "Designing My New Brand Identity: Full Process Breakdown",
    channelName: "Creative Studio",
    views: "42K views",
    timestamp: "6 days ago",
    duration: "31:20",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuChvXyeSDbpBoYdkH18tPxgZtncCaDBZNPog0ErOzPSJaR44kgVyQ_UCyjwxCvdU903TOCC1j0gqn3B1xRKtT1NXG1dO4n2g9uucSAc-OxW7rZsUTVVNJYHH4uicvwVvdvueIah-UDoYNpCfhUrr5rXU9c92X3tGLolUboLsTZyn0Hjj2W6JXbV0hnpzhFuISKBq5py6LZ6JTUpV0C_4hVZ30YmPDEOPU1Zv-fG7snHc9HS-SLTzoenbSkg_JQqWczfiZmpuL_PwuE",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    channelAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6xJMA5nchYaSsypMfVS02BDjIyMXeXMrdtimONmpTGaIydn-qfnv9Awfmms1hyvHa_EwmmIVx_C24UYDud9YYLqI7Y9xzw_ULavUF7in91XFQJWDSkGsDyuLGWEVZwi2vh7GJcX7KCGll3r9rnlUB_WESj5uZY67qgqjm_HCCI7t8Ds5AWk3y0C_5BlpLCzsGkIIyTc3BKHwUNUdll44wWvVBmaVsasQBoZrktLk_TtGruG4kUXH1c4TiZiD1OSsTv-qVbWqQU8U"
  }
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isDataSaver, setIsDataSaver] = useState(localStorage.getItem('dataSaver') === 'true');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

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
          <CategoryChips />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mt-2">
            {MOCK_VIDEOS.map(video => (
              <VideoCard 
                key={video.id} 
                video={video} 
                onSelect={setSelectedVideo}
              />
            ))}
          </div>
        </main>
      </div>

      <VideoModal 
        video={selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />

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
