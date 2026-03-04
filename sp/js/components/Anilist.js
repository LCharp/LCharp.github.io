const ANILIST_API_URL = 'https://graphql.anilist.co/';
const ANILIST_STORAGE_KEY = 'anilist_startpage_data';
const ANILIST_DATE_KEY = 'anilist_startpage_date';

const ANILIST_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      hasNextPage
    }
    media(status: RELEASING, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
      id
      title {
        romaji
      }
      status
      episodes
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
    }
  }
}`;

function formatTimeUntilAiring(seconds) {
    if (!seconds) return '';
    const days = Math.floor(seconds / (3600 * 24));

    if (days > 0) {
        return `in ${days}d`;
    }
    return `today`;
}

async function fetchAnilistData() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(ANILIST_DATE_KEY);

    // Check if we have valid cached data for today
    if (storedDate === today) {
        const storedData = localStorage.getItem(ANILIST_STORAGE_KEY);
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (e) {
                console.error("Failed to parse Anilist data from local storage", e);
            }
        }
    }

    // Fetch new data
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query: ANILIST_QUERY,
            variables: { page: 1, perPage: 25 }
        })
    };

    try {
        const response = await fetch(ANILIST_API_URL, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Save to local storage
        localStorage.setItem(ANILIST_STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(ANILIST_DATE_KEY, today);

        return data;
    } catch (error) {
        console.error("Error fetching Anilist data:", error);
        return null;
    }
}

function renderAnilistCards(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!data || !data.data || !data.data.Page || !data.data.Page.media) {
        container.innerHTML = '<div class="anime-error">Failed to load anime data.</div>';
        return;
    }

    const animeList = data.data.Page.media;

    // Create the inner scroll track
    const track = document.createElement('div');
    track.className = 'anime-track';

    animeList.forEach((anime, index) => {
        const card = document.createElement('a');
        card.className = 'anime-card';
        card.href = `https://anilist.co/anime/${anime.id}`;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        // Initial setup for the first 4 cards to be visible
        if (index < 4) {
            card.setAttribute('data-index', index);
        }

        let epInfo = '';
        let timeInfo = '';

        if (anime.nextAiringEpisode) {
            epInfo = `EP ${anime.nextAiringEpisode.episode}`;
            timeInfo = formatTimeUntilAiring(anime.nextAiringEpisode.timeUntilAiring);
        } else {
            epInfo = 'COMPLETED?'; // Sometimes status is releasing but no next ep
        }

        const title = anime.title.romaji || 'Unknown Title';

        card.innerHTML = `
            <div class="anime-meta">
                <span class="anime-ep">${epInfo}</span>
                <span class="anime-time">${timeInfo}</span>
            </div>
            <h4 class="anime-title" title="${title}">${title}</h4>
            <div class="anime-count">${index + 1}/${animeList.length}</div>
        `;

        track.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(track);

    initDeckLogic(track);
}

function initDeckLogic(track) {
    let cards = Array.from(track.querySelectorAll('.anime-card'));
    let isAnimating = false;

    function cycleDeck() {
        if (isAnimating || cards.length < 2) return;
        isAnimating = true;

        const topCard = cards[0];

        // Add animation out class to front card
        topCard.classList.add('animating-out');

        // Remove data-index attrs from all
        cards.forEach(c => c.removeAttribute('data-index'));

        setTimeout(() => {
            // Remove the top card from the DOM and push it to end of array
            track.removeChild(topCard);
            topCard.classList.remove('animating-out');
            cards.push(cards.shift());

            // Re-append to the end of the track
            track.appendChild(topCard);

            // Re-assign data-index to the new top 4 elements
            for (let i = 0; i < 4 && i < cards.length; i++) {
                cards[i].setAttribute('data-index', i);
            }

            isAnimating = false;
        }, 300); // matches the 0.4s CSS transition roughly
    }

    // Scroll wheel to cycle
    track.parentElement.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent page scrolling while hovering over deck
        if (e.deltaY > 0 || e.deltaX > 0) {
            cycleDeck(); // scroll down or right -> cycle next
        }
    }, { passive: false });
}

async function initAnilist(containerId) {
    const data = await fetchAnilistData();
    renderAnilistCards(data, containerId);
}
