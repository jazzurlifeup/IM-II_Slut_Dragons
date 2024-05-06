fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    displayCharacters(data.results);
  })
  .catch(error => console.error('Error fetching characters:', error));

function displayCharacters(characters) {
  const container = document.getElementById('characters');
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.className = 'character-card'; // Adding a class for styling purposes
    characterElement.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Location: ${character.location.name}</p>
            <a href="${character.url}" target="_blank">More Info</a>
        `;
    container.appendChild(characterElement);
  });
}