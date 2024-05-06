fetch('https://rickandmortyapi.com/api/location')
  .then(response => response.json())
  .then(data => {
    displayLocations(data.results);
  })
  .catch(error => console.error('Error fetching locations:', error));

function displayLocations(locations) {
    const container = document.getElementById('locations');
    locations.forEach(location => {
        const locationElement = document.createElement('div');
        locationElement.className = 'location-card'; // Adding a class for styling purposes
        locationElement.innerHTML = `
            <h3>${location.name}</h3>
            <p>Type: ${location.type}</p>
            <p>Dimension: ${location.dimension}</p>
            <a href="${location.url}" target="_blank">More Info</a>
        `;
        container.appendChild(locationElement);
    });
}