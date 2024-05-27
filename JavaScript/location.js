document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const locationsContainer = document.getElementById('locations');
  let allLocations = [];

  async function fetchResidents(urls) {
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const data = await Promise.all(responses.map(res => res.json()));
    return data; // Return full data for more detailed handling in display function
}

  function displayLocations(locations) {
    locationsContainer.innerHTML = '';
    locations.forEach(location => {
      const locationElement = document.createElement('div');
      locationElement.className = 'location';
      locationElement.innerHTML = `
              <h2>${location.name}</h2>
              <p>Type: ${location.type}</p>
              <p>Dimension: ${location.dimension}</p>
              <button onclick="showResidentsModal('${location.url}', '${location.name}')">Location Residents</button>
          `;
      locationsContainer.appendChild(locationElement);
    });
  }

  window.showResidentsModal = async (locationUrl, locationName) => {
    const modal = document.getElementById('residentsModal');
    const residentsList = document.getElementById('residentsList');
    residentsList.innerHTML = '<p>Loading residents...</p>';

    const response = await fetch(locationUrl);
    const location = await response.json();
    const residents = await fetchResidents(location.residents);

    document.getElementById('locationName').textContent = `${locationName} Residents`;
    residentsList.innerHTML = ''; // Clear previous content

    residents.forEach(resident => {
        const residentElement = document.createElement('div');
        residentElement.textContent = resident.name;
        residentsList.appendChild(residentElement);
    });

    if (!residents.length) {
        residentsList.innerHTML = '<p>No residents found.</p>';
    }

    modal.style.display = 'block';
};

  // Close the modal
  document.getElementsByClassName('close')[0].onclick = function () {
    document.getElementById('residentsModal').style.display = 'none';
  };

  window.onclick = function (event) {
    const modal = document.getElementById('residentsModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredLocations = allLocations.filter(location =>
      location.name.toLowerCase().includes(searchText)
    );
    displayLocations(filteredLocations);
  });

  async function fetchAllLocations(url = 'https://rickandmortyapi.com/api/location') {
    try {
      const response = await fetch(url);
      const data = await response.json();
      allLocations = [...allLocations, ...data.results];
      if (data.info.next) {
        await fetchAllLocations(data.info.next);
      } else {
        displayLocations(allLocations);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  fetchAllLocations();
});
