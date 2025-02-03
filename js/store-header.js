class StoreHeader {
    constructor(container, config) {
        this.container = container;
        this.config = {
            storeName: 'El Nor Store',
            itemCount: 154,
            rating: 4.8,
            ratingCount: 574,
            logoUrl: '/store-logo.jpg',
            ...config
        };
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const template = `
            <div class="store-header">
                <div class="store-logo-wrapper">
                    <img src="${this.config.logoUrl}" alt="${this.config.storeName}" class="store-logo">
                    <button class="favorite-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                                  fill="currentColor" />
                        </svg>
                    </button>
                </div>
                <div class="store-info">
                    <h1 class="store-name">${this.config.storeName}</h1>
                    <div class="store-stats">
                        <span class="item-count">${this.config.itemCount} Items</span>
                        <div class="rating-wrapper">
                            <span class="rating-star">★</span>
                            <span class="rating-score">${this.config.rating}</span>
                            <span class="rating-count">-${this.config.ratingCount} Ratings</span>
                            <svg class="chevron-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = template;
    }

    attachEventListeners() {
        const favoriteBtn = this.container.querySelector('.favorite-btn');
        const ratingWrapper = this.container.querySelector('.rating-wrapper');

        favoriteBtn.addEventListener('click', () => {
            favoriteBtn.classList.toggle('active');
            this.handleFavorite();
        });

        ratingWrapper.addEventListener('click', () => {
            this.handleRatingClick();
        });
    }

    handleFavorite() {
        const event = new CustomEvent('favorite', {
            detail: { isFavorite: this.container.querySelector('.favorite-btn').classList.contains('active') }
        });
        this.container.dispatchEvent(event);
    }

    handleRatingClick() {
        const event = new CustomEvent('ratingClick');
        this.container.dispatchEvent(event);
    }
}