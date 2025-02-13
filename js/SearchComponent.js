class SearchComponent {
    constructor(container) {
        this.container = container;
        this.sortMenuOpen = false;
        this.currentSort = 'default';
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const template = `
            <div class="search-container">
                <form class="search-form" >
                    <div class="search-wrapper">
                        <span class="search-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
                                    stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <input type="search" name="search" class="search-input" placeholder="Search...">
                    </div>
                </form>
                <div class="buttons-wrapper">
                    <div class="sort-container">
                        <button class="sort-btn">
                            <span class="sort-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7H21M6 12H18M9 17H15" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </span>
                            Sort by
                        </button>
                        <div class="sort-menu" style="display: none;">
                            <div class="sort-option" data-sort="default">
                                <span class="check-icon ${this.currentSort === 'default' ? 'active' : ''}">✓</span>
                                Default
                            </div>
                            <div class="sort-option" data-sort="name-asc">
                                <span class="check-icon ${this.currentSort === 'name-asc' ? 'active' : ''}">✓</span>
                                Name A-Z
                            </div>
                            <div class="sort-option" data-sort="name-desc">
                                <span class="check-icon ${this.currentSort === 'name-desc' ? 'active' : ''}">✓</span>
                                Name Z-A
                            </div>
                            <div class="sort-option" data-sort="date-newest">
                                <span class="check-icon ${this.currentSort === 'date-newest' ? 'active' : ''}">✓</span>
                                Newest First
                            </div>
                            <div class="sort-option" data-sort="date-oldest">
                                <span class="check-icon ${this.currentSort === 'date-oldest' ? 'active' : ''}">✓</span>
                                Oldest First
                            </div>
                        </div>
                    </div>
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

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .search-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #fff;
            }

            .search-form {
                flex: 1;
            }

            .search-wrapper {
                position: relative;
                width: 100%;
            }

            .search-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
            }

            .search-input {
                width: 100%;
                padding: 10px 10px 10px 40px;
         
                border-radius: 6px;
                font-size: 14px;
            }

            .buttons-wrapper {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }

            .sort-container {
                position: relative;
            }

            .sort-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 8px 16px;
                border: 1px solid #ddd;
                border-radius: 6px;
                background: #fff;
                cursor: pointer;
            }

            .sort-menu {
                position: absolute;
                top: 100%;
                right: 0;
                margin-top: 4px;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                z-index: 1000;
                min-width: 180px;
            }

            .sort-option {
                padding: 8px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .sort-option:hover {
                background: #f5f5f5;
            }

            .check-icon {
                width: 16px;
                visibility: hidden;
            }

            .check-icon.active {
                visibility: visible;
                color: #c4a77d;
            }

            .menu-btn, .grid-btn {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 6px;
                background: #fff;
                cursor: pointer;
            }

            button:hover {
                background: #f5f5f5;
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        const searchForm = this.container.querySelector('.search-form');
        const sortBtn = this.container.querySelector('.sort-btn');
        const sortMenu = this.container.querySelector('.sort-menu');
        const sortOptions = this.container.querySelectorAll('.sort-option');
        const menuBtn = this.container.querySelector('.menu-btn');
        const gridBtn = this.container.querySelector('.grid-btn');

        // Search form submit handler
        searchForm.addEventListener('submit', (e) => {
            // e.preventDefault();
            const formData = new FormData(e.target);
            this.handleSearch(formData.get('search'));
        });

        // Search input handler for real-time search
        searchForm.querySelector('input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Sort button click handler
        sortBtn.addEventListener('click', () => {
            this.toggleSortMenu();
        });

        // Sort options click handlers
        sortOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sortType = option.dataset.sort;
                this.handleSort(sortType);
                this.toggleSortMenu();
            });
        });

        // Close sort menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.querySelector('.sort-container').contains(e.target)) {
                sortMenu.style.display = 'none';
                this.sortMenuOpen = false;
            }
        });

        menuBtn.addEventListener('click', () => {
            this.handleMenu();
        });

        gridBtn.addEventListener('click', () => {
            this.handleGrid();
        });
    }

    toggleSortMenu() {
        const sortMenu = this.container.querySelector('.sort-menu');
        this.sortMenuOpen = !this.sortMenuOpen;
        sortMenu.style.display = this.sortMenuOpen ? 'block' : 'none';
    }

    handleSearch(value) {
        const event = new CustomEvent('search', {
            detail: { query: value }
        });
        this.container.dispatchEvent(event);
    }

    handleSort(sortType) {
        // Update current sort and UI
        this.currentSort = sortType;
        this.updateSortUI();

        // Emit sort event with sort type
        const event = new CustomEvent('sort', {
            detail: { sortType }
        });
        this.container.dispatchEvent(event);
    }

    updateSortUI() {
        // Update checkmarks
        const sortOptions = this.container.querySelectorAll('.sort-option');
        sortOptions.forEach(option => {
            const checkIcon = option.querySelector('.check-icon');
            if (option.dataset.sort === this.currentSort) {
                checkIcon.classList.add('active');
            } else {
                checkIcon.classList.remove('active');
            }
        });
    }

    handleMenu() {
        const event = new CustomEvent('menu');
        this.container.dispatchEvent(event);
    }

    handleGrid() {
        const event = new CustomEvent('grid');
        this.container.dispatchEvent(event);
    }
}