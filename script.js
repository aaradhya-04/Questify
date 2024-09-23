const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

// Function to load search history from JSON file (if available)
function loadSearchHistory() {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
        const history = JSON.parse(storedHistory);
        history.forEach(item => {
            // Add valid search item if both query and time exist
            if (item.query && item.time) {
                addHistoryItem(item.query, item.time);
            }
        });
    }
}

// Function to save the search history into JSON
function saveSearchHistory(history) {
    localStorage.setItem('searchHistory', JSON.stringify(history));
}

// Function to add a search item to the list
function addHistoryItem(query, time) {
    const li = document.createElement('li');
    // Convert timestamp to a readable date only if it's valid
    const formattedDate = new Date(time).toLocaleString();
    li.textContent = `${query} - ${formattedDate}`;
    historyList.appendChild(li);
}

// Function to clear the search history
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    historyList.innerHTML = '';
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        const time = Date.now(); // Current timestamp for valid history
        const newSearch = { query, time };

        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        searchHistory.push(newSearch);

        addHistoryItem(query, time);
        saveSearchHistory(searchHistory);

        searchInput.value = ''; // Clear input after search
    }
});

// Event listener for the clear history button
clearHistoryButton.addEventListener('click', clearSearchHistory);

// Load search history on page load
window.onload = loadSearchHistory;
