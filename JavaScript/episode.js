document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const episodesContainer = document.getElementById('episodes');
    let allEpisodes = [];

    // Function to display episodes
    function displayEpisodes(episodes) {
        episodesContainer.innerHTML = ''; // Clear previous episodes
        episodes.forEach(episode => {
            const episodeElement = document.createElement('div');
            episodeElement.className = 'episode'; // Ensure this matches your CSS class for styling
            episodeElement.innerHTML = `
              <h2>${episode.name}</h2>
              <p>Episode: ${episode.episode}</p>
              <p>Air Date: ${episode.air_date}</p>
              <a href="${episode.url}" target="_blank">More Info</a>
          `;
            episodesContainer.appendChild(episodeElement);
        });
    }

    // Function to filter episodes based on search text
    function filterEpisodes() {
        const searchText = searchBar.value.toLowerCase();
        const filteredEpisodes = allEpisodes.filter(episode =>
            episode.name.toLowerCase().includes(searchText)
        );
        displayEpisodes(filteredEpisodes);
    }

    // Function to fetch all episodes by paging through the API
    async function fetchAllEpisodes(url = 'https://rickandmortyapi.com/api/episode') {
        try {
            const response = await fetch(url);
            const data = await response.json();
            allEpisodes = [...allEpisodes, ...data.results];

            if (data.info && data.info.next) {
                await fetchAllEpisodes(data.info.next); // Fetch the next page recursively
            } else {
                displayEpisodes(allEpisodes);
            }
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    }

    // Setup filter on user input
    searchBar.addEventListener('input', filterEpisodes);

    // Fetch all episodes initially
    fetchAllEpisodes();
});
