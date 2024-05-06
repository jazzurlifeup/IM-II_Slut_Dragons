fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    console.log('Data from API:', data);
    displayCharacters(data.results);
  })
  .catch(error => console.error('Error fetching characters:', error));

function displayCharacters(characters) {
    console.log('Characters to display:', characters);
    const container = document.getElementById('characters');
    characters.forEach(character => {
        console.log('Character:', character);
        const characterElement = document.createElement('div');
        characterElement.className = 'character-card'; // Adding a class for styling purposes
        characterElement.innerHTML = `
            <h3 class="character-name">${character.name}</h3>
            <img class="character-image" src="${character.image}" alt="Image of ${character.name}">
            <p class="character-info">Status: ${character.status}</p>
            <p class="character-info">Species: ${character.species}</p>
            <p class="character-info">Gender: ${character.gender}</p>
            <p class="character-info">Origin: ${character.origin.name}</p>
            <p class="character-info">Location: ${character.location.name}</p>
            <a class="character-info" href="${character.url}" target="_blank">More Info</a>
        `;
        container.appendChild(characterElement);
    });
}