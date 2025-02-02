class SearchComponent {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const template = `
            <div class="search-container">
                <div class="search-wrapper">
                    <span class="search-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                                stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <input type="text" class="search-input" placeholder="Search...">
                </div>
                <div class="buttons-wrapper">
                    <button class="sort-btn">
                        <span class="sort-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7H21M6 12H18M9 17H15" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </span>
                        Sort by
                    </button>
                    <button class="menu-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20M4 12H20M4 18H20" stroke="#c4a77d" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="grid-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3H10V10H3V3ZM14 3H21V10H14V3ZM3 14H10V21H3V14ZM14 14H21V21H14V14Z" 
                                stroke="#c4a77d" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        this.container.innerHTML = template;
    }

    attachEventListeners() {
        const searchInput = this.container.querySelector('.search-input');
        const sortBtn = this.container.querySelector('.sort-btn');
        const menuBtn = this.container.querySelector('.menu-btn');
        const gridBtn = this.container.querySelector('.grid-btn');

        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        sortBtn.addEventListener('click', () => {
            this.handleSort();
        });

        menuBtn.addEventListener('click', () => {
            this.handleMenu();
        });

        gridBtn.addEventListener('click', () => {
            this.handleGrid();
        });
    }

    handleSearch(value) {
        // Emit search event
        const event = new CustomEvent('search', {
            detail: { query: value }
        });
        this.container.dispatchEvent(event);
    }

    handleSort() {
        // Emit sort event
        const event = new CustomEvent('sort');
        this.container.dispatchEvent(event);
    }

    handleMenu() {
        // Emit menu event
        const event = new CustomEvent('menu');
        this.container.dispatchEvent(event);
    }

    handleGrid() {
        // Emit grid event
        const event = new CustomEvent('grid');
        this.container.dispatchEvent(event);
    }
}