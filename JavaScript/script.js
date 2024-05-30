document.getElementById('fetchCharacter').addEventListener('click', function() {
    let interval = 20; // Starting interval for image changes
    const maxInterval = 300; // Maximum interval to slow down to
    let intervalIncrease = 20; // Amount by which to increase the interval each step
    let currentTimeout = null; // Track the timeout to be able to clear it

    // Function to fetch and update character information
    function updateCharacter(randomId) {
        fetch(`https://rickandmortyapi.com/api/character/${randomId}`) // Fetch data from API using a random character ID
            .then(response => response.json()) // Parse the response as JSON
            .then(data => {
                const img = document.getElementById('characterImage'); // Get the image element
                const name = document.getElementById('characterName'); // Get the name element
                img.src = data.image; // Set the image source to the fetched character image
                img.alt = data.name; // Set the image alt text to the character name
                name.textContent = data.name; // Set the name element's text to the character name

                // Make sure elements are visible
                img.style.display = 'block';
                name.style.display = 'block';

                // Increase the interval and set another timeout if under maxInterval
                if (interval < maxInterval) {
                    interval += intervalIncrease; // Increase the interval
                    // Set a timeout to fetch and update another character after the interval
                    currentTimeout = setTimeout(() => updateCharacter(Math.floor(Math.random() * 826) + 1), interval);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log any errors to the console
                clearTimeout(currentTimeout); // Clear the timeout on error
            });
    }

    clearTimeout(currentTimeout); // Clear any previous timeouts to avoid overlaps
    // Start fetching and updating character information with a random character ID
    updateCharacter(Math.floor(Math.random() * 826) + 1);
});
