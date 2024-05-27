// Array to hold all the characters fetched from the API
let allCharacters = [];

// Function to fetch all characters recursively across pages
function fetchAllCharacters(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      allCharacters = allCharacters.concat(data.results);
      if (data.info.next) {
        return fetchAllCharacters(data.info.next); // Fetch the next page
      } else {
        // Populate all dropdowns once all characters are loaded
        populateSpeciesDropdown(allCharacters);
        populateStatusDropdown();
        populateGenderDropdown(allCharacters);
        displayCharacters(allCharacters); // Display characters on the page
      }
    })
    .catch(error => console.error('Error fetching characters:', error));
}




// Initial fetch call to start the recursive loading of characters
fetchAllCharacters('https://rickandmortyapi.com/api/character');

// Populate the species dropdown dynamically
function populateSpeciesDropdown(characters) {
  const speciesSet = new Set(characters.map(c => c.species));
  const speciesDropdown = document.getElementById('species-dropdown');
  speciesSet.forEach(species => {
    const option = document.createElement('option');
    option.value = species;
    option.textContent = species;
    speciesDropdown.appendChild(option);
  });
}

// Populate the status dropdown with known statuses
function populateStatusDropdown() {
  const statusDropdown = document.getElementById('status-dropdown');
  const statuses = ['Alive', 'Dead', 'unknown'];
  statuses.forEach(status => {
    const option = document.createElement('option');
    option.value = status;
    option.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    statusDropdown.appendChild(option);
  });
}

// Populate the gender dropdown dynamically
function populateGenderDropdown(characters) {
  const genderSet = new Set(characters.map(c => c.gender));
  const genderDropdown = document.getElementById('gender-dropdown');
  genderSet.forEach(gender => {
    const option = document.createElement('option');
    option.value = gender;
    option.textContent = gender;
    genderDropdown.appendChild(option);
  });
}



// Event listeners to detect changes in the search bar and dropdowns
document.getElementById('search-bar').addEventListener('input', applyFilters);
document.getElementById('species-dropdown').addEventListener('change', applyFilters);
document.getElementById('status-dropdown').addEventListener('change', applyFilters);
document.getElementById('gender-dropdown').addEventListener('change', applyFilters);

// Function to apply all the filters based on user input
function applyFilters() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  const selectedSpecies = document.getElementById('species-dropdown').value;
  const selectedStatus = document.getElementById('status-dropdown').value;
  const selectedGender = document.getElementById('gender-dropdown').value;

  // Filter the characters based on user input
  const filteredCharacters = allCharacters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm);
    const matchesSpecies = !selectedSpecies || character.species === selectedSpecies;
    const matchesStatus = !selectedStatus || character.status === selectedStatus;
    const matchesGender = !selectedGender || character.gender === selectedGender;

    return matchesSearch && matchesSpecies && matchesStatus && matchesGender;
  });

  // Display only the filtered characters
  displayCharacters(filteredCharacters);
}








// Function to display characters on the page
function displayCharacters(characters) {
  const container = document.getElementById('characters');
  container.innerHTML = '';
  characters.forEach(character => {
    const characterElement = document.createElement('div');
    characterElement.className = 'character-card';
    characterElement.innerHTML = `
      <h3>${character.name}</h3>
      <img src="${character.image}" alt="${character.name}">

      <button onclick="showModal('${character.id}')">More Data</button>
    `;
    container.appendChild(characterElement);
  });
}

// Function to show the modal
function showModal(characterId) {
  const modal = document.getElementById('myModal');
  const character = allCharacters.find(c => c.id === characterId);

  document.getElementById('modal-name').textContent = character.name;
  document.getElementById('modal-image').src = character.image;
  document.getElementById('modal-image').alt = character.name;
  document.getElementById('modal-status').textContent = 'Status: ' + character.status;
  document.getElementById('modal-species').textContent = 'Species: ' + character.species;
  document.getElementById('modal-gender').textContent = 'Gender: ' + character.gender;
  document.getElementById('modal-origin').textContent = 'Origin: ' + character.origin.name;
  document.getElementById('modal-location').textContent = 'Location: ' + character.location.name;

  modal.style.display = "block";
}








function showModal(characterId) {

  const modal = document.getElementById('myModal');
  const character = allCharacters.find(c => c.id == characterId);  // Ensure correct comparison (== or === depending on type)

  if (character) {
    document.getElementById('modal-name').textContent = character.name;
    document.getElementById('modal-image').src = character.image;
    document.getElementById('modal-image').alt = character.name;
    document.getElementById('modal-status').textContent = 'Status: ' + character.status;
    document.getElementById('modal-species').textContent = 'Species: ' + character.species;
    document.getElementById('modal-gender').textContent = 'Gender: ' + character.gender;
    document.getElementById('modal-origin').textContent = 'Origin: ' + character.origin.name;
    document.getElementById('modal-location').textContent = 'Location: ' + character.location.name;

    modal.style.display = "block";
  } else {
    console.error('Character data not found for ID:', characterId);
  }
}

var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
