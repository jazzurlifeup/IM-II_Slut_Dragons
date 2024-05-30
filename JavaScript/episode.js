// Wait until the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the search bar and episodes container elements
    const searchBar = document.getElementById('search-bar');
    const episodesContainer = document.getElementById('episodes');
    // Initialize an empty array to store all episodes
    let allEpisodes = [];

    // Fetch character data from multiple URLs
    async function fetchCharacters(urls) {
        // Fetch data from all URLs simultaneously
        const responses = await Promise.all(urls.map(url => fetch(url)));
        // Parse the JSON responses
        const data = await Promise.all(responses.map(res => res.json()));
        return data;
    }

    // Display episodes in the episodes container
    function displayEpisodes(episodes) {
        // Clear the episodes container
        episodesContainer.innerHTML = '';
        // Loop through each episode and create HTML elements for it
        episodes.forEach(episode => {
            const episodeElement = document.createElement('div');
            episodeElement.className = 'episode';
            episodeElement.innerHTML = `
                <h2>${episode.name}</h2>
                <p>Episode: ${episode.episode}</p>
                <p>Air Date: ${episode.air_date}</p>
                <button onclick="showCharactersModal('${episode.characters}', '${episode.name}')">Episode Characters</button>
            `;
            // Append the episode element to the container
            episodesContainer.appendChild(episodeElement);
        });
    }

    // Show a modal with the characters of a specific episode
    window.showCharactersModal = async (characterUrls, episodeName) => {
        const modal = document.getElementById('charactersModal');
        const charactersList = document.getElementById('charactersList');
        // Display a loading message while fetching characters
        charactersList.innerHTML = '<p>Loading characters...</p>';

        // Fetch character data from the provided URLs
        const characters = await fetchCharacters(characterUrls.split(','));

        // Update the modal title with the episode name
        document.getElementById('episodeTitle').textContent = `${episodeName} Characters`;
        // Clear the characters list
        charactersList.innerHTML = '';

        // Loop through each character and create an HTML element for them
        characters.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.textContent = character.name;
            charactersList.appendChild(characterElement);
        });

        // If no characters are found, display a message
        if (!characters.length) {
            charactersList.innerHTML = '<p>No characters found.</p>';
        }

        // Show the modal
        modal.style.display = 'block';
    };

    // Close the modal when the close button is clicked
    document.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('charactersModal').style.display = 'none';
    };

    // Close the modal when clicking outside of it
    window.onclick = function (event) {
        const modal = document.getElementById('charactersModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Fetch all episodes from the API
    async function fetchAllEpisodes(url = 'https://rickandmortyapi.com/api/episode') {
        try {
            // Fetch episode data from the API
            const response = await fetch(url);
            const data = await response.json();
            // Append the fetched episodes to the allEpisodes array
            allEpisodes = [...allEpisodes, ...data.results];
            // If there are more episodes to fetch, fetch the next page
            if (data.info.next) {
                await fetchAllEpisodes(data.info.next);
            } else {
                // Once all episodes are fetched, display them
                displayEpisodes(allEpisodes);
            }
        } catch (error) {
            // Log any errors that occur during fetching
            console.error('Error fetching episodes:', error);
        }
    }

    // Filter and display episodes based on the search input
    searchBar.addEventListener('input', () => {
        const searchText = searchBar.value.toLowerCase();
        const filteredEpisodes = allEpisodes.filter(episode =>
            episode.name.toLowerCase().includes(searchText)
        );
        displayEpisodes(filteredEpisodes);
    });

    // Initial fetch of all episodes when the page loads
    fetchAllEpisodes();
});
