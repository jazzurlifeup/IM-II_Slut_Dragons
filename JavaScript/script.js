ffetch('https://rickandmortyapi.com/api')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log(data);  // Handling the data from the API
})
.catch(error => {
    console.error('There was a problem with your fetch operation:', error);
});

// Adding new functionality
async function fetchData(url) {
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
} catch (error) {
    console.error("There was a problem with the fetch operation:", error);
}
}

// Specific page initializations (placeholders)
async function initCharactersPage() {
const data = await fetchData('https://rickandmortyapi.com/api/character');
if (data) displayCharacters(data.results);
}

// Display functions (placeholders)
function displayCharacters(characters) {
const container = document.getElementById('characters');
characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.innerHTML = `<h3>${character.name}</h3>`;
    container.appendChild(characterElement);
});
}

// Initialize on DOMContentLoaded if specific page elements exist
document.addEventListener('DOMContentLoaded', () => {
if (document.getElementById('characters')) {
    initCharactersPage();
}
});
