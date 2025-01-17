class StoreDisplay {
    constructor(config) {
        this.config = {
            containerId: config.containerId,
            stores: config.stores || [],
            displayType: config.displayType || 'carousel',
            itemsToShow: config.itemsToShow || 4,
        };

        this.startIndex = 0;
        this.init();
    }

    init() {
        this.createStructure();
        if (this.config.displayType === 'carousel') {
            this.initializeCarousel();
        }
        this.handleResponsive();
    }

    createStructure() {
        const container = document.getElementById(this.config.containerId);

        if (this.config.displayType === 'carousel') {
            container.innerHTML = `
                <div class="store-slider">
                    <button class="store-slider__nav-btn store-slider__nav-btn--prev" aria-label="Previous">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.5" cy="14.5" r="14.5" fill="#BFA274" />
                            <path d="M17 10L12 15L17 20" stroke="white" stroke-width="1.5" />
                        </svg>
                    </button>
                    <div class="store-slider__wrapper">
                        <div class="store-slider__list"></div>
                    </div>
                    <button class="store-slider__nav-btn store-slider__nav-btn--next" aria-label="Next">
                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14.5" cy="14.5" r="14.5" transform="matrix(-1 0 0 1 29 0)" fill="#BFA274" />
                            <path d="M12 10L17 15L12 20" stroke="white" stroke-width="1.5" />
                        </svg>
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="store-grid">
                    <div class="store-grid__list"></div>
                </div>
            `;
        }

        const storeContainer = container.querySelector(
            this.config.displayType === 'carousel' ? '.store-slider__list' : '.store-grid__list'
        );
        storeContainer.innerHTML = this.config.stores.map(store =>
            this.createStoreCard(store)).join('');
    }

    createStoreCard(store) {
        const storeUrl = store.url || `#`; // Default URL if not provided
        return `
            <div class="store-slider__card" data-store-id="${store.id}">
                <a href="${storeUrl}" class="store-slider__image-link">
                    <img src="${store.logo}" class="store-slider__logo" alt="${store.name}">
                </a>
                <div class="store-slider__info">
                    <a href="${storeUrl}" class="store-slider__title-link">
                        <h3 class="store-slider__title">${store.name}</h3>
                    </a>
                    <div class="store-slider__distance">${store.distance}</div>
                    <div class="store-slider__rating-box">
                        <i class="fa-solid fa-star store-slider__star"></i>
                        <span class="store-slider__rating-text">${store.rating} - ${store.ratingCount} Ratings</span>
                    </div>
                </div>
            </div>
        `;
    }

    initializeCarousel() {
        if (this.config.displayType !== 'carousel') return;

        const container = document.getElementById(this.config.containerId);
        const list = container.querySelector('.store-slider__list');
        const prevButton = container.querySelector('.store-slider__nav-btn--prev');
        const nextButton = container.querySelector('.store-slider__nav-btn--next');

        let touchStartX = 0;
        let touchEndX = 0;

        list.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        list.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) this.handleNext();
                else this.handlePrev();
            }
        }, { passive: true });

        prevButton?.addEventListener('click', () => this.handlePrev());
        nextButton?.addEventListener('click', () => this.handleNext());

        this.updateCarousel();
    }

    handlePrev() {
        if (this.startIndex > 0) {
            this.startIndex--;
            this.updateCarousel();
        }
    }

    handleNext() {
        const itemsToShow = this.getItemsToShow();
        if (this.startIndex < this.config.stores.length - itemsToShow) {
            this.startIndex++;
            this.updateCarousel();
        }
    }

    getItemsToShow() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 2;
        if (width <= 1200) return 3;
        return this.config.itemsToShow;
    }

    updateCarousel() {
        const container = document.getElementById(this.config.containerId);
        const list = container.querySelector('.store-slider__list');
        const prevButton = container.querySelector('.store-slider__nav-btn--prev');
        const nextButton = container.querySelector('.store-slider__nav-btn--next');

        const itemsToShow = this.getItemsToShow();
        const itemWidth = 100 / itemsToShow;

        list.style.transform = `translateX(-${this.startIndex * itemWidth}%)`;

        if (prevButton && nextButton) {
            prevButton.disabled = this.startIndex === 0;
            nextButton.disabled = this.startIndex >= this.config.stores.length - itemsToShow;
        }
    }

    handleResponsive() {
        let resizeTimer;

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (this.config.displayType === 'carousel') {
                    this.updateCarousel();
                }
            }, 250);
        };

        window.addEventListener('resize', handleResize);
    }
}

// Sample usage:
const stores = [
    {
        id: 1,
        name: "El Nor Store",
        logo: "../photo/Rectangle 30.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-nor-store"
    },
    {
        id: 2,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },
    {
        id: 3,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },
    {
        id: 4,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },
    {
        id: 5,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },
    {
        id: 6,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },
    {
        id: 7,
        name: "El Hoda Store",
        logo: "photo/Rectangle 31.png",
        distance: "1.2 KM",
        rating: "4.8",
        ratingCount: "574",
        url: "/store/el-Hoda-store"
    },

];

document.addEventListener('DOMContentLoaded', () => {
    new StoreDisplay({
        containerId: 'store-carousel',
        displayType: 'carousel',
        stores: stores,
        itemsToShow: 4,
    });
});