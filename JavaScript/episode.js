fetch('https://rickandmortyapi.com/api/episode')
  .then(response => response.json())
  .then(data => {
    displayEpisodes(data.results);
  })
  .catch(error => console.error('Error fetching episodes:', error));

function displayEpisodes(episodes) {
    const container = document.getElementById('episodes');
    episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.className = 'episode-card'; // Adding a class for styling purposes
        episodeElement.innerHTML = `
            <h3>${episode.name}</h3>
            <p>Episode: ${episode.episode}</p>
            <p>Air Date: ${episode.air_date}</p>
            <a href="${episode.url}" target="_blank">More Info</a>
        `;
        container.appendChild(episodeElement);
    });
}