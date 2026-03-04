document.addEventListener('DOMContentLoaded', () => {
    initClock('clock', 'greeting');
    renderBookmarks('categories-grid', bookmarks);
    initAnilist('anilist-container');
});

window.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});
