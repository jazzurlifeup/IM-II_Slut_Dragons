document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const locationsContainer = document.getElementById('locations');
  let allLocations = [];

  function displayLocations(locations) {
      locationsContainer.innerHTML = '';
      locations.forEach(location => {
          const locationElement = document.createElement('div');
          locationElement.className = 'location';
          locationElement.innerHTML = `
            <h2>${location.name}</h2>
            <p>Type: ${location.type}</p>
            <p>Dimension: ${location.dimension}</p>
            <a href="${location.url}" target="_blank">More Info</a>
        `;
          locationsContainer.appendChild(locationElement);
      });
  }

  function filterLocations() {
      const searchText = searchBar.value.toLowerCase();
      const filteredLocations = allLocations.filter(location =>
          location.name.toLowerCase().includes(searchText)
      );
      displayLocations(filteredLocations);
  }

  async function fetchAllLocations(url = 'https://rickandmortyapi.com/api/location') {
      try {
          const response = await fetch(url);
          const data = await response.json();
          allLocations = [...allLocations, ...data.results];

          if (data.info && data.info.next) {
              await fetchAllLocations(data.info.next); // Fetch the next page recursively
          } else {
              displayLocations(allLocations);
          }
      } catch (error) {
          console.error('Error fetching locations:', error);
      }
  }

  searchBar.addEventListener('input', filterLocations);

  fetchAllLocations();
});
