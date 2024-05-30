document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const locationsContainer = document.getElementById('locations');
  let allLocations = [];

  // Fetches residents data from the given URLs
  async function fetchResidents(urls) {
    const responses = await Promise.all(urls.map(url => fetch(url))); // Fetch all residents URLs concurrently
    const data = await Promise.all(responses.map(res => res.json())); // Parse all responses as JSON concurrently
    return data; // Return full data for more detailed handling in display function
}

  // Display locations on the web page
  function displayLocations(locations) {
    locationsContainer.innerHTML = ''; // Clear existing locations
    locations.forEach(location => {
      const locationElement = document.createElement('div'); // Create a new div for each location
      locationElement.className = 'location';
      locationElement.innerHTML = `
              <h2>${location.name}</h2>
              <p>Type: ${location.type}</p>
              <p>Dimension: ${location.dimension}</p>
              <button onclick="showResidentsModal('${location.url}', '${location.name}')">Location Residents</button>
          `;
      locationsContainer.appendChild(locationElement); // Append the location element to the container
    });
  }

  // Show modal with residents of the selected location
  window.showResidentsModal = async (locationUrl, locationName) => {
    const modal = document.getElementById('residentsModal');
    const residentsList = document.getElementById('residentsList');
    residentsList.innerHTML = '<p>Loading residents...</p>'; // Show loading message

    const response = await fetch(locationUrl); // Fetch the selected locations data
    const location = await response.json(); // Parse the response as JSON
    const residents = await fetchResidents(location.residents); // Fetch the residents data

    document.getElementById('locationName').textContent = `${locationName} Residents`;
    residentsList.innerHTML = ''; // Clear previous content

    residents.forEach(resident => {
        const residentElement = document.createElement('div'); // Create a new di for each resident
        residentElement.textContent = resident.name; // Set the residents name
        residentsList.appendChild(residentElement); // append the resident element to the list
    });

    if (!residents.length) {
        residentsList.innerHTML = '<p>No residents found.</p>'; // Show message if no residents are found
    }

    modal.style.display = 'block'; // Display the modal
};

  // Close the modal when clicking outside of it
  document.getElementsByClassName('close')[0].onclick = function () {
    document.getElementById('residentsModal').style.display = 'none';
  };

  window.onclick = function (event) {
    const modal = document.getElementById('residentsModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Filter locations based on the search input
  searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase(); // Get the search text in lowercase
    const filteredLocations = allLocations.filter(location =>
      location.name.toLowerCase().includes(searchText) // Filter locations by name
    );
    displayLocations(filteredLocations); // Display the filtered locations
  });

  // Fetch all locations from the API
  async function fetchAllLocations(url = 'https://rickandmortyapi.com/api/location') {
    try {
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Parse the response as JSON
      allLocations = [...allLocations, ...data.results]; // Append the new locations to the existing ones
      if (data.info.next) {
        await fetchAllLocations(data.info.next); // Fetch the next page if it exists
      } else {
        displayLocations(allLocations); // Display all locations when done
      }
    } catch (error) {
      console.error('Error fetching locations:', error); // Log any errors
    }
  }

  fetchAllLocations(); // Start fetching locations when the page loads
});
