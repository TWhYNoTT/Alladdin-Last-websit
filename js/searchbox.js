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


    const langSelect = document.querySelector('.lang');

    // Set initial direction based on the selected option
    setDirectionFromLang(langSelect.value);

    // Add event listener to change direction when selection changes
    langSelect.addEventListener('change', function () {
        setDirectionFromLang(this.value);
    });

    function setDirectionFromLang(value) {
        const html = document.documentElement;

        if (value === '1') { // English
            html.setAttribute('dir', 'ltr');
            // Optionally set lang attribute
            html.setAttribute('lang', 'en');
        } else { // Arabic (default)
            html.setAttribute('dir', 'rtl');
            // Optionally set lang attribute
            html.setAttribute('lang', 'ar');
        }
    }
});



function toggleDirection() {
    const html = document.documentElement;
    const currentDir = html.getAttribute('dir');

    if (currentDir === 'rtl') {
        html.setAttribute('dir', 'ltr');
    } else {
        html.setAttribute('dir', 'rtl');
    }
}