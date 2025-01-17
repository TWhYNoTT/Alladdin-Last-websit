class ProductDisplay {
    constructor(config) {
        this.config = {
            containerId: config.containerId,
            products: config.products || [],
            displayType: config.displayType || 'carousel',
            itemsToShow: config.itemsToShow || 4,
        };

        this.startIndex = 0;
        this.init();
    }

    init() {
        this.createStructure();
        this.initializeFavorites();

        if (this.config.displayType === 'carousel') {
            this.initializeCarousel();
        }

        this.handleResponsive();
    }

    createStructure() {
        const container = document.getElementById(this.config.containerId);

        if (this.config.displayType === 'carousel') {
            container.innerHTML = `
                <div class="fs-container">
                    <div class="fs-carousel">
                        <button class="fs-carousel__button fs-carousel__button--prev" aria-label="Previous">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <div class="fs-carousel__track"></div>
                        <button class="fs-carousel__button fs-carousel__button--next" aria-label="Next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="fs-container">
                    <div class="fs-grid"></div>
                </div>
            `;
        }

        const productContainer = container.querySelector(
            this.config.displayType === 'carousel' ? '.fs-carousel__track' : '.fs-grid'
        );
        productContainer.innerHTML = this.config.products.map(product =>
            this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const productUrl = product?.productUrl || '#';
        const hasDiscount = product.discount && product.originalPrice;

        return `
            <div class="fs-product" data-product-id="${product.id}">
                <div class="fs-product__image-wrapper">
                    <a href="${productUrl}" class="fs-product__link">
                        <img src="${product.image}" alt="${product.name}" class="fs-product__image">
                    </a>
                    <button class="fs-product__favorite" aria-label="Add to favorites">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                    ${hasDiscount ? `<div class="fs-product__discount">${product.discount}</div>` : ''}
                </div>
                <div class="fs-product__info">
                    <a href="${productUrl}" class="fs-product__link">
                        <h3 class="fs-product__name">${product.name}</h3>
                    </a>
                    <div class="fs-product__price">
                        <span class="fs-product__price-sale">${product.salePrice}</span>
                        ${hasDiscount ?
                `<span class="fs-product__price-original">${product.originalPrice}</span>` :
                ''}
                    </div>
                </div>
            </div>
        `;
    }

    initializeFavorites() {
        const container = document.getElementById(this.config.containerId);
        container.addEventListener('click', (e) => {
            const favoriteButton = e.target.closest('.fs-product__favorite');
            if (favoriteButton) {
                this.handleFavoriteClick(favoriteButton);
            }
        });
    }

    initializeCarousel() {
        if (this.config.displayType !== 'carousel') return;

        const container = document.getElementById(this.config.containerId);
        const track = container.querySelector('.fs-carousel__track');
        const prevButton = container.querySelector('.fs-carousel__button--prev');
        const nextButton = container.querySelector('.fs-carousel__button--next');

        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', e => {
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
        if (this.startIndex < this.config.products.length - itemsToShow) {
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
        const track = container.querySelector('.fs-carousel__track');
        const prevButton = container.querySelector('.fs-carousel__button--prev');
        const nextButton = container.querySelector('.fs-carousel__button--next');

        const itemsToShow = this.getItemsToShow();
        const itemWidth = 100 / itemsToShow;

        track.style.transform = `translateX(-${this.startIndex * itemWidth}%)`;

        if (prevButton && nextButton) {
            prevButton.disabled = this.startIndex === 0;
            nextButton.disabled = this.startIndex >= this.config.products.length - itemsToShow;
        }
    }

    handleFavoriteClick(button) {
        button.classList.toggle('active');

        if (window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        const productId = button.closest('.fs-product').dataset.productId;
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (button.classList.contains('active')) {
            if (!favorites.includes(productId)) {
                favorites.push(productId);
            }
        } else {
            const index = favorites.indexOf(productId);
            if (index > -1) {
                favorites.splice(index, 1);
            }
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
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


const Products = [
    {
        id: 1,
        name: "Premium Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "30.0 YER",
        originalPrice: "49.9 YER",
        discount: "40%",

    },
    {
        id: 2,
        name: "Classic Leather Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "35.0 YER",
        originalPrice: "55.9 YER",
        discount: "37%",

    },
    {
        id: 3,
        name: "Denim Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "28.0 YER",
        originalPrice: "45.9 YER",
        discount: "39%",

    },
    {
        id: 4,
        name: "Vintage Style Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "32.0 YER",
        originalPrice: "52.9 YER",
        discount: "40%",

    },
    {
        id: 5,
        name: "Modern Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "33.0 YER",
        originalPrice: "53.9 YER",
        discount: "39%",

    },
    {
        id: 6,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",
        originalPrice: "48.9 YER",
        discount: "41%",

    }
];



const Products0 = [
    {
        id: 1,
        name: "Premium Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "30.0 YER",

    },
    {
        id: 2,
        name: "Classic Leather Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "35.0 YER",


    },
    {
        id: 3,
        name: "Denim Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "28.0 YER",

    },
    {
        id: 4,
        name: "Vintage Style Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "32.0 YER",
        originalPrice: "52.9 YER",
        discount: "40%",

    },
    {
        id: 5,
        name: "Modern Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "33.0 YER",
        originalPrice: "53.9 YER",
        discount: "39%",

    },
    {
        id: 6,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",

    }
];



const Products1 = [
    {
        id: 1,
        name: "Premium Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "30.0 YER",

    },
    {
        id: 2,
        name: "Classic Leather Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "35.0 YER",


    },
    {
        id: 3,
        name: "Denim Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "28.0 YER",

    },
    {
        id: 4,
        name: "Vintage Style Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "32.0 YER",
        originalPrice: "52.9 YER",
        discount: "40%",

    },
    {
        id: 5,
        name: "Modern Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "33.0 YER",
        originalPrice: "53.9 YER",
        discount: "39%",

    },
    {
        id: 6,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",

    },
    {
        id: 7,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",

    },
    {
        id: 8,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",

    },
    {
        id: 9,
        name: "Sport Bomber Jacket",
        image: "images/bomberjacket.jpeg",
        salePrice: "29.0 YER",

    }
];



document.addEventListener('DOMContentLoaded', () => {
    new ProductDisplay({
        containerId: 'Flash-Sale',
        displayType: 'carousel',
        products: Products,
        itemsToShow: 4,
    });

    new ProductDisplay({
        containerId: 'New-Arrival',
        displayType: 'carousel',
        products: Products0,
        itemsToShow: 4,
    });

    new ProductDisplay({
        containerId: 'Suggested-Grid',
        displayType: 'grid',
        products: Products1,
    });
});