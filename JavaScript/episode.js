document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const episodesContainer = document.getElementById('episodes');

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
      fetch('https://rickandmortyapi.com/api/episode')
          .then(response => response.json())
          .then(data => {
              const filteredEpisodes = data.results.filter(episode =>
                  episode.name.toLowerCase().includes(searchText)
              );
              displayEpisodes(filteredEpisodes);
          })
          .catch(error => {
              console.error('Error fetching episodes:', error);
          });
  }

  // Setup filter on user input
  searchBar.addEventListener('input', filterEpisodes);

  // Fetch all episodes initially
  fetch('https://rickandmortyapi.com/api/episode')
      .then(response => response.json())
      .then(data => {
          displayEpisodes(data.results);
      })
      .catch(error => {
          console.error('Error fetching episodes:', error);
      });
});