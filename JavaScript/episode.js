document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const episodesContainer = document.getElementById('episodes');
    let allEpisodes = [];

    async function fetchCharacters(urls) {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        return data;
    }

    function displayEpisodes(episodes) {
        episodesContainer.innerHTML = '';
        episodes.forEach(episode => {
            const episodeElement = document.createElement('div');
            episodeElement.className = 'episode';
            episodeElement.innerHTML = `
                <h2>${episode.name}</h2>
                <p>Episode: ${episode.episode}</p>
                <p>Air Date: ${episode.air_date}</p>
                <button onclick="showCharactersModal('${episode.characters}', '${episode.name}')">Episode Characters</button>
            `;
            episodesContainer.appendChild(episodeElement);
        });
    }

    window.showCharactersModal = async (characterUrls, episodeName) => {
        const modal = document.getElementById('charactersModal');
        const charactersList = document.getElementById('charactersList');
        charactersList.innerHTML = '<p>Loading characters...</p>';

        const characters = await fetchCharacters(characterUrls.split(','));

        document.getElementById('episodeTitle').textContent = `${episodeName} Characters`;
        charactersList.innerHTML = '';

        characters.forEach(character => {
            const characterElement = document.createElement('div');
            characterElement.textContent = character.name;
            charactersList.appendChild(characterElement);
        });

        if (!characters.length) {
            charactersList.innerHTML = '<p>No characters found.</p>';
        }

        modal.style.display = 'block';
    };

    // Close the modal logic
    document.getElementsByClassName('close')[0].onclick = function () {
        document.getElementById('charactersModal').style.display = 'none';
    };

    window.onclick = function (event) {
        const modal = document.getElementById('charactersModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    async function fetchAllEpisodes(url = 'https://rickandmortyapi.com/api/episode') {
        try {
            const response = await fetch(url);
            const data = await response.json();
            allEpisodes = [...allEpisodes, ...data.results];
            if (data.info.next) {
                await fetchAllEpisodes(data.info.next);
            } else {
                displayEpisodes(allEpisodes);
            }
        } catch (error) {
            console.error('Error fetching episodes:', error);
        }
    }

    searchBar.addEventListener('input', () => {
        const searchText = searchBar.value.toLowerCase();
        const filteredEpisodes = allEpisodes.filter(episode =>
            episode.name.toLowerCase().includes(searchText)
        );
        displayEpisodes(filteredEpisodes);
    });

    fetchAllEpisodes();
});
