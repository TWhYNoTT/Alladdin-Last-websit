document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const suggestionsContainer = document.querySelector('.search-suggestions');

    // Show suggestions when input is focused
    searchInput.addEventListener('focus', () => {
        suggestionsContainer.style.display = 'block';
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Handle form submission
    document.querySelector('.search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle search submission here
    });
});