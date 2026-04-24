document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('header button.lg\\:hidden');
    const sidebar = document.querySelector('nav.hidden.md\\:block');

    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            // If shown on mobile, add absolute positioning / full height classes
            if (!sidebar.classList.contains('hidden')) {
                sidebar.classList.add('fixed', 'left-0', 'top-14', 'bottom-0', 'z-50', 'w-64', 'bg-white', 'shadow-2xl');
            } else {
                sidebar.classList.remove('fixed', 'left-0', 'top-14', 'bottom-0', 'z-50', 'w-64', 'bg-white', 'shadow-2xl');
            }
        });
    }

    // 2. Category Chips Functionality
    const chipsContainer = document.querySelector('.overflow-x-auto');
    if (chipsContainer) {
        const chips = chipsContainer.querySelectorAll('button');
        chips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                // Reset all chips to default state
                chips.forEach(c => {
                    c.className = 'px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full text-sm font-medium whitespace-nowrap transition-colors';
                });
                // Set clicked chip to active state
                e.target.className = 'px-4 py-1.5 bg-slate-900 text-white rounded-full text-sm font-medium whitespace-nowrap';
            });
        });
    }

    // 3. Full Screen Video Player
    const videoModal = document.getElementById('video-modal');
    const modalVideoPlayer = document.getElementById('modal-video-player');
    const closeModalBtn = document.getElementById('close-modal');
    const videoCards = document.querySelectorAll('article.group.cursor-pointer');

    if (videoModal && modalVideoPlayer && closeModalBtn) {
        // Open modal on click
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSource = card.dataset.videoSrc;
                if (videoSource) {
                    modalVideoPlayer.src = videoSource;
                    videoModal.classList.remove('hidden');
                    videoModal.classList.add('flex');
                    modalVideoPlayer.play();
                }
            });
        });

        // Close modal logic
        const closeVideo = () => {
            modalVideoPlayer.pause();
            modalVideoPlayer.src = '';
            videoModal.classList.add('hidden');
            videoModal.classList.remove('flex');
        };

        closeModalBtn.addEventListener('click', closeVideo);

        // Close if clicking outside the video
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideo();
            }
        });

        // Auto play preview on hover logic (optional)
        const previews = document.querySelectorAll('.video-preview');
        previews.forEach(preview => {
            const card = preview.closest('article');
            card.addEventListener('mouseenter', () => {
                preview.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                preview.pause();
                preview.currentTime = 0;
            });
        });
    }
});
