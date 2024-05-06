fetch('https://rickandmortyapi.com/api/character') 
  .then(response => response.json())
  .then(data => {
    displayData(data);
  })
  .catch(error => console.error('Error:', error));

  function displayCharacters(characters) {
    const container = document.getElementById('characters');
    characters.results.forEach(character => {
        const element = document.createElement('div');
        element.innerHTML = `
            <h3>${character.name}</h3>
            <p>Status: ${character.status}</p>
            <img src="${character.image}" alt="Image of ${character.name}">
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
        `;
        container.appendChild(element);
    });
}html