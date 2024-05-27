document.getElementById('fetchCharacter').addEventListener('click', function() {
    let interval = 20; // Starting interval for image changes
    const maxInterval = 300; // Maximum interval to slow down to
    let intervalIncrease = 20; // Amount by which to increase the interval each step
    let currentTimeout = null; // Track the timeout to be able to clear it

    function updateCharacter(randomId) {
        fetch(`https://rickandmortyapi.com/api/character/${randomId}`)
            .then(response => response.json())
            .then(data => {
                const img = document.getElementById('characterImage');
                const name = document.getElementById('characterName');
                img.src = data.image;
                img.alt = data.name;
                name.textContent = data.name;

                // Make sure elements are visible
                img.style.display = 'block';
                name.style.display = 'block';

                // Increase the interval and set another timeout if under maxInterval
                if (interval < maxInterval) {
                    interval += intervalIncrease;
                    currentTimeout = setTimeout(() => updateCharacter(Math.floor(Math.random() * 826) + 1), interval);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                clearTimeout(currentTimeout); // Clear the timeout on error
            });
    }

    clearTimeout(currentTimeout); // Clear any previous timeouts to avoid overlaps
    updateCharacter(Math.floor(Math.random() * 826) + 1);
});
